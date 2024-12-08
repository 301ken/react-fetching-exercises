import React, { useState, useEffect } from 'react';

const HandleAPIErrorGracefully = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch data from the API
    const fetchData = async () => {
        setLoading(true);
        setError(null); // Reset error state before the fetch
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/invalid-endpoint');
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            const result = await response.json();
            setData(result);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // Fetch data initially
    useEffect(() => {
        fetchData();
    }, []);

    // Retry the fetch
    const handleRetry = () => {
        fetchData();
    };

    // Show loading state, error message, or data
    return (
        <div>
            <h2>Handle API Errors Gracefully</h2>

            {loading && !error && <p>Loading...</p>}

            {error && (
                <div>
                    <p style={{ color: 'red' }}>Error: {error}</p>
                    <button onClick={handleRetry}>Retry</button>
                </div>
            )}

            {data && !error && !loading && (
                <div>
                    <p>Data successfully fetched!</p>
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default HandleAPIErrorGracefully;
