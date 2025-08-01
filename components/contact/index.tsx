import { ContactClient } from "./index.client";

export function Contact() {
	return (
		<section className="space-y-4">
			<h2 className="font-mono font-semibold text-xl">Contact</h2>
			<ContactClient className="w-full" isProduction={process.env.NODE_ENV === "production"} />
		</section>
	);
}
