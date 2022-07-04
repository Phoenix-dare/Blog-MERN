import React from 'react';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import Header from './components/Header/Header';

import Home from './Routes/Home/Home';
import Write from './Routes/Write/Write';
import Settings from './Routes/Settings/Settings';
import Login from './Routes/Login/Login';
import Register from './Routes/Register/Register';
import Single from './Routes/Single/Single';
import Contact from './Routes/Contact/Contact';
import About from './Routes/About/About';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useContext } from "react"; 
 import { Context } from "./Context/Context";

function App() {
const { user } = useContext(Context)

	return (
		<>
			<Router>
				<Navbar />
			
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/write" element={user ? <Write /> : <Register />} />
					<Route path="/settings" element={<Settings />} />
					<Route path="/login" element={user ?<Home /> : <Login />} />
					<Route path="/register" element={user ? <Home /> : <Register />} />
          <Route path="/post/:postId" element={<Single />} />
      <Route path="/contact" element={<Contact/>} />
        <Route path="/about" element={<About/>}/>
				</Routes>
			</Router>
		</>
	);
}

export default App;
