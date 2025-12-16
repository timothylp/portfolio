import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

const projects = [
	{
		image: "/projects/mariol.png",
		title: "Mariol",
		description: "Une plateforme cloud qui permet à des utilisateurs non techniques de créer facilement des sites internet de qualité.",
		link: "https://mariol.co",
	},
	{
		image: "/projects/maison-notre.png",
		title: "Maison Nôtre",
		description: "Studio créatif spécialisé en identité visuelle et direction artistique, au service des marques élégantes et ambitieuses.",
		link: "https://maison-notre.com",
	},
];

export function Projects() {
	return (
		<section className="max-sm:space-y-4">
			<h2 className="font-mono font-semibold text-xl">Projets</h2>
			<ul className="max-sm:space-y-4">
				{projects.map((project) => (
					<li key={project.title}>
						<Link
							className="flex items-center gap-4 rounded-lg sm:-mx-4 sm:p-4 sm:hover:bg-accent"
							data-umami-event="open-project"
							data-umami-event-project={project.title}
							href={project.link as Route}
							prefetch
							rel="noopener noreferrer"
							target="_blank"
						>
							<Image alt={project.title} className="rounded-full" height={48} src={project.image} width={48} />
							<div>
								<h3 className="font-mono font-semibold">{project.title}</h3>
								<p className="text-muted-foreground">{project.description}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
