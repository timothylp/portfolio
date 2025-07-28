import Script from "next/script";

export function Turnstile() {
	return (
		<>
			<Script async defer src="https://challenges.cloudflare.com/turnstile/v0/api.js" />
			<div
				className="cf-turnstile"
				data-appearance="interaction-only"
				data-language="fr"
				data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
				data-size="flexible"
			/>
		</>
	);
}
