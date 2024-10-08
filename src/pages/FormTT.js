import React, { useState, useEffect } from "react";

export default function Espace() {
    const [objet, setObjet] = useState("");
    const [nombre, setNombre] = useState("");
    const [montant, setMontant] = useState("");
    const [type, setType] = useState("");
    const [nom, setNom] = useState("");
    const [id, setId] = useState("");
    const [duree, setDure] = useState("");
    const [offres, setOffres] = useState([]);
    const [user, setUser] = useState(null);
    const [cc, setCC] = useState("");
    const [currentIndex, setCurrentIndex] = useState(0);

    const listOff = ["CC1", "CC2", "CC3", "CC4", "CC5"];

    useEffect(() => {
        const fetchUser = async () => {
            const userData = JSON.parse(localStorage.getItem("user"));
            if (userData) {
                setUser(userData);
            } else {
                console.log("User not found in localStorage");
            }
        };

        const fetchOffres = async () => {
            try {
                const res = await fetch('http://localhost:3001/offre');
                if (!res.ok) {
                    throw new Error('Failed to fetch offers');
                }
                const data = await res.json();
                setOffres(data);
            } catch (error) {
                console.error('Error fetching offers:', error.message);
            }
        };

        const fetchLatestCC = async () => {
            try {
                const res = await fetch('http://localhost:3001/latest-cc');
                if (!res.ok) {
                    throw new Error('Failed to fetch latest CC');
                }
                const data = await res.json();
                if (data.latestCC) {
                    const latestCCIndex = listOff.indexOf(data.latestCC);
                    const nextCCIndex = (latestCCIndex + 1) % listOff.length;
                    setCurrentIndex(nextCCIndex);
                    setCC(listOff[nextCCIndex]);
                } else {
                    setCurrentIndex(1);
                    setCC(listOff[1]);
                }
            } catch (error) {
                console.error('Error fetching latest CC:', error.message);
            }
        };

        fetchUser();
        fetchOffres();
        fetchLatestCC();
    }, []);

    useEffect(() => {
        setCC(listOff[currentIndex]);
    }, [currentIndex]);

    const handleNextClick = () => {
        setCurrentIndex((currentIndex + 1) % listOff.length);
    };

    const checkIfIdExists = async (id) => {
        try {
            const res = await fetch(`http://localhost:3001/tt/${id}`);
            if (res.ok) {
                const data = await res.json();
                return data.exists;
            }
            return false; 
        } catch (error) {
            console.error('Error checking ID:', error.message);
            return false;
        }
    };

    const collectData = async (e) => {
        e.preventDefault();

        if (!user) {
            alert("User not logged in!");
            return;
        }

        const idExists = await checkIfIdExists(id);
        if (idExists) {
            const userConfirmed = window.confirm("ce ID existe deja, voulez vous l'ajouter?");
            if (!userConfirmed) {
                return; 
            }
        }

        try {
            const result = await fetch("http://192.168.64.181:3001/tt", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    objet,
                    nombre,
                    montant,
                    type,
                    user: user.profile,
                    nom,
                    id,
                    duree,
                    cc
                })
            });

            if (!result.ok) {
                throw new Error('Failed to submit TT data');
            }

            const data = await result.json();
            localStorage.setItem("espacett", JSON.stringify(data)); 
            alert("TT data ajouté avec succès!");

            const nextIndex = (currentIndex + 1) % listOff.length;
            setObjet("");
            setNombre("");
            setMontant("");
            setType("");
            setNom("");
            setId("");
            setDure("");
            setCC(listOff[nextIndex]);
            setCurrentIndex(nextIndex);
        } catch (error) {
            console.error("Error submitting TT data:", error);
        }
    };

    const containerStyle = {
        margin: "0 auto",
        width: "28%",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#f9f9f9"
    };

    const formStyle = {
        display: "flex",
        flexDirection: "column"
    };

    const formGroupStyle = {
        marginBottom: "15px"
    };

    const labelStyle = {
        fontWeight: "bold",
        marginBottom: "5px",
        display: "block"
    };

    const inputStyle = {
        width: "100%",
        padding: "10px",
        margin: "5px 0",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box"
    };

    const buttonStyle = {
        width: "30%",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
        alignSelf: "center"
    };

    const buttonHoverStyle = {
        backgroundColor: "#45a049"
    };

    const h2Style = {
        alignSelf: "center"
    };

    const flexRowStyle = {
        display: "flex",
        alignItems: "center",
    };

    const buttonNextStyle = {
        marginLeft: "10px",
        padding: "10px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        fontSize: "16px",
    };

    return (
        <div style={containerStyle}>
            <form onSubmit={collectData} style={formStyle}>
                <h2 style={h2Style}>Espace TT</h2>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Objet</label>
                    <input
                        type="date"
                        value={objet}
                        onChange={(e) => setObjet(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Nombre</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Montant</label>
                    <input
                        type="text"
                        value={montant}
                        onChange={(e) => setMontant(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={inputStyle}
                    >
                        {offres.map((offre) => (
                            <option key={offre._id} value={offre.type}>{offre.type}</option>
                        ))}
                    </select>
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Nom entreprise</label>
                    <input
                        type="text"
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>ID entreprise</label>
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={formGroupStyle}>
                    <label style={labelStyle}>Durée contrat</label>
                    <input
                        type="text"
                        value={duree}
                        onChange={(e) => setDure(e.target.value)}
                        style={inputStyle}
                    />
                </div>
                <div style={flexRowStyle}>
                    <div style={formGroupStyle}>
                        <label style={labelStyle}>CC</label>
                        <input
                            type="text"
                            value={cc}
                            readOnly
                            style={inputStyle}
                        />
                    </div>
                    <button
                        type="button"
                        style={{ ...buttonStyle, ...buttonNextStyle ,
                            marginTop: "10px",marginLeft:"10px"}}
                        onClick={handleNextClick}
                    >
                        Suivant
                    </button>
                </div>
                <button type="submit" style={{ ...buttonStyle, marginTop: "10px" }}>
                    Ajouter TT
                </button>
            </form>
        </div>
    );
}
