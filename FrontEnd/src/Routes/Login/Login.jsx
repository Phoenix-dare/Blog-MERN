import './Login.css';
import React from 'react';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Context } from '../../Context/Context';

export default function Login() {
	const userRef = useRef();
	const passwordRef = useRef();
	const { dispatch, isFetching } = useContext(Context);
const divert= useNavigate();

	const handleSubmit = async e => {
		e.preventDefault();
		dispatch({ type: 'LOGIN_START' });
		try {
			const res = await axios.post('https://blog-backend2.saraths10.repl.co/auth/login', {
				username: userRef.current.value,
				password: passwordRef.current.value
			});
			dispatch({ type: 'LOGIN_SUCCESS', payload: res.data });
      res.data && divert("/")
      !res.data && divert("/register")
		} catch (err) {
      
			dispatch({ type: 'LOGIN_FAILURE' });
   
		}
  
	};

	return (
		<div className="login">
      <img src="./Login.svg" alt= ""/>

<div className="form">
			      <h4 className="loginTitle">Login</h4>
			      <form className="loginForm" onSubmit={handleSubmit}>
				        <label>Username</label>
				        <input
					type="text"
					className="loginInput"
					placeholder="Enter your username..."
					ref={userRef}
				/>
              <br></br>
				        <label>Password</label>
				        <input
					type="password"
					className="loginInput"
					placeholder="Enter your password..."
					ref={passwordRef}
				/>
				        <button
					className="loginButton"
					type="submit"
					disabled={isFetching}
				>
					          Login
				</button>
<br></br>

			</form>

			      <button className="loginRegisterButton">
				        <Link className="link" to="/register"> Register
                  
				</Link>

			</button>
      <br></br>
</div>
		</div>
	);
}
