import { getData } from '@/lib/getData'
import DataTable from './components/DataTable'

export default async function Home() {
	const data = await getData()
	console.log(JSON.stringify(data, null, '\t'))
	return (
		<div>
			<h1 className='text-2xl'>Welcome to Sean Gil&apos;s Table Demo</h1>
			<DataTable data={data} />
		</div>
	)
}
