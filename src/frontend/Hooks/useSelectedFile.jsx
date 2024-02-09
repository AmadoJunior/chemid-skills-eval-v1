// Deps
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useSelectedFile(fileKey) {
	// State
	const [selectedFile, setSelectedFile] = useState()

	// Effect
	useEffect(() => {
		if (!fileKey) return

		axios.get(`api/parser/${fileKey}`, { params: { requireDensity: true } })
			.then((response) => {
				if (response?.data) setSelectedFile(response.data)
			})
			.catch((err) => {
				console.error(err)
			})
	}, [fileKey])

	return { selectedFile, setSelectedFile }
}
