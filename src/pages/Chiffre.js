import React, { useState, useEffect } from 'react';

const Chiffre = ({ loggedInUserProfile }) => {
  const [espacett, setEspacett] = useState([]);
  const [b2b, setB2B] = useState([]);
  const [profile, setProfile] = useState(''); // Initialize with an empty string initially
  const [objet, setObjet] = useState('');
  const [totalMontant, setTotalMontant] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      const userData = JSON.parse(localStorage.getItem("user"));
      if (userData) {
        setProfile(userData.profile); // Assuming userData has a profile field
      } else {
        console.log("User not found in localStorage");
      }
    };

    fetchUser();
  }, []);

  // Fetch data for espacett
  useEffect(() => {
    const fetchEspacett = async () => {
      try {
        const res = await fetch('http://localhost:3001/mainTT');
        if (!res.ok) {
          throw new Error('Failed to fetch Espacett data');
        }
        const data = await res.json();
        setEspacett(data);
        console.log('Espacett data fetched:', data);
      } catch (error) {
        console.error('Error fetching Espacett data:', error.message);
      }
    };
    fetchEspacett();
  }, []);

  // Fetch data for b2b
  useEffect(() => {
    const fetchB2B = async () => {
      try {
        const res = await fetch('http://localhost:3001/mainB2B');
        if (!res.ok) {
          throw new Error('Failed to fetch B2B data');
        }
        const data = await res.json();
        setB2B(data);
        console.log('B2B data fetched:', data);
      } catch (error) {
        console.error('Error fetching B2B data:', error.message);
      }
    };
    fetchB2B();
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const date = new Date(objet);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    console.log('Submitting form with:');
    console.log('Profile:', profile);
    console.log('Selected month:', month);
    console.log('Selected year:', year);

    const allData = [...espacett, ...b2b];
    console.log('All data combined:', allData);

    const filteredData = allData.filter(item => {
      const itemDate = new Date(item.objet);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();

      return item.user === profile && itemMonth === month && itemYear === year;
    });

    console.log('Filtered data based on profile, month, and year:', filteredData);

    const total = filteredData.reduce((sum, item) => {
      const montant = parseFloat(item.montant);
      console.log('Adding montant:', montant);
      return sum + montant;
    }, 0);

    console.log('Total montant:', total);
    setTotalMontant(total);
  };

  return (
    <div style={{ margin: "0 auto", width: "28%", padding: "40px", border: "1px solid #ccc", borderRadius: "5px", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)", backgroundColor: "#f9f9f9", marginTop: '3%' }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ marginBottom: "15px" }}>
          <label style={{ fontWeight: "bold", marginBottom: "5px", display: "block" }}>Objet</label>
          <input
            type="date"
            value={objet}
            onChange={(e) => setObjet(e.target.value)}
            style={{ width: "100%", padding: "10px", margin: "5px 0", border: "1px solid #ccc", borderRadius: "4px", boxSizing: "border-box" }}
          />
        </div>
        
        <button type="submit" style={{ width: "30%", padding: "10px", backgroundColor: "#4CAF50", color: "white", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "16px", alignSelf: "center" }}>
          Submit
        </button>
      </form>
      <div style={{ marginTop: "20px" }}>
        <strong>Chiffre d'affere : {totalMontant} DT</strong>
      </div>
    </div>
  );
};

export default Chiffre;
