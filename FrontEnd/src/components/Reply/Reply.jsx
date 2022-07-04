import React from 'react';
import './Reply.css';
import { useState, useRef, useContext, useEffect } from 'react';
import { Context } from '../../Context/Context';
import axios from 'axios';

export default function Reply({ comId }) {
	const [reply, setReply] = useState('');
	const [getrep, setGetrep] = useState([]);
  const [update,setUpdate]=useState(true)
	const { user } = useContext(Context);
  const PF = 'https://blog-backend2.saraths10.repl.co/images/';
const time=new Date()
	const typeReply = e => {
		e.preventDefault();
		setReply(e.target.value);
	};

	const handleReply = async e => {
		console.log(comId);
		const newReply = {
      userId:user._id,
			commentId: comId,
			username: user.username,
			reply,
      profilePic:user.profilePic,
      updatedAt:time.toLocaleDateString()
		};
		try {
			const res = await axios.put(
				`https://blog-backend2.saraths10.repl.co/comments/reply/${comId}`,
				newReply
			);
setUpdate(prevVal=>!prevVal)

		} catch (err) {
			console.log(err);
		}
	};
  useEffect(
		() => {
			const getReply = async () => {
				const res = await axios.get(
					`https://blog-backend2.saraths10.repl.co/comments/get/reply?comId=${comId}`
				);
				setGetrep(res.data[0]);
        console.log(res.data)
			};
			getReply();
		},
		[comId,update]
	);

		
  
	return (
		<div className="reply">
  {user ?<label htmlFor="reply_comment">
				<input
					onChange={typeReply}
					id="reply_comment"
					placeholder="Add Reply"
				/>
				<button className="reply_button" type="submit" onClick={handleReply}>
					Reply
				</button>
			</label> : <span></span> }
			<div>
				<div className="reply_show">
          {getrep  && getrep.map((rep)=> 
      <div className="reply_box" >

<div key={rep._id} className="reply_user">
        <img className="pic" src={PF+rep.profilePic}/>
          <span>{rep.username}</span>
  </div>
        <p>{rep.reply}<br></br> 
      
      
<span className="date">{rep.updatedAt}
</span>

      </p>
        

        </div>)}</div>
			</div>
		</div>
	);
}
