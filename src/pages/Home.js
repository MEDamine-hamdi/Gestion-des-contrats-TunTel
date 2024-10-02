import React, { useState, useEffect } from 'react';

export default function HomePage() {
    const [highestB2B, setHighestB2B] = useState({ totalMontant: 0, user: 'N/A' });
    const [highestEspace, setHighestEspace] = useState({ totalMontant: 0, user: 'N/A' });
    const [contracts, setContracts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHighestSums = async () => {
            try {
                const response = await fetch('http://localhost:3001/highest-sum-this-month');
                if (!response.ok) {
                    throw new Error('Failed to fetch highest sums');
                }
                const data = await response.json();
                console.log('Fetched Highest Sums Data:', data); // Debugging

                setHighestB2B(data.highestB2B);
                setHighestEspace(data.highestEspace);
            } catch (error) {
                console.error('Error fetching highest sums:', error.message);
                setError('Error fetching highest sums');
            }
        };

        const fetchContracts = async () => {
            try {
                const response = await fetch('http://localhost:3001/contracts-expiring-soon');
                if (!response.ok) {
                    throw new Error('Failed to fetch contracts');
                }
                const data = await response.json();
                console.log('Fetched Contracts Data:', data); // Debugging

                setContracts(data);
            } catch (error) {
                console.error('Error fetching contracts:', error.message);
                setError('Error fetching contracts');
            } finally {
                setLoading(false);
            }
        };

        fetchHighestSums();
        fetchContracts();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ margin: "0 auto", width: "60%", padding: "20px" }}>
            <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "5px" }}>
                <h2>Montant le plus élevé ce mois-ci</h2>
                <p>Le montant le plus élevé est : {highestB2B.totalMontant} DT par : {highestB2B.user}</p>
                <p>Le montant le plus élevé est : {highestEspace.totalMontant} DT par : {highestEspace.user}</p>
            </div>

            <h2>Contrats à renouveler</h2>
            
            {contracts.length > 0 ? (
    <table style={{ 
        width: "100%", 
        borderCollapse: "collapse", 
        margin: "20px 0", 
        fontSize: "16px", 
        textAlign: "left" 
    }}>
        <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Objet</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Nombre</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Montant</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Type</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Nom entreprise</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>ID entreprise</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>Durée contrat</th>
                <th style={{ padding: "12px", borderBottom: "2px solid #ddd" }}>CC</th>
            </tr>
        </thead>
        <tbody>
            {contracts.map((contract, index) => (
                <tr 
                    key={contract._id} 
                    style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff", transition: "background-color 0.3s" }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#f1f1f1"}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#f9f9f9" : "#fff"}
                >
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.objet}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.nombre}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.montant} DT</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.type}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.nom}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.id}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.duree}</td>
                    <td style={{ padding: "10px", borderBottom: "1px solid #ddd" }}>{contract.cc}</td>
                </tr>
            ))}
        </tbody>
    </table>
) : (
    <p>Aucun contrat a renouveler</p>
)}

        </div>
    );
}
