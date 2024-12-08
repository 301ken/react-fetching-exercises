import React, { useState, useEffect } from 'react';

const CachedUserData = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const cache = React.useRef({});

    useEffect(() => {
        const fetchUsers = async () => {
            if (cache.current.users) {
                setUsers(cache.current.users);
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/users');
                const data = await response.json();


                cache.current.users = data;

                setUsers(data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch users');
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CachedUserData;
