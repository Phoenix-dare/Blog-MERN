import React from 'react';
import './Comment.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';
import Reply from '../Reply/Reply'

export default function Comments({ postId }) {
  const PF = 'https://blog-backend2.saraths10.repl.co/images/';
	const [comment, setComment] = useState('');
	const [getcom, setGetcom] = useState([]);
  const [reload,setReload]=useState(true)
  const { user } = useContext(Context);
	const typeComment = e => {
		e.preventDefault();
		setComment(e.target.value);
	};

	const handleComment = async e => {
		const newComment = {
      userId:user._id,
			postId: postId._id,
			username: user.username,
			comment,
		  profilePic:user.profilePic
		};
		try {
			const res = await axios.post(
				'https://blog-backend2.saraths10.repl.co/comments',
				newComment
			);
setReload(preVal=>!preVal)

		} catch (err) {
			console.log(err);
		}
	};
  


	useEffect(() => {
  
  
		const getComments = async () => {
  
			const res = await axios.get(
				`https://blog-backend2.saraths10.repl.co/comments?postId=${postId._id}`
			);
			setGetcom(res.data);


		};
		getComments();
	}, [postId._id,reload]);



	return (
		<div className="comments">
  
      
			<label htmlFor="main_comment">
				<textarea
					onChange={typeComment}
					id="main_comment"
					cols="50"
					rows="5"
					placeholder={!user ? "You must be logged in to comment on posts" : "Add comments"}
          disabled={!user ? true : false}
				/>
				<button type="submit" onClick={handleComment}>
					Comment
				</button>
			</label>
      <div>
        
        <div className="comments_show">{getcom.map((comm)=> 
      <div className="single_comment">
        <div key={comm._id} className="user_container">
<img  className="pic" src={PF + comm.profilePic} alt=""/> 
        <span >{comm.username}</span>
</div>
        <p >{comm.comment}<br></br> 
        
          <span className="date"> {new Date(comm.createdAt).toDateString()}
</span>
      </p>
        <Reply comId={comm._id}/>

        </div>)}</div>
		
	
</div>
		</div>
	);
}
