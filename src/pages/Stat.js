// src/components/Statistique.js
import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Statistique = () => {
  const [espacett, setEspacett] = useState([]);
  const [b2b, setB2B] = useState([]);
  const [monthlySums, setMonthlySums] = useState({});
  const [types, setTypes] = useState([]);

  // Fetch espacett data
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

  // Fetch B2B data
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

  // Calculate monthly sums
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
    <div style={styles.container}>
      <h3>Statistique par mois :</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

const styles = {
  container: {
    margin: "0 auto",
    width: "60%",
    padding: "40px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    marginTop: '3%'
  },
};

export default Statistique;
