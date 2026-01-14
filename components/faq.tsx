import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQItem = {
	question: string;
	answer: string;
};

const faqItems: FAQItem[] = [
	{
		question: "Pourquoi avoir créé Mariol ?",
		answer: "Après des années en tant que Lead Developer, j'ai constaté que les solutions de création de sites actuelles forçaient souvent à choisir entre simplicité et performance. J'ai créé Mariol pour prouver qu'on peut offrir un outil accessible aux non-techniques sans sacrifier la qualité du code et la vitesse d'affichage.",
	},
	{
		question: "Quelle est ton expertise technique principale ?",
		answer: "Je me spécialise dans l'écosystème Next.js et les architectures Headless (notamment avec PayloadCMS). Mon approche est de bâtir des produits scalables, sécurisés et centrés sur l'expérience utilisateur (UX).",
	},
	{
		question: "Es-tu disponible pour de nouveaux projets ou conseils ?",
		answer: "Aujourd'hui, mon focus principal est le développement et la croissance de Mariol. Cependant, je reste ouvert aux échanges avec d'autres entrepreneurs et passionnés de tech pour partager mon expertise sur les architectures web modernes.",
	},
	{
		question: "Pourquoi utiliser PayloadCMS pour tes projets ?",
		answer: "C'est pour moi le CMS le plus puissant du marché pour un développeur. Il offre une flexibilité totale, un typage TypeScript natif et une interface d'administration que je peux personnaliser à 100% pour répondre aux besoins spécifiques du produit.",
	},
];

function generateFAQRichSnippet(items: FAQItem[]) {
	const faqSnippet = {
		"@context": "https://schema.org",
		"@type": "FAQPage",
		mainEntity: items.map((item) => ({
			"@type": "Question",
			name: item.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: item.answer,
			},
		})),
	};

	return JSON.stringify(faqSnippet);
}

export function FAQ() {
	return (
		<div>
			<h2 className="font-mono font-semibold text-xl">Questions fréquentes</h2>
			<Accordion collapsible defaultValue="item-0" type="single">
				{faqItems.map((item, index) => (
					<AccordionItem key={index} value={`item-${index}`}>
						<AccordionTrigger>{item.question}</AccordionTrigger>
						<AccordionContent>{item.answer}</AccordionContent>
					</AccordionItem>
				))}
			</Accordion>
			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: Ce n'est utilisé que côté serveur */}
			<script dangerouslySetInnerHTML={{ __html: generateFAQRichSnippet(faqItems) }} type="application/ld+json" />
		</div>
	);
}
