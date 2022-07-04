import './Sidebar.css';
import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar() {
	const [cats, setCats] = useState([]);

	useEffect(() => {
		const getCats = async () => {
			const res = await axios.get(
				'https://blog-backend2.saraths10.repl.co/categories/'
			);
			setCats(res.data);
		};
		getCats();
	}, []);
	return (
		<div className="sidebar">
			      <div className="sidebarItem">
				               <h3 className="sidebarTitle">CATEGORIES</h3>
				        <ul className="sidebarList">
					          {cats.map(c => (
						<Link key={c._id} to={`/?cat=${c.name}`} className="link">
							            <li key= {cats._id} className="sidebarListItem">{c.name}</li>
						</Link>
					))}
				</ul>
			</div>
		</div>
	);
}
