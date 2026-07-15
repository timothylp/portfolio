import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

type FAQItem = {
	question: string;
	answer: string;
};

const faqItems: FAQItem[] = [
	{
		question: "Pourquoi avoir créé Mariol ?",
		answer: "En tant que Lead Dev, j'en ai eu marre de voir les outils de création de sites imposer un choix frustrant : soit c'est simple mais lourd et lent, soit c'est rapide mais complexe à utiliser. J'ai créé Mariol pour prouver qu'on peut avoir de la simplicité sans sacrifier la qualité et la performance.",
	},
	{
		question: "Tu travailles avec quelles technos ?",
		answer: "Je suis spécialisé dans l'écosystème React / Next.js et PayloadCMS. Mon objectif au quotidien, c'est de concevoir des sites qui se chargent instantanément et de créer des outils agréables à utiliser pour les clients.",
	},
	{
		question: "Tu prends des missions en freelance ?",
		answer: "Je suis aujourd'hui focus à 100 % sur Mariol, je ne prends donc plus de contrats en freelance. Par contre, je suis toujours partant pour échanger autour de la tech, du produit ou de l'entrepreneuriat.",
	},
	{
		question: "Pourquoi utiliser PayloadCMS pour tes projets ?",
		answer: "C'est pour moi le meilleur outil backend pour un développeur aujourd'hui. Il n'impose aucune limite sur le code, tout est en TypeScript natif, et l'interface d'administration est tellement personnalisable que mes utilisateurs s'y retrouvent en quelques minutes.",
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
