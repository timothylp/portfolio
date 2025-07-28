import { SOCIALS } from "@/lib/constants";

export function RichSnippets() {
	return (
		<>
			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: Ce n'est utilisé que côté serveur */}
			<script dangerouslySetInnerHTML={{ __html: generatePersonRichSnippet() }} type="application/ld+json" />
		</>
	);
}

function generatePersonRichSnippet() {
	const richSnippet = {
		"@context": "https://schema.org",
		"@type": "Person",
		name: "Timothy Le Pallec",
		url: "https://timothylepallec.com",
		sameAs: [SOCIALS.github.href, SOCIALS.x.href],
		jobTitle: "Développeur Web Fullstack",
		worksFor: {
			"@type": "Organization",
			name: "Mariol",
		},
	};

	return JSON.stringify(richSnippet);
}
