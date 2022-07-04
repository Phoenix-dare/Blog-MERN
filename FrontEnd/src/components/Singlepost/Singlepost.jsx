import './Singlepost.css';
import React from 'react';
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { Context } from '../../Context/Context';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Comments from '../Comment/Comment';

export default function SinglePost() {
	const location = useLocation();
	const path = location.pathname.split('/')[2];
	const [post, setPost] = useState({});
	const PF = 'https://blog-backend2.saraths10.repl.co/images/';
	const { user } = useContext(Context);
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
	const [updateMode, setUpdateMode] = useState(false);

	useEffect(
		() => {
			const getPost = async () => {
				const res = await axios.get(
					'https://blog-backend2.saraths10.repl.co/post/' + path
				);
				setPost(res.data);
				setTitle(res.data.title);
				setDesc(res.data.desc);
			};
			getPost();
		},
		[path]
	);

	const handleDelete = async () => {
		try {
			await axios.delete(
				`https://blog-backend2.saraths10.repl.co/post/${post._id}`,
				{
					data: { username: user.username }
				}
			);
			window.location.replace('/');
		} catch (err) {}
	};

	const handleUpdate = async () => {
		try {
			await axios.put(
				`https://blog-backend2.saraths10.repl.co/user/post/${post._id}`,
				{
					username: user.username,
					title,
					desc
				}
			);
			setUpdateMode(false);
		} catch (err) {}
	};

	return (
		<>
			<div className="singlePost">
				      <div className="singlePostWrapper">
					        {post.photo && (
						<img src={PF + post.photo} alt="" className="singlePostImg" />
					)}
					        {updateMode ? (
						<input
							type="text"
							value={title}
							className="singlePostTitleInput"
							autoFocus
							onChange={e => setTitle(e.target.value)}
						/>
					) : (
						<h1 className="singlePostTitle">
							            {title}
							            {post.username === user?.username && (
								<div className="singlePostEdit" >
									<span onClick={() => setUpdateMode(true)}>               
                    <EditIcon
										className="singlePostIcon "
										
									/>Edit
                  </span>
									<span onClick={handleDelete}>          <DeleteIcon
										className="singlePostIcon"
										
									/>Delete</span> 
								</div>
							)}
						</h1>
					)}
					        <div className="singlePostInfo">
						          <span className="singlePostAuthor">
							Author:<Link to={`/?user=${post.username}`} className="link">
								              <b> {post.username}</b>
							</Link>
						</span>
						          <span className="singlePostDate">
							            {new Date(post.createdAt).toDateString()}
						</span>
					</div>
					        {updateMode ? (
						<textarea
							className="singlePostDescInput"
							value={desc}
							onChange={e => setDesc(e.target.value)}
						/>
					) : (
						<p className="singlePostDesc">{desc}</p>
					)}
					        {updateMode && (
						<button className="singlePostButton" onClick={handleUpdate}>
							            Update
						</button>
					)}
				</div>
			</div>
			<Comments className="comment_container" postId={post} />
		</>
	);
}
