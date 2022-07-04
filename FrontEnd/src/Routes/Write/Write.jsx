import './Write.css';
import React from 'react';
import axios from 'axios';
import { useContext, useState } from 'react';
import { Context } from '../../Context/Context';
import UploadFileIcon from '@mui/icons-material/UploadFile';

export default function Write() {
	const [title, setTitle] = useState('');
	const [desc, setDesc] = useState('');
  const [category,setCategory]=useState("")
	const [file, setFile] = useState(null);
	const { user } = useContext(Context);

	const handleSubmit = async e => {
		e.preventDefault();
		const newPost = {
			username: user.username,
			title,
			desc,
      category,
		};
		if (file) {
			const data = new FormData();
			const filename = Date.now() + file.name;
			data.append('name', filename);
			data.append('file', file);
			newPost.photo = filename;
			try {
				await axios.post(
					'https://blog-backend2.saraths10.repl.co/upload',
					data
				);
			} catch (err) {}
		}
		try {
			const res = await axios.post(
				'https://blog-backend2.saraths10.repl.co/post',
				newPost
			);
			window.location.replace('/post/' + res.data._id);
		} catch (err) {}
	};
	return (
		<div className="write">
			      {file && (
				<img className="writeImg" src={URL.createObjectURL(file)} alt="" />
			)}
			      <form className="writeForm" onSubmit={handleSubmit}>
				        <div className="writeFormGroup">
					          <label htmlFor="fileInput">Upload Photo
						<UploadFileIcon />
					</label>
                  
					          <input
						type="file"
						id="fileInput"
						style={{ display: 'none' }}
						onChange={e => setFile(e.target.files[0])}
					/>
					          <input
						type="text"
						placeholder="Title"
						className="writeInput"
						autoFocus={true}
						onChange={e => setTitle(e.target.value)}
					/>
				</div>
				        <div className="writeFormGroup">
					          <textarea cols="30"
	rows="20"					placeholder="Tell your story..."
						type="text"
						className="writeInput writeText"
						onChange={e => setDesc(e.target.value)}
					/>
					<label>
						Category
						<select onChange={e=>
              setCategory(e.target.value)
            }>
							<option value="Music">Music</option>
							<option value="Sports">Sports</option>
							<option selected value="Fashion">
								Fashion
							</option>
							<option value="Tech">Tech</option>
							<option value="Lifestyle">Lifestyle</option>
							<option value="DIY">DIY</option>
							<option selected value="Politics">
								Politics
							</option>
							<option value="Food">Food</option>
							<option value="Travel">Travel</option>
							<option value="Arts">Arts</option>
							<option selected value="Business">
								Business
							</option>
							<option value="Relationship">Relationship</option>
							<option value="Books">Books</option>
							<option selected value="Science">
								Science
							</option>
							<option selected value="Movies">
								Movies
							</option>
						<option selected value="Others">
								Other
							</option>
</select>
					</label>
				</div>
				        <button className="writeSubmit" type="submit">
					          Publish
				</button>
			</form>
		</div>
	);
}
