'use client'

import React, { useState } from 'react'
import { formatDate } from '../helpers/formatDate'
import { formatDuration } from '../helpers/formatDuration'

interface TimeEntry {
	id: string
	description: string
	tagIds: null
	userId: string
	billable: boolean
	taskId: null
	projectId: string
	timeInterval: {
		start: string
		end: string
		duration: string
	}
	workspaceId: string
	isLocked: boolean
	customFieldValues: any[]
	type: string
	kioskId: null
	projectName: string
}

interface Employee {
	userId: string
	name: string
	timeEntries: TimeEntry[]
}

interface TableProps {
	data: Employee[]
}

const Table: React.FC<TableProps> = ({ data }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [selectedEmployee, setSelectedEmployee] = useState('')
	const [selectedDateRange, setSelectedDateRange] = useState('all')
	const entriesPerPage = 10

	// Calculate the index of the first and last entry of the current page
	const indexOfLastEntry = currentPage * entriesPerPage
	const indexOfFirstEntry = indexOfLastEntry - entriesPerPage

	// Filter the data based on selected employee and date range
	const filteredData = selectedEmployee
		? data.filter((entry) => entry.name === selectedEmployee)
		: data

	const filteredEntries = filteredData
		.map((entry) => entry.timeEntries)
		.flat()
		.filter((entry) => {
			if (selectedDateRange === 'all') {
				return true
			}

			const today = new Date()
			const entryDate = new Date(entry.timeInterval.start)

			if (selectedDateRange === '2weeks') {
				const twoWeeksAgo = new Date()
				twoWeeksAgo.setDate(today.getDate() - 14)
				return entryDate >= twoWeeksAgo
			}

			if (selectedDateRange === '30days') {
				const thirtyDaysAgo = new Date()
				thirtyDaysAgo.setDate(today.getDate() - 30)
				return entryDate >= thirtyDaysAgo
			}

			if (selectedDateRange === '60days') {
				const sixtyDaysAgo = new Date()
				sixtyDaysAgo.setDate(today.getDate() - 60)
				return entryDate >= sixtyDaysAgo
			}

			return true
		})

	const currentEntries = filteredEntries.slice(
		indexOfFirstEntry,
		indexOfLastEntry
	)

	// Calculate the total number of pages
	const totalPages = Math.ceil(filteredEntries.length / entriesPerPage)

	// Handle page navigation
	const handlePageChange = (pageNumber: number) => {
		setCurrentPage(pageNumber)
	}

	// Handle filter change
	const handleEmployeeFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedEmployee(e.target.value)
		setCurrentPage(1)
	}

	// Handle date range filter change
	const handleDateRangeFilterChange = (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		setSelectedDateRange(e.target.value)
		setCurrentPage(1)
	}

	return (
		<>
			<table className='w-3/4 m-10 max-h-96 table-auto text-sm text-left text-gray-500 dark:text-gray-400'>
				<caption className='p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800'>
					<div className='m-2'>
						<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Filter by Employee:
						</label>
						<select
							title='Select Employee'
							value={selectedEmployee}
							onChange={handleEmployeeFilterChange}
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						>
							<option value=''>All</option>
							{data.map((entry) => (
								<option key={entry.userId} value={entry.name}>
									{entry.name}
								</option>
							))}
						</select>
					</div>
					<div className='m-2'>
						<label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
							Filter by Date Range:
						</label>
						<select
							value={selectedDateRange}
							onChange={handleDateRangeFilterChange}
							title='Filter by Date Range'
							className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
						>
							<option value='all'>All</option>
							<option value='2weeks'>Last 2 Weeks</option>
							<option value='30days'>Last 30 Days</option>
							<option value='60days'>Last 60 Days</option>
						</select>
					</div>
					<nav
						className='flex items-center justify-center pt-4'
						aria-label='Table navigation'
					>
						<button
							disabled={currentPage === 1}
							onClick={() => handlePageChange(currentPage - 1)}
							className='block px-3 py-2 mx-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						>
							Previous Page
						</button>
						<button
							disabled={currentPage === totalPages}
							onClick={() => handlePageChange(currentPage + 1)}
							className='block px-3 py-2 mx-4 leading-tight text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
						>
							Next Page
						</button>
					</nav>
				</caption>
				<thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
					<tr>
						<th className='px-6 py-3'>Employee Name</th>
						<th className='px-6 py-3'>Project Name</th>
						<th className='px-6 py-3'>Description</th>
						<th className='px-6 py-3'>Date</th>
						<th className='px-6 py-3'>Duration</th>
					</tr>
				</thead>
				<tbody>
					{currentEntries.map((timeEntry) => (
						<tr
							key={timeEntry.id}
							className='bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600'
						>
							<td className='px-6 py-4'>
								{data.find((entry) => entry.userId === timeEntry.userId)?.name}
							</td>
							<td className='px-6 py-4 truncate text-ellipsis overflow-hidden line-clamp-1'>
								{timeEntry.projectName}
							</td>
							<td className='px-6 py-4'>{timeEntry.description}</td>
							<td className='px-6 py-4'>
								{formatDate(timeEntry.timeInterval.start)}
							</td>
							<td className='px-6 py-4'>
								{formatDuration(timeEntry.timeInterval.duration)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	)
}

export default Table
