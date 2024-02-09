// Deps
import { useEffect, useState } from 'react'

// Components
import FileUpload from './Components/FileUpload'
import UploadedFilesList from './Components/UploadedFilesList'
import Table from './Components/Table'

// Hooks
import useUploadedFiles from './Hooks/useUploadedFiles'
import useSelectedFile from './Hooks/useSelectedFile'

export default function Home() {
	// State
	const [selectedFileKey, setSelectedFileKey] = useState()
	const { files, setFiles, firstFileKey } = useUploadedFiles()
	const { selectedFile } = useSelectedFile(selectedFileKey)

	// Handlers
	const handleUploadSuccess = ({ fileName, fileUrl }) => {
		setFiles((prev) => ({ ...prev, [fileName]: fileUrl }))
		setSelectedFileKey(fileName)
	}

	// Effect
	useEffect(() => {
		if (!selectedFileKey?.length) setSelectedFileKey(firstFileKey)
	}, [firstFileKey])

	return (
		<main>
			<h1>Data Extractor</h1>
			<FileUpload onUploadSuccess={handleUploadSuccess} />
			<UploadedFilesList files={files} onSelectFile={setSelectedFileKey} />
			{selectedFile && (
				<>
					<h4>Parsed Values</h4>
					<Table fileName={selectedFile.fileName} fileBody={selectedFile.fileBody} />
					<h4>Computed Density</h4>
					<Table fileName={selectedFile.fileName} fileBody={selectedFile.computedValues} />
				</>
			)}
		</main>
	)
}
