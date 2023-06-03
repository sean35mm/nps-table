import { getData } from '@/lib/getData'
import Table from './components/Table'

export default async function Home() {
	const data = await getData()

	return (
		<div className='flex flex-col justify-center items-center p-4 bg-black h-full'>
			<h1 className='text-2xl text-white my-4'>
				Welcome to Sean Gil&apos;s Table Demo
			</h1>
			<a
				href='https://github.com/sean35mm/nps-table'
				className='underline text-white text-md hover:text-blue-500 my-4'
				target='_blank'
				rel='noopener'
			>
				Click Here for Source Code and Documentation
			</a>
			<Table data={data} />
		</div>
	)
}
