const ASANA_URL = "https://app.asana.com/api/1.0";

export async function fetchAsana(endpoint: string, options: RequestInit = {}) {
	const token = process.env.ASANA_TOKEN;

	if (!token) {
		throw new Error("ASANA_TOKEN environment variable is required");
	}

	const url = `${ASANA_URL}${endpoint}`;

	const config: RequestInit = {
		...options,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
			...options.headers,
		},
	};

	const response = await fetch(url, config);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(`Asana API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}
