import { BASE_URL, SOCIALS } from "@/lib/constants";

export function RichSnippets() {
	return (
		<>
			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: Ce n'est utilisé que côté serveur */}
			<script dangerouslySetInnerHTML={{ __html: generatePersonRichSnippet() }} type="application/ld+json" />
			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: Ce n'est utilisé que côté serveur */}
			<script dangerouslySetInnerHTML={{ __html: generateWebSiteRichSnippet() }} type="application/ld+json" />
		</>
	);
}

function generatePersonRichSnippet() {
	const richSnippet = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Timothy Le Pallec",
		url: BASE_URL,
		sameAs: [SOCIALS.github.href, SOCIALS.x.href],
		jobTitle: "Fondateur de Mariol | Expert Next.js & PayloadCMS",
		description:
			"Expert en architectures Next.js et PayloadCMS. Fondateur de Mariol, je conçois des solutions web haute performance alliant simplicité d'usage et excellence technique.",
		worksFor: {
			"@type": "Organization",
			name: "Mariol",
			url: "https://mariol.co",
		},
		knowsAbout: ["Next.js", "PayloadCMS", "Fullstack Development", "SaaS"],
	};

	return JSON.stringify(richSnippet);
}

function generateWebSiteRichSnippet() {
	const richSnippet = {
		"@context": "https://schema.org",
		"@type": "WebSite",
		name: "Timothy Le Pallec",
		url: BASE_URL,
		description:
			"Expert en architectures Next.js et PayloadCMS. Fondateur de Mariol, je conçois des solutions web haute performance alliant simplicité d'usage et excellence technique.",
		author: {
			"@type": "Person",
			name: "Timothy Le Pallec",
		},
		inLanguage: "fr-FR",
	};

	return JSON.stringify(richSnippet);
}
