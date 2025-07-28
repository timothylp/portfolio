import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import LegalContent from "@/content/legal.mdx";

export const metadata: Metadata = {
	title: "Mentions légales",
	description: "Mentions légales du site",
};

export default function LegalPage() {
	return (
		<div className="space-y-8">
			<Button asChild size="sm" variant="outline">
				<Link href="/" prefetch>
					← Retour à l'accueil
				</Link>
			</Button>
			<div className="space-y-6 text-sm">
				<LegalContent />
			</div>
		</div>
	);
}
