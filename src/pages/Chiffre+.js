// src/components/ChiffreHistorique.js
import React, { useState, useEffect } from 'react';

const ChiffreHistorique = () => {
  const [espacett, setEspacett] = useState([]);
  const [b2b, setB2B] = useState([]);
  const [objet, setObjet] = useState('');
  const [totalMontant, setTotalMontant] = useState(0);
  const [chiffres, setChiffres] = useState([]);

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

  // Fetch chiffres data
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

  // Submit handler for calculating and saving highest chiffre
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Parse the selected date (objet) into month and year
    const date = new Date(objet);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    // Combine espacett and b2b data
    const allData = [...espacett, ...b2b];

    // Define the profiles to sum for
    const profiles = ["b2b-1", "b2b-2", "espacett-1", "espacett-2", "espacett-3", "espacett-4", "espacett-5"];

    // Calculate the sum for each profile for the selected month/year
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

    // Identify the profile with the highest sum
    const highestProfile = Object.entries(sums).reduce((max, [profile, sum]) => {
      return sum > max.sum ? { profile, sum } : max;
    }, { profile: '', sum: 0 });

    // Set the total amount (chiffre) for display
    setTotalMontant(highestProfile.sum);

    // Log the values to ensure they are correct
    console.log('Selected Date:', objet);
    console.log('Highest Profile:', highestProfile.profile);
    console.log('Chiffre (Sum):', highestProfile.sum);

    // Save the highest chiffre d'affaire
    try {
      const res = await fetch('http://localhost:3001/chiffreA', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          objet,               // The selected date (objet)
          user: highestProfile.profile,  // The profile with the highest sum
          chiffre: highestProfile.sum    // Send sum as a number, not a string
        }),
      });

      if (res.ok) {
        alert('Chiffre saved successfully');
        fetchChiffres(); // Fetch updated chiffres after saving
      } else {
        alert('Failed to save chiffre');
      }
    } catch (error) {
      console.error('Error saving chiffre:', error);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Objet</label>
          <input
            type="date"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>

      <div style={styles.chiffre}>
        <strong>Chiffre d'affaire : {totalMontant} DT</strong>
      </div>

      <div style={styles.historique}>
        <h3>Historique chiffre d'affaire :</h3>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Objet</th>
                <th style={styles.th}>User</th>
                <th style={styles.th}>Chiffre</th>
              </tr>
            </thead>
            <tbody>
              {chiffres.map((ChiffreA, index) => (
                <tr key={index}>
                  <td style={styles.td}>{new Date(ChiffreA.objet).toLocaleDateString()}</td>
                  <td style={styles.td}>{ChiffreA.user}</td>
                  <td style={styles.td}>{ChiffreA.chiffre} DT</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// Define styles outside the component for better readability
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
  form: {
    marginBottom: "20px",
  },
  formGroup: {
    marginBottom: "15px",
  },
  label: {
    fontWeight: "bold",
    marginBottom: "5px",
    display: "block",
  },
  input: {
    width: "30%",
    padding: "10px",
    margin: "5px 0",
    border: "1px solid #ccc",
    borderRadius: "4px",
    boxSizing: "border-box",
  },
  button: {
    width: "10%",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
    alignSelf: "center",
  },
  chiffre: {
    marginTop: "20px",
  },
  historique: {
    marginTop: "20px",
  },
  tableContainer: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  th: {
    border: "1px solid #ccc",
    padding: "8px",
    textAlign: "left",
  },
  td: {
    border: "1px solid #ccc",
    padding: "8px",
  },
};

export default ChiffreHistorique;
