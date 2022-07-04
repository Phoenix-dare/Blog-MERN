import './Post.css';
import React from 'react';
import { Card } from '@mui/material';

import { Link } from 'react-router-dom';

export default function Post({ post }) {
	const PF = 'https://blog-backend2.saraths10.repl.co/images/';
	return (
		<Card className="post">
			      {post.photo && (
				<img className="postImg" src={PF + post.photo} alt="" />
			)}
			      <div className="postInfo">
				        <div className="postCats">

					<span className="postCat">{post.category}</span>
				</div>
				        <Link to={`/post/${post._id}`} className="link">
					          <h3 className="postTitle">{post.title}</h3>
				</Link>
				        <hr />
				        <span className="postDate">
					         			 {new Date(post.createdAt).toDateString()}
	</span>
			</div>
			      <p className="postDesc">{post.desc}</p>
		</Card>
	);
}
