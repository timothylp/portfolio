export async function verifyCap(token: string) {
	if (!(process.env.NEXT_PUBLIC_CAP_API_ENDPOINT && process.env.CAP_SECRET_KEY)) {
		return true;
	}

	const response = await fetch(`${process.env.NEXT_PUBLIC_CAP_API_ENDPOINT}/siteverify`, {
		method: "POST",
		body: JSON.stringify({ secret: process.env.CAP_SECRET_KEY, response: token }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	return data.success;
}
