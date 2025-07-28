import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
	return (
		<section className="space-y-4">
			<h1 className="font-mono font-semibold text-2xl">404 - Page Non Trouvée</h1>
			<p>La page que vous recherchez n'existe pas.</p>
			<Button asChild variant="outline">
				<Link href="/">Retour à l'accueil</Link>
			</Button>
		</section>
	);
}
