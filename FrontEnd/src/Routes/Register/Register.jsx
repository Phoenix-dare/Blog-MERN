import './Register.css';
import React from 'react';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
	const [username, setUsername] = useState('');
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState(false);
	const profilePic = '/default.jpg';
	const handleSubmit = async e => {
		e.preventDefault();
		setError(false);
		try {
			const res = await axios.post(
				'https://blog-backend2.saraths10.repl.co/auth/register',
				{
					name,
					username,
					password,
					email,
					profilePic
				}
			);
			res.data && window.location.replace('/login');
		} catch (err) {
			setError(true);
		}
	};
  
	return (
		<div className="register">
			<img src="./Register.svg" alt="" />
			<div className="registerForm">
				      <h4 className="registerTitle">Register</h4>
				      <form className="registerForm" onSubmit={handleSubmit}>
					<label>
						Name         <input
							type="text"
							className="registerInput"
							placeholder="Enter your Name..."
							onChange={e => setName(e.target.value)}
						/>
					</label>
					<label>
						Username         <input
							type="text"
							className="registerInput"
							placeholder="Enter your username..."
							onChange={e => setUsername(e.target.value)}
						/>
					</label>
					          <label>
						Password         <input
							type="password"
							className="registerInput"
							placeholder="Enter your password..."
							onChange={e => setPassword(e.target.value)}
						/>
					</label>
					        <label>
						{' '}
						Email         <input
							type="text"
							className="registerInput"
							placeholder="Enter your email..."
							onChange={e => setEmail(e.target.value)}
						/>
					</label>
					                <button className="registerButton" type="submit">
						          Register
					</button>
				</form>
				      <button className="registerLoginButton">
					        <Link className="link" to="/login">
						          Login
					</Link>
				</button>
				      {error && (
					<span style={{ color: 'red', marginTop: '10px' }}>
						Something went wrong!
					</span>
				)}
			</div>
		</div>
	);
}
