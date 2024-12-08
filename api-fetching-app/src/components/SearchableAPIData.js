import React, { useState, useEffect } from 'react';

const SearchablePosts = () => {
    const [posts, setPosts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('https://jsonplaceholder.typicode.com/posts');
                const data = await response.json();
                setPosts(data);
                setFilteredPosts(data); // Initially, show all posts
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };

        fetchPosts();
    }, []);


    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    return (
        <div>
            <h2>Searchable Posts</h2>

            <input
                type="text"
                placeholder="Search posts by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '8px', margin: '10px 0', width: '100%' }}
            />

            <ul>
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((post) => (
                        <li key={post.id}>
                            <strong>{post.title}</strong>
                            <p>{post.body}</p>
                        </li>
                    ))
                ) : (
                    <li>No posts found</li>
                )}
            </ul>
        </div>
    );
};

export default SearchablePosts;
