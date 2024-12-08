import React, { useState, useEffect } from 'react';

const DebouncedSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (searchTerm) {
                fetchPosts(searchTerm);
            } else {
                setPosts([]);
            }
        }, 300);

        return () => clearTimeout(debounceTimeout);
    }, [searchTerm]);

    const fetchPosts = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
            const data = await response.json();
            const filteredPosts = data.filter(post =>
                post.title.toLowerCase().includes(query.toLowerCase())
            );
            setPosts(filteredPosts);
        } catch (err) {
            setError('Failed to fetch posts');
        } finally {
            setLoading(false);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    return (
        <div>
            <h2>Debounced Search with REST API</h2>
            <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={handleSearchChange}
            />
            {loading && <div>Loading...</div>}
            {error && <div>{error}</div>}
            {posts.length === 0 && !loading && <div>No posts found</div>}
            <ul>
                {posts.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
};

export default DebouncedSearch;
