import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Chiffre = () => {
  const [espacett, setEspacett] = useState([]);
  const [b2b, setB2B] = useState([]);
  const [objet, setObjet] = useState('');
  const [totalMontant, setTotalMontant] = useState(0);
  const [chiffres, setChiffres] = useState([]);
  const [monthlySums, setMonthlySums] = useState({});
  const [types, setTypes] = useState([]);

  useEffect(() => {
    const fetchEspacett = async () => {
      try {
        const res = await fetch('http://localhost:3001/mainTT');
        const data = await res.json();
        setEspacett(data);
      } catch (error) {
        console.error('Error fetching espacett data:', error);
      }
    };
    fetchEspacett();
  }, []);

  useEffect(() => {
    const fetchB2B = async () => {
      try {
        const res = await fetch('http://localhost:3001/mainB2B');
        const data = await res.json();
        setB2B(data);
      } catch (error) {
        console.error('Error fetching B2B data:', error);
      }
    };
    fetchB2B();
  }, []);

  const fetchChiffres = async () => {
    try {
      const res = await fetch('http://localhost:3001/chiffreA');
      const data = await res.json();
      setChiffres(data);
    } catch (error) {
      console.error('Error fetching chiffres data:', error);
    }
  };

  useEffect(() => {
    fetchChiffres();
  }, []);

  useEffect(() => {
    const calculateMonthlySums = () => {
      const allData = [...espacett, ...b2b];
      const typeSums = {};

      allData.forEach(item => {
        const itemDate = new Date(item.objet);
        const monthYear = `${itemDate.getMonth() + 1}-${itemDate.getFullYear()}`;
        if (!typeSums[monthYear]) typeSums[monthYear] = {};
        if (!typeSums[monthYear][item.type]) typeSums[monthYear][item.type] = 0;
        typeSums[monthYear][item.type] += parseFloat(item.montant);
      });

      setMonthlySums(typeSums);

      // Extract unique types from allData
      const allTypes = allData.map(item => item.type);
      const uniqueTypes = [...new Set(allTypes)];
      setTypes(uniqueTypes);
    };

    calculateMonthlySums();
  }, [espacett, b2b]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const date = new Date(objet);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const allData = [...espacett, ...b2b];
    const profiles = ["b2b-1", "b2b-2", "espacett-1", "espacett-2", "espacett-3", "espacett-4", "espacett-5"];
    const sums = profiles.reduce((acc, profile) => {
      const total = allData.filter(item => {
        const itemDate = new Date(item.objet);
        const itemMonth = itemDate.getMonth() + 1;
        const itemYear = itemDate.getFullYear();
        return item.user === profile && itemMonth === month && itemYear === year;
      }).reduce((sum, item) => sum + parseFloat(item.montant), 0);
      acc[profile] = total;
      return acc;
    }, {});

    const highestProfile = Object.entries(sums).reduce((max, [profile, sum]) => {
      return sum > max.sum ? { profile, sum } : max;
    }, { profile: '', sum: 0 });

    setTotalMontant(highestProfile.sum);

    // Save the highest chiffre d'affaire
    try {
      const res = await fetch('http://localhost:3001/chiffreA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ objet, user: highestProfile.profile, chiffre: highestProfile.sum.toString() }),
      });

      if (res.ok) {
        alert('Chiffre saved successfully');
        // Update the chiffres list after saving
        fetchChiffres(); // Fetch updated chiffres after saving
      } else {
        alert('Failed to save chiffre');
      }
    } catch (error) {
      console.error('Error saving chiffre:', error);
    }
  };

  const chartData = {
    labels: Object.keys(monthlySums),
    datasets: types.map((type, index) => ({
      label: type,
      data: Object.keys(monthlySums).map(month => monthlySums[month][type] || 0),
      backgroundColor: `rgba(${index * 30}, ${index * 60}, ${index * 90}, 0.6)`,
    })),
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Sums by Type',
      },
    },
  };

  return (
    <div style={{ margin: "0 auto", width: "60%", padding: "40px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9", marginTop: '3%' }}>
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Objet</label>
          <input
            type="date"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            style={{ width: "30%", padding: "10px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
          />
        </div>
        <button type="submit" style={{ width: "10%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", alignSelf: "center" }}>
          Submit
        </button>
      </form>

      <div style={{ marginTop: "20px" }}>
        <strong>Chiffre d'affere : {totalMontant} DT</strong>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Historique chiffre d'affaire :</h3>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Objet</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>User</th>
                <th style={{ border: "1px solid #ccc", padding: "8px" }}>Chiffre</th>
              </tr>
            </thead>
            <tbody>
              {chiffres.map((ChiffreA, index) => (
                <tr key={index}>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{new Date(ChiffreA.objet).toLocaleDateString()}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{ChiffreA.user}</td>
                  <td style={{ border: "1px solid #ccc", padding: "8px" }}>{ChiffreA.chiffre} DT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ marginTop: "20px" }}>
        <h3>Statistique des offres:</h3>
        <div style={{ overflowX: "auto" }}>
          <Bar data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Chiffre

