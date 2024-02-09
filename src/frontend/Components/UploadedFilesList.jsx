// Deps
import PropTypes from 'prop-types'

export default function UploadedFilesList({ files, onSelectFile }) {
	if (Object.keys(files).length === 0) {
		return <p>No Files Found</p>
	}

	return (
		<ul>
			{Object.keys(files).map((key) => (
				<li key={key}>
					<p>{key}</p>
					<button onClick={() => onSelectFile(key)} type='button'>Select</button>
				</li>
			))}
		</ul>
	)
}

UploadedFilesList.propTypes = {
	onSelectFile: PropTypes.func.isRequired,
	files: PropTypes.object.isRequired
}
