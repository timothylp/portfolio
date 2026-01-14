import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

const projects = [
	{
		image: "/projects/mariol.png",
		title: "Mariol",
		description: "Une plateforme cloud qui permet à des utilisateurs non techniques de créer facilement des sites internet de qualité.",
		details: "Co-fondateur et CTO de Mariol • Next.js, PayloadCMS, TypeScript • Architecture cloud scalable",
		link: "https://mariol.co",
		imageAlt: "Logo de Mariol, plateforme cloud de création de sites internet",
	},
	{
		image: "/projects/maison-notre.png",
		title: "Maison Nôtre",
		description: "Studio créatif spécialisé en identité visuelle et direction artistique, au service des marques élégantes et ambitieuses.",
		details: "Développement Fullstack • Next.js, Headless CMS • Performance et design sur mesure",
		link: "https://maison-notre.com",
		imageAlt: "Logo de Maison Nôtre, studio créatif spécialisé en identité visuelle",
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
							<Image alt={project.imageAlt} className="rounded-full" height={48} src={project.image} width={48} />
							<div className="flex-1">
								<h3 className="font-mono font-semibold">{project.title}</h3>
								<p className="text-muted-foreground">{project.description}</p>
								<p className="mt-1 text-muted-foreground text-xs">{project.details}</p>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</section>
	);
}
