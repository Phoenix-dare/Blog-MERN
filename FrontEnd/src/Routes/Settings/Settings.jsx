import './Settings.css';
import React from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import ConfirmDialog from '../../components/ConfirmDialog/Confirm';

import UploadFileIcon from '@mui/icons-material/Settings';
import { useContext, useState } from 'react';
import { Context } from "../../Context/Context";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IconButton from  '@material-ui/core/Button';
import DeleteIcon from '@material-ui/core/Button';

export default function Settings() {
	const [file, setFile] = useState(null);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [success, setSuccess] = useState(false);
const backHome=useNavigate();
  const [confirmOpen,setConfirmOpen]=useState(false)
	const { user, dispatch } =useContext(Context);
	const PF = 'https://blog-backend2.saraths10.repl.co/images/';

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch({ type: 'UPDATE_START' });
		const updatedUser = {
			userId:user._id,
			username,
			email,
			password
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			updatedUser.profilePic = filename;
			try {
				await axios.post("https://blog-backend2.saraths10.repl.co/upload", data);
			} catch (err) {}
		}
		try {
			const res = await axios.put('https://blog-backend2.saraths10.repl.co/users/'+ user._id, updatedUser);
			setSuccess(true);
			dispatch({ type: 'UPDATE_SUCCESS', payload: res.data });
		} catch (err) {
			dispatch({ type: 'UPDATE_FAILURE' });
		}
	};
const handleDelete=async ()=>{
  try {
				await axios.delete(`https://blog-backend2.saraths10.repl.co/users/${user._id}`, 
                           {
                             userId:user._id,
			username,
			email,
			password
		},
          localStorage.removeItem("user"),
dispatch({ type:'DELETE_ACC' }),
    backHome("/")
                          );
			} catch (err) {
    console.log(err)
      }
}




  
	return (
		<div className="settings">
			      <div className="settingsWrapper">
				        <div className="settingsTitle">
					          <span className="settingsUpdateTitle">
						Update Your Account
					</span>
					          
				</div>
				        <form className="settingsForm" onSubmit={handleSubmit}>
					          <label>Profile Picture</label>
					          <div className="settingsPP">
						            <img className="userPic"
							src={file ? URL.createObjectURL(file) : PF + user.profilePic}
							alt=""
						/>
						            <label htmlFor="fileInput">
							              <UploadFileIcon/>
						</label>
						            <input
							type="file"
							id="fileInput"
							style={{ display: 'none' }}
							onChange={e => setFile(e.target.files[0])}
						/>
					</div>
					          <label>Username</label>
					          <input
						type="text"
						placeholder={user.username}
						onChange={e => setUsername(e.target.value)}
					/>
					          <label>Email</label>
					          <input
						type="email"
						placeholder={user.email}
						onChange={e => setEmail(e.target.value)}
					/>
					          <label>Password</label>
					          <input
						type="password"
						onChange={e => setPassword(e.target.value)}
					/>
					          <button className="settingsSubmit" type="submit">
						            Update
					</button>
<button style={{color:"white",
                background:"red",
                margin:"0.4rem",
               }}



className="settingsDeleteTitle"aria-label="delete" onClick={() =>setConfirmOpen(true)}>Delete Account</button>
                  <div>
  
  <ConfirmDialog
    title="Delete Account?"
    open={confirmOpen}
    setOpen={setConfirmOpen}
    onConfirm={handleDelete}
  >
   This action cannot be undone. Are you sure you want to delete this account and associated activities?
  </ConfirmDialog>
</div>

					          {success && (
						<span
							style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}
						>
							              Profile has been updated...
						</span>
					)}
				</form>
			</div>
			      <Sidebar />
		</div>
	);
}
