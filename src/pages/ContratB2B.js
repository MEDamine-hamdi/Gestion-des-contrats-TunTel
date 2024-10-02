import React, { useEffect, useState } from 'react';

function ContratTT() {
    const [espacett_tmp, setEspacett_tmp] = useState([]);

    useEffect(() => {
        const fetchEspacett_tmp = async () => {
            try {
                const res = await fetch('http://localhost:3001/contrat-b2b');
                const data = await res.json();
                setEspacett_tmp(data);
            } catch (error) {
                console.error('Error fetching contracts:', error);
            }
        };
        fetchEspacett_tmp();
    }, []);

    const saveContract = async (contract) => {
        try {
            const res = await fetch('http://localhost:3001/save-contrat-b2b', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(contract),
            });
            if (res.ok) {
                alert('Contract saved successfully');
            } else {
                alert('Failed to save contract');
            }
        } catch (error) {
            console.error('Error saving contract:', error);
        }
    };

    const deleteContract = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce contrat?')) {
            try {
                const res = await fetch(`http://localhost:3001/delete-contrat-b2b/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setEspacett_tmp(espacett_tmp.filter(contract => contract._id !== id));
                    alert('Contrat supprimé avec succès');
                } else {
                    alert('Échec de la suppression du contrat');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression du contrat :', error);
            }
        }
    };

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

    return (
        <div style={containerStyle}>
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Liste des contrats B2B</h2>
            <ul style={{ listStyleType: "none", padding: "0" }}>
                {espacett_tmp.map((contract, index) => (
                    <li key={index} style={listItemStyle}>
                        <div>
                            <div>Objet: {contract.objet}</div>
                            <div>Nombre: {contract.nombre}</div>
                            <div>Montant: {contract.montant}</div>
                            <div>Type: {contract.type}</div>
                        </div>
                        <div>
                            <button style={buttonStyle} onClick={() => { saveContract(contract); deleteContract(contract._id); }}>Valider</button>
                            <button style={{ ...buttonStyle, backgroundColor: "#f44336" }} onClick={() => deleteContract(contract._id)}>Refuser</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ContratTT;
