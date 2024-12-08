import React, { useState, useEffect } from 'react';

const MasterDetailView = () => {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleRowClick = async (userId) => {
        setLoading(true);
        setSelectedUser(null); // Reset selected user on new request
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
            const userData = await response.json();
            setSelectedUser(userData);
        } catch (err) {
            setError('Failed to fetch user details');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>User List</h2>
            {loading && !selectedUser ? (
                <div>Loading users...</div>
            ) : error ? (
                <div>{error}</div>
            ) : (
                <table>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id} onClick={() => handleRowClick(user.id)}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}

            {selectedUser && (
                <div>
                    <h3>Selected User Details</h3>
                    {loading ? (
                        <div>Loading user details...</div>
                    ) : (
                        <div>
                            <p><strong>Name:</strong> {selectedUser.name}</p>
                            <p><strong>Email:</strong> {selectedUser.email}</p>
                            <p><strong>Phone:</strong> {selectedUser.phone}</p>
                            <p><strong>Website:</strong> {selectedUser.website}</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default MasterDetailView;
