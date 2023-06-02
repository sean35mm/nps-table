import { getProjectsData } from './getProjects'
import { getTimeEntriesData } from './getTimeEntries'
import { getUsersData } from './getUsers'

interface User {
	id: string
	name: string
}

interface Project {
	id: string
	name: string
}

interface TimeEntry {
	projectId: string
	description: string
	timeInterval: {
		duration: string
	}
}

// Use these interfaces in the function
export async function getData() {
	const users: User[] = await getUsersData()
	const allTimeEntries: TimeEntry[][] = await Promise.all(
		users.map((user: User) => getTimeEntriesData(user.id))
	)
	const allProjects: Project[] = await getProjectsData()

	const result = users.map((user: User, index: number) => ({
		userId: user.id,
		name: user.name,
		timeEntries: allTimeEntries[index].map((entry: TimeEntry) => {
			const correspondingProject = allProjects.find(
				(project: Project) => project.id === entry.projectId
			)
			const projectName = correspondingProject
				? correspondingProject.name
				: 'No Associated Project Name'
			return {
				...entry,
				projectName,
			}
		}),
	}))

	return result
}
