// Deps
import { useRef } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'

export default function FileUpload({ onUploadSuccess }) {
	// Refs
	const fileInputRef = useRef()

	// Handlers
	const handleFileUpload = (e) => {
		e.preventDefault()
		const file = fileInputRef.current?.files[0]
		if (!file) return

		const formData = new FormData()
		formData.append('file', file)

		axios.post('/api/uploads', formData, { headers: { 'content-type': 'multipart/form-data' } })
			.then((response) => {
				if (response?.data) {
					onUploadSuccess(response.data)
					fileInputRef.current.value = ''
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}

	// Render
	return (
		<form onSubmit={handleFileUpload}>
			<div className='form-group'>
				<input type='file' ref={fileInputRef} className='form-control-file' />
				<input type='submit' className='form-control-submit' value='Upload' />
			</div>
		</form>
	)
}

FileUpload.propTypes = {
	onUploadSuccess: PropTypes.func.isRequired
}
