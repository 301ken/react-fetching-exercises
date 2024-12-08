import React, { useState, useEffect } from 'react';

const UserPostsDynamic = () => {
    const [userId, setUserId] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchPosts = async (id) => {
        setLoading(true);
        setError('');
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch posts');
            }
            const data = await response.json();
            setPosts(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (userId) {
            fetchPosts(userId);
        }
    }, [userId]);

    const handleInputChange = (event) => {
        setUserId(event.target.value);
    };

    return (
        <div>
            <h2>Fetch Posts for a Specific User</h2>

            <div>
                <input
                    type="number"
                    placeholder="Enter User ID"
                    value={userId}
                    onChange={handleInputChange}
                />
                <button onClick={() => fetchPosts(userId)} disabled={loading || !userId}>
                    Fetch Posts
                </button>
            </div>

            {loading && <p>Loading posts...</p>}

            {error && <p style={{ color: 'red' }}>Error: {error}</p>}

            {posts.length > 0 && !loading && !error && (
                <div>
                    <h3>Posts for User ID: {userId}</h3>
                    <ul>
                        {posts.map((post) => (
                            <li key={post.id}>
                                <strong>{post.title}</strong>
                                <p>{post.body}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default UserPostsDynamic;
