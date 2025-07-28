import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PrivacyContent from "@/content/privacy.mdx";

export const metadata: Metadata = {
	title: "Politique de confidentialité",
	description: "Politique de confidentialité et traitement des données personnelles",
};

export default function PrivacyPage() {
	return (
		<div className="space-y-8">
			<Button asChild size="sm" variant="outline">
				<Link href="/" prefetch>
					← Retour à l'accueil
				</Link>
			</Button>
			<div className="space-y-6 text-sm">
				<PrivacyContent />
			</div>
		</div>
	);
}
