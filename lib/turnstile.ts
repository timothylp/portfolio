const TURNSTILE_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

export async function verifyTurnstile(token: string, remoteip?: string | null) {
	const response = await fetch(TURNSTILE_URL, {
		method: "POST",
		body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token, remoteip }),
		headers: {
			"Content-Type": "application/json",
		},
	});

	const data = await response.json();

	return data.success;
}
