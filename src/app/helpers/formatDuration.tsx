export function formatDuration(
	durationString: string | null | undefined
): string {
	if (!durationString) {
		return ''
	}

	const hoursIndex: number = durationString.indexOf('H')
	const minutesIndex: number = durationString.indexOf('M')

	let hours: number = 0
	let minutes: number = 0

	if (hoursIndex !== -1) {
		hours = parseInt(durationString.slice(2, hoursIndex))
	}

	if (minutesIndex !== -1) {
		if (hoursIndex !== -1) {
			minutes = parseInt(durationString.slice(hoursIndex + 1, minutesIndex))
		} else {
			minutes = parseInt(durationString.slice(2, minutesIndex))
		}
	}

	const totalHours: number = hours + minutes / 60

	return `${totalHours.toFixed(2)} hours`
}
