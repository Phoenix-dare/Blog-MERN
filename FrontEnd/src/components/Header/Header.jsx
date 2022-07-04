import './Header.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function Header() {
	const [imagebg, setImagebg] = useState('');
	const [quote, setQuote] = useState('');

	useEffect(async () => {
		const res = await fetch('https://picsum.photos/760/1020').then(res =>
			setImagebg(res.url)
		);
	}, []);
	useEffect(async () => {
		const response = await fetch('https://api.quotable.io/random')
			.then(res => res.json())
			.then(data => setQuote(data));
	}, []);


	return (
		<div
			className="header"
			style={{
				backgroundImage: `url(${imagebg})`,
				backgroundRepeat: 'no-repeat'
			}}
		>
			<blockquote
				className="quote"
			>
				{quote.content}
				<br />
				- {quote.author}
			</blockquote>
		</div>
	);
}
