import { useState } from 'react'
import axios from 'axios'

export default function Home() {
	const [file, setFile] = useState()

	const handleFile = (e) => {
		if (e.target.files?.length) setFile(e.target.files[0])
	}

	const handleUpload = (e) => {
		e.preventDefault()

		const formData = new FormData()
		formData.append('file', file)
		formData.append('fileName', file.name)

		const axiosConfig = {
			headers: {
				'content-type': 'multipart/form-data'
			}
		}

		axios.post('/api/upload', formData, axiosConfig)
			.then((response) => {
				console.log(response.status, response.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}

	return (
		<main>
			<h1>Data Extractor</h1>
			<div>
				<h2>Uploaded Files</h2>
				<ul>
					<li>File1</li>
					<li>File2</li>
					<li>File3</li>
				</ul>
			</div>
			<form onSubmit={handleUpload}>
				<div className='form-group'>
					<input type='file' className='form-control-file' onChange={handleFile} />
					<input type='submit' className='form-control-submit' value='Upload' />
				</div>
			</form>
		</main>
	)
}
