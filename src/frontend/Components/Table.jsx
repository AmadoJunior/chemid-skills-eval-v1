import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

export default function Table({ fileName, fileBody }) {
	// State
	const [headers, setHeaders] = useState(fileBody?.length > 0 ? Object.keys(fileBody[0]) : [])

	// Effect
	useEffect(() => {
		setHeaders(fileBody?.length > 0 ? Object.keys(fileBody[0]) : [])
	}, [fileBody])

	// Render
	return (
		<table>
			<thead>
				<tr>
					{headers.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>
			<tbody>
				{fileBody?.length && fileBody?.map((item) => (
					<tr key={`${fileName}_${item.compound}`}>
						{headers.map((header) => (
							<td key={`${fileName}_${item.compound}_${header}`}>{item[header]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	)
}

Table.propTypes = {
	fileName: PropTypes.string.isRequired,
	fileBody: PropTypes.arrayOf(PropTypes.object).isRequired
}
