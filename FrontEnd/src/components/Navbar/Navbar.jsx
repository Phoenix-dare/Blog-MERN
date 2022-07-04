import React from 'react';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import './Navbar.css';
import { Link,useNavigate} from 'react-router-dom';
import { Tabs, Tab, TextField } from '@mui/material';
import styled from 'styled-components';
import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';

export default function Navbar() {
	const { user, dispatch } = useContext(Context);
const navigate = useNavigate();
  
	const PF = 'https://blog-backend2.saraths10.repl.co/images/';


	const handleLogout = () => {
		dispatch({ type: 'LOGOUT' });
	};
	const [search, setSearch] = useState('');
  const[results,setResults]=useState('');
	const handleSearch = e => {
		setSearch(e.target.value);
	};
  const sendSearch=()=>{
navigate (`/?search=${search}`)

}
  {/*const sendSearch = async () => {
		try {
			const res=await axios.get(
				`https://blog-backend2.saraths10.repl.co/post?search=${search}`
			)
      setResults(res.data)
      
		} catch (err) {}
	};*/}
	console.log(search,results);
	return (
		<div className="navbar">
			<div className="topMost">
				<div className="logo">
					<img
						src="./default.svg"
						alt=""
						style={{
							width: '7rem',
							height: '7rem',
							flex: 0.3
						}}
					/>
				</div>
				<div className="search-box" onClick={sendSearch}>
					<input type="text" placeholder="Search" onChange={handleSearch} />
					                              <SearchIcon />
				</div>
				<div />

				<div className="access">
					
					{user ? (
						<Link to="/settings">
							<img className="topImg" src={PF + user.profilePic} alt="" />
              <span>{user.name}</span>
						</Link>
					) : (
						<ul className="topList">
							<Link to="/login">
								            <li className="topListItem">Login             </li>
							</Link>
							<Link to="/register">
								<li className="topList">Register             </li>
							</Link>
						</ul>
					)}
          <li className="topListItem" onClick={handleLogout}>
						{user && 'Logout'}
					</li>
				</div>
			</div>
			      <div className="center">
				<Tabs centered value={false}>
					<Link to="/">
						<Tab label="Home" value="/"/>
					</Link>
					<Link to="/about">
						<Tab label="About" value="/about"/>
					</Link>

					<Link to="/contact">
						<Tab label="Contact" value="/contact"/>
					</Link>

					<Link to="/write">
						<Tab label="Write" value="write" />
					</Link>
				</Tabs>
			</div>
		</div>
	);
}
