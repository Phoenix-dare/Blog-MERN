import Post from '../Post/Post';
import './Posts.css';
import React from 'react';
import Card from '@mui/material/Card';

export default function Posts({ posts }) {
	return (
		<div className="posts">{posts.map(p => <Post key={p._id} post={p} />)}</div>
	);
}
