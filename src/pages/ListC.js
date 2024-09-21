import React, { useEffect, useState } from 'react';

const containerStyle = {
    margin: "0 auto",
    width: "60%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    marginTop: "20px"
};

const headerStyle = {
    fontSize: "24px",
    marginBottom: "10px",
    borderBottom: "2px solid #4CAF50",
    paddingBottom: "10px",
    color: "#333"
};

const listStyle = {
    listStyleType: "none",
    padding: 0
};

const listItemStyle = {
    padding: "15px",
    borderBottom: "1px solid #ccc",
    transition: "background-color 0.3s ease",
    backgroundColor: "#ffffff"
};

const itemHeaderStyle = {
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#333"
};

const itemDetailStyle = {
    marginBottom: "10px",
    color: "#555"
};

const noDataStyle = {
    fontStyle: "italic",
    color: "#666"
};

function DataDisplay() {
  const [mainTTData, setMainTTData] = useState([]);
  const [mainB2BData, setMainB2BData] = useState([]);

  // Function to fetch data from /mainTT
  const fetchMainTTData = async () => {
    try {
      const response = await fetch('http://192.168.64.181:3001/mainTT');
      if (!response.ok) {
        throw new Error('Failed to fetch MainTT data');
      }
      const data = await response.json();
      setMainTTData(data);
    } catch (error) {
      console.error('Error fetching MainTT data:', error);
    }
  };

  // Function to fetch data from /mainB2B
  const fetchMainB2BData = async () => {
    try {
      const response = await fetch('http://192.168.64.181:3001/mainB2B');
      if (!response.ok) {
        throw new Error('Failed to fetch MainB2B data');
      }
      const data = await response.json();
      setMainB2BData(data);
    } catch (error) {
      console.error('Error fetching MainB2B data:', error);
    }
  };

  // Use useEffect to fetch data when the component mounts
  useEffect(() => {
    fetchMainTTData();
    fetchMainB2BData();
  }, []);

  const renderData = (data) => (
    <ul style={listStyle}>
      {data.map((item, index) => (
        <li key={index} style={listItemStyle}>
          <div style={itemHeaderStyle}>Item Details</div>
          <div style={itemDetailStyle}><strong>Objet:</strong> {item.objet}</div>
          <div style={itemDetailStyle}><strong>Nombre:</strong> {item.nombre}</div>
          <div style={itemDetailStyle}><strong>Montant:</strong> {item.montant}</div>
          <div style={itemDetailStyle}><strong>Type:</strong> {item.type}</div>
          <div style={itemDetailStyle}><strong>User:</strong> {item.user}</div>
          <div style={itemDetailStyle}><strong>Nom:</strong> {item.nom}</div>
          <div style={itemDetailStyle}><strong>ID:</strong> {item.id}</div>
          <div style={itemDetailStyle}><strong>Duree:</strong> {item.duree}</div>
          <div style={itemDetailStyle}><strong>CC:</strong> {item.cc}</div>
        </li>
      ))}
    </ul>
  );

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Contrats TT :</h2>
      {mainTTData.length > 0 ? (
        renderData(mainTTData)
      ) : (
        <p style={noDataStyle}>pas de contrats TT.</p>
      )}

      <h2 style={headerStyle}>Contrats B2B :</h2>
      {mainB2BData.length > 0 ? (
        renderData(mainB2BData)
      ) : (
        <p style={noDataStyle}>pas de contrats B2B.</p>
      )}
    </div>
  );
}

export default DataDisplay;
