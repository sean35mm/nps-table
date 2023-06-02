export async function getUsersData() {
	const apiKey = process.env.CLOCKIFY_API_KEY

	if (!apiKey) {
		throw new Error('CLOCKIFY_API_KEY is not defined')
	}
	const res = await fetch(
		'https://api.clockify.me/api/v1/workspaces/5e0f43385f73426d90ce80bf/users/',
		{
			headers: {
				'X-Api-Key': apiKey,
			},
		}
	)

	if (!res.ok) {
		throw new Error(res.statusText)
	}

	return res.json()
}
