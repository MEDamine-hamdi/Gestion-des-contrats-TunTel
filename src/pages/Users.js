import React, { useEffect, useState } from 'react';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3001/api/user');
                const data = await res.json();
                setUsers(data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur?')) {
            try {
                const res = await fetch(`http://localhost:3001/api/user/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setUsers(users.filter(user => user._id !== id));
                    alert('Utilisateur supprimé avec succès');
                } else {
                    alert('Échec de la suppression de l\'utilisateur');
                }
            } catch (error) {
                console.error('Erreur lors de la suppression de l\'utilisateur:', error);
            }
        }
    };

    const containerStyle = {
        margin: '0 auto',
        width: '45%',
        padding: '20px',
        borderRadius: '5px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        backgroundColor: '#f9f9f9',
    };

    const titleStyle = {
        textAlign: 'center',
        marginBottom: '20px',
        fontSize: '1.5rem',
        color: '#333',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '10px',
    };

    const headerCellStyle = {
        backgroundColor: '#ddd',
        color: '#333',
        padding: '10px',
        textAlign: 'left',
        borderBottom: '2px solid #ccc',
    };

    const cellStyle = {
        borderBottom: '1px solid #ddd',
        padding: '10px',
        textAlign: 'left',
    };

    const messageStyle = {
        textAlign: 'center',
        fontStyle: 'italic',
        marginTop: '20px',
        color: '#666',
    };

    const rowHoverStyle = {
        backgroundColor: '#f0f0f0',
        transition: 'background-color 0.3s ease',
    };

    const buttonStyle = {
        margin: '5px',
        padding: '10px',
        backgroundColor: '#f44336',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
    };

    return (
        <div className="users" style={containerStyle}>
            <h1 className="users__title" style={titleStyle}>List of Users</h1>
            {users.length > 0 ? (
                <table className="users__table" style={tableStyle}>
                    <thead>
                        <tr>
                            <th className="users__table-header" style={headerCellStyle}>Username</th>
                            <th className="users__table-header" style={headerCellStyle}>Profile</th>
                            <th className="users__table-header" style={headerCellStyle}>Email</th>
                            <th className="users__table-header" style={headerCellStyle}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id} style={rowHoverStyle}>
                                <td style={cellStyle}>{user.username}</td>
                                <td style={cellStyle}>{user.profile}</td>
                                <td style={cellStyle}>{user.email}</td>
                                <td style={cellStyle}>
                                    <button style={buttonStyle} onClick={() => deleteUser(user._id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="users__message" style={messageStyle}>No users found.</p>
            )}
        </div>
    );
}

export default Users;

