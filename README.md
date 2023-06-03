<h1 align="center">Welcome to my Clockify Table Widget</h1>

> **NOTE:** The data pulled from the API provided is pretty outdated so there is only 1 result for dates ranging the past 2 weeks; therefore, I added filter date selector where you will be able to filter through data for the past 2 weeks, 30 days, and 60 days.

### ✨ [Click Here for Demo](https://nps-table.vercel.app)

### Tech Stack

- **Next 13.4**
  - new app directory paradigm
  - backend functionality built in out of the box
- **React 18**
  - new server component paradigm (natural fetching)
- **TypeScript**

## Description

This is a comprehensive and filterable data table indtended to be used in conjunction with the Clockify API. Use selectors to filter either by employee name, date, or both! The returned data is paginated to show 10 results per page.

_Want to run this locally?_

> See instructions below on how to set your API environnment variable and follow the instructions to spin the application up locally.

_How is the data being fetched?_

> I am hitting 4 different endpoints that obtain the data that I need, then transforming the data into the JSON array that I need to pass into the table.

_Benefits of using new React server components?_

> Fetch data within the component and directly access databases, sensitive API's
> Example:

```javascript
export async function getProjectsData() {
	const apiKey = process.env.CLOCKIFY_API_KEY

	if (!apiKey) {
		throw new Error('API key is not defined')
	}
	const res = await fetch(
		`https://api.clockify.me/api/v1/workspaces/XXX/projects/`,
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
```

## Run Locally:

### Install

```sh
npm install
```

This data table is specifically intended to be used in conjunction with the Clockify API. Create your own .env and add your Clockify API:

```sh
CLOCKIFY_API_KEY='your-api-key-here'
```

### Usage

```sh
npm run dev
```

### Author

👤 **Sean Gil**

- Website: seangil.com
- Github: [@sean35mm](https://github.com/sean35mm)

### Show your support

Give a ⭐️ if this project helped you!
