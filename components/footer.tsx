import Link from "next/link";

export function Footer() {
	return (
		<footer className="border-t pt-6 text-sm">
			<div className="space-y-6">
				<div className="space-y-2">
					<Link className="block w-max underline-offset-2 hover:underline" href="/privacy">
						Politique de confidentialité
					</Link>
					<Link className="block w-max underline-offset-2 hover:underline" href="/legal">
						Mentions légales
					</Link>
				</div>
				<p className="text-muted-foreground ">© {new Date().getFullYear()} Timothy Le Pallec. Tous droits réservés.</p>
			</div>
		</footer>
	);
}
