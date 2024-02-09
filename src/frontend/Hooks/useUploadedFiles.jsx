// Deps
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function useUploadedFiles() {
	// State
	const [files, setFiles] = useState({})
	const [firstFileKey, setFirstFileKey] = useState(null)

	// Effect
	useEffect(() => {
		axios.get('api/uploads')
			.then((response) => {
				if (response?.data) {
					const objectList = response.data

					if (objectList.length > 0) {
						setFirstFileKey(objectList[0].fileName)
					}

					const filesObj = objectList.reduce((acc, { fileName, fileUrl }) => {
						acc[fileName] = fileUrl
						return acc
					}, {})

					setFiles(filesObj)
				}
			})
			.catch((err) => {
				console.error(err)
			})
	}, [])

	return { files, setFiles, firstFileKey }
}
