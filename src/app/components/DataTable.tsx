'use client'
import fakeData from '@lib/fakeData.json'
console.log(fakeData)

import React from 'react'

type User = {
	userId: string
	name: string
	timeEntries: {
		id: string
		description: string
		projectId: string
		timeInterval: {
			start: string
			end: string
			duration: string
		}
		projectName: string
	}[]
}

type Props = {
	data: User[]
}

const DataTable: React.FC<Props> = ({ data }) => {
	const twoWeeksAgo = new Date()
	twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14)

	return (
		<table>
			<thead>
				<tr>
					<th>Employee Name</th>
					<th>Project Name</th>
					<th>Description</th>
					<th>Date</th>
					<th>Duration</th>
				</tr>
			</thead>
			<tbody>
				{data.map((user) =>
					user.timeEntries
						// Filter out entries older than 2 weeks
						.filter(
							(entry) => new Date(entry.timeInterval.start) >= twoWeeksAgo
						)
						.map((entry) => (
							<tr key={entry.id}>
								<td>{user.name}</td>
								<td>{entry.projectName}</td>
								<td>{entry.description}</td>
								<td>
									{new Date(entry.timeInterval.start).toLocaleDateString()}
								</td>
								<td>{entry.timeInterval.duration}</td>
							</tr>
						))
				)}
			</tbody>
		</table>
	)
}

export default DataTable
