import React, { useState, useEffect } from 'react';

function Scanner() {
  const [pdfFile, setPdfFile] = useState(null);
  const [user, setUser] = useState(null);

  // Fetch user profile from localStorage on component mount
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData) {
      setUser(userData);
    } else {
      console.log('User not found in localStorage');
    }
  }, []);

  const handleFileChange = (event) => {
    setPdfFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!pdfFile) {
      alert('Please select a PDF file first.');
      return;
    }

    if (!user) {
      alert('User profile information is not available.');
      return;
    }

    const formData = new FormData();
    formData.append('pdfFile', pdfFile);
    formData.append('userProfile', JSON.stringify(user));

    try {
      const response = await fetch('http://192.168.64.181:3001/upload-pdf', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        alert('PDF uploaded successfully!');
      } else {
        alert('Failed to upload PDF. Please try again.');
      }
    } catch (error) {
      console.error('Error uploading PDF:', error);
      alert('Error uploading PDF. Please check the console for more details.');
    }
  };

  // CSS in JS
  const containerStyle = {
    margin: "0 auto",
    width: "40%",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f9f9f9",
    marginTop: "20px"
  };

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  };

  const inputStyle = {
    marginBottom: "15px",
    padding: "10px",
    width: "100%",
    borderRadius: "4px",
    border: "1px solid #ccc"
  };

  const buttonStyle = {
    margin: "5px",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s ease"
  };

  return (
    <div style={containerStyle}>
      <h1>Ajouter un PDF :</h1>
      <form onSubmit={handleSubmit} style={formStyle}>
        <input type="file" accept=".pdf" onChange={handleFileChange} style={inputStyle} />
        <button type="submit" style={buttonStyle}>Upload PDF</button>
      </form>
    </div>
  );
}

export default Scanner;
