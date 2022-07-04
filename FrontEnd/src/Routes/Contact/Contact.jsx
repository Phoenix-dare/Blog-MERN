import React, { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import './Contact.css';

export default function Contacts() {
	const [email, setSuccessEmail] = useState(false);
	const form = useRef();

	const sendEmail = e => {
		e.preventDefault();

		emailjs
			.sendForm(
				'service_cpvqrh6',
				'template_j4qvmvh',
				form.current,
				'tRmLJMoNe0wLTT4Si'
			)
			.then(
				result => {
setSuccessEmail(true);
					console.log(result.text);
				},
				error => {
					console.log(error.text);
				}
			);
	};
console.log(email)
	return (
		<div className="contact">
			<form ref={form} onSubmit={sendEmail}>
				<label>Name</label>
				<input type="text" name="user_name" />
				<label>Email</label>
				<input type="email" name="user_email" />
				<label>Message</label>
				<textarea rows="20" cols="30" name="message" />
				<input type="submit" value="Send" />
        

			</form>
      {email && <footer style={{
      color:'green',
      padding:'0.5rem',
      
      
      }}>Success!!</footer>}
			<div className="contact-bottom">
				      <div className="social">

					<FacebookIcon />
					<InstagramIcon />
					       <TwitterIcon />
				</div>
			</div>
		</div>
	);
}
