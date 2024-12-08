import React, { useState, useEffect } from 'react';

const PaginatedUsers = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const usersPerPage = 2;

    const fetchUsers = async (page) => {
        setLoading(true);
        try {
            const response = await fetch(
                `https://jsonplaceholder.typicode.com/users?_page=${page}&_limit=${usersPerPage}`
            );
            if (!response.ok) {
                throw new Error('Failed to fetch users');
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            console.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(page);
    }, [page]);

    const handleNext = () => {
        setPage((prevPage) => prevPage + 1);
    };

    const handlePrevious = () => {
        setPage((prevPage) => (prevPage > 1 ? prevPage - 1 : 1));
    };

    return (
        <div>
            <h2>Paginated User List</h2>

            {loading && <p>Loading...</p>}

            <ul>
                {users.map((user) => (
                    <li key={user.id}>
                        <strong>{user.name}</strong>
                        <p>{user.email}</p>
                    </li>
                ))}
            </ul>

            <div>
                <button onClick={handlePrevious} disabled={page === 1}>
                    Previous
                </button>
                <button onClick={handleNext} disabled={users.length < usersPerPage}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default PaginatedUsers;
