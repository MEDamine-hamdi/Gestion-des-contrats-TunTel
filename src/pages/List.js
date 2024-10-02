import React, { useState, useEffect } from 'react';

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

const listItemStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px",
    borderBottom: "1px solid #ccc",
    transition: "background-color 0.3s ease"
};

const buttonStyle = {
    margin: "5px",
    padding: "10px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
};

function FileList() {
    const [files, setFiles] = useState([]);

    // Fetch the list of files on component mount
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:3001/files');
                if (response.ok) {
                    const data = await response.json();
                    setFiles(data);
                } else {
                    console.error('Failed to fetch files');
                }
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div style={containerStyle}>
            <h2>Fichiers sauvegardés</h2>
            <ul>
                {files.map((file) => (
                    <li key={file._id} style={listItemStyle}>
                        <p><strong>Nom fichier :</strong> {file.name}</p>
                        <p><strong>Profile :</strong> {file.userProfile}</p>
                        <a href={`http://localhost:3001/files/${file.name}`} download style={buttonStyle}>Télécharger</a>
                        <a href={`http://localhost:3001/files/view/${file.name}`} style={buttonStyle}>Voir</a>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FileList;
