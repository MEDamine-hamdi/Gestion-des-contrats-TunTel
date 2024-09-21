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
                const response = await fetch('http://192.168.64.181:3001/highest-sum-this-month');
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
                const response = await fetch('http://192.168.64.181:3001/contracts-expiring-soon');
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
        <div style={{ margin: "0 auto", width: "80%", padding: "20px" }}>
            <div style={{ marginBottom: "20px", padding: "10px", backgroundColor: "#f4f4f4", borderRadius: "5px" }}>
                <h2>Montant le plus élevé ce mois-ci</h2>
                <p>Le montant le plus élevé est : {highestB2B.totalMontant} DT par : {highestB2B.user}</p>
                <p>Le montant le plus élevé est : {highestEspace.totalMontant} DT par : {highestEspace.user}</p>
            </div>

            <h2>Contrats à renouveler</h2>
            {contracts.length > 0 ? (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr>
                            <th>Objet</th>
                            <th>Nombre</th>
                            <th>Montant</th>
                            <th>Type</th>
                            <th>Nom entreprise</th>
                            <th>ID entreprise</th>
                            <th>Durée contrat</th>
                            <th>CC</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contracts.map((contract) => (
                            <tr key={contract._id}>
                                <td>{contract.objet}</td>
                                <td>{contract.nombre}</td>
                                <td>{contract.montant} DT</td>
                                <td>{contract.type}</td>
                                <td>{contract.nom}</td>
                                <td>{contract.id}</td>
                                <td>{contract.duree}</td>
                                <td>{contract.cc}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>Aucun contrat à renouveler</p>
            )}
        </div>
    );
}
