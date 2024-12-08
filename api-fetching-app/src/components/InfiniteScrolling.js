import React, { useState, useEffect, useRef } from 'react';

const InfiniteScroll = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const observer = useRef();

    useEffect(() => {
        const fetchPosts = async () => {
            if (loading || !hasMore) return;

            setLoading(true);
            try {
                const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=10`);
                const data = await response.json();
                setPosts((prevPosts) => [...prevPosts, ...data]);
                if (data.length === 0) setHasMore(false); // No more posts to load
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [page]);

    const lastPostElementRef = (node) => {
        if (loading) return;
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
                setPage((prevPage) => prevPage + 1);
            }
        });
        if (node) observer.current.observe(node);
    };

    return (
        <div>
            <h2>Infinite Scrolling</h2>
            {posts.length === 0 && !loading && <p>No posts available</p>}
            {posts.map((post, index) => (
                <div key={post.id} ref={posts.length === index + 1 ? lastPostElementRef : null}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </div>
            ))}
            {loading && <div>Loading...</div>}
            {!hasMore && <div>No more posts to load</div>}
        </div>
    );
};

export default InfiniteScroll;
