import type { Metadata } from "next";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AsanaTimeAnalysis } from "./asana-time-analysis";
import { AsanaTimeChart } from "./asana-time-chart";
import { CodeComparison } from "./code-comparison";
import { ContributionAnalysis } from "./contribution-analysis";
import { ContributionsYearsChart } from "./contributions-years-chart";
import { FeaturesComparison } from "./features-comparison";
import { ProjectComparison } from "./project-comparison";

export default function ConcurrencePage() {
	return (
		<div className="absolute inset-0 flex h-screen w-screen overflow-hidden bg-background">
			{/* Contenu principal */}
			<div className="flex-1 overflow-auto">
				<div className="container mx-auto max-w-6xl px-6 py-8">
					{/* Header amélioré */}
					<div className="mb-12 text-center">
						{/* Titre principal */}
						<h1 className="mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text font-bold text-4xl text-transparent md:text-5xl lg:text-6xl">
							Mariol vs Nova
						</h1>

						{/* Sous-titre */}
						<p className="mb-8 text-muted-foreground text-xl md:text-2xl">
							Arguments chiffrés et analyse détaillée de l'investissement professionnel
						</p>
					</div>

					{/* Sections */}
					<div className="space-y-12">
						{/* 1. Rappel des cibles */}
						<section className="rounded-lg border bg-card p-6" id="cibles">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">1. Rappel des cibles des projets</h2>
							<ProjectComparison />
						</section>

						{/* 2. Comparatif des fonctionnalités */}
						<section className="rounded-lg border bg-card p-6" id="fonctionnalites">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">2. Comparatif des fonctionnalités</h2>
							<FeaturesComparison />
						</section>

						{/* 3. Comparaison de code */}
						<section className="rounded-lg border bg-card p-6" id="code">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">3. Analyse de similarité de code</h2>
							<CodeComparison />
						</section>

						{/* 4. Temps Asana */}
						<section className="rounded-lg border bg-card p-6" id="temps">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">4. Analyse du temps de travail (Asana)</h2>
							<p className="mb-4 text-muted-foreground text-sm">
								Le mois d'octobre peut être exclu, car il présente des données anormales sur les deux années.
							</p>
							<Tabs defaultValue="total">
								<TabsList>
									<TabsTrigger value="total">Tous les mois</TabsTrigger>
									<TabsTrigger value="exclusion">Exclusion du mois d'octobre</TabsTrigger>
								</TabsList>
								<TabsContent value="total">
									<AsanaTimeAnalysis />
									<div className="mt-8">
										<AsanaTimeChart />
									</div>
								</TabsContent>
								<TabsContent value="exclusion">
									<AsanaTimeAnalysis excludedMonths={["octobre"]} />
									<div className="mt-8">
										<AsanaTimeChart excludedMonths={["octobre"]} />
									</div>
								</TabsContent>
							</Tabs>
						</section>

						{/* 5. Contributions détaillées */}
						<section className="rounded-lg border bg-card p-6" id="contributions">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">5. Analyse des contributions GitLab</h2>
							<ContributionAnalysis />
							<div className="mt-8">
								<ContributionsYearsChart />
							</div>
						</section>

						<section className="space-y-4 rounded-lg border bg-card p-6">
							<p className="text-muted-foreground text-sm">
								Les données utilisées pour ce document ont été récupérées via les API d'Asana et de GitLab à l'aide de tokens temporaires
								associés à mon compte professionnel au sein de l'agence. Ces accès deviendront invalides dès la suppression de mes comptes. Les
								données ont été appelées et affichées uniquement lors de la génération de cette page ; elles ne sont ni stockées ni conservées,
								et restent figées à la date de génération.
							</p>
							<p className="text-muted-foreground text-sm">
								Le code de ce document est disponible sur{" "}
								<Link
									className="underline underline-offset-2 hover:text-primary"
									href="https://github.com/timothylp/portfolio/tree/master/app/concurrence-mariol-nova"
									rel="noopener noreferrer"
									target="_blank"
								>
									GitHub
								</Link>
								.
							</p>
						</section>

						{/* 6. Conclusion */}
						{/* <section className="rounded-lg border bg-card p-6">
							<h2 className="mb-6 font-semibold text-2xl text-foreground">6. Conclusion et propositions</h2>
							<Conclusion />
						</section> */}
					</div>
				</div>
			</div>

			{/* Sommaire sticky */}
			<div className="hidden w-64 flex-shrink-0 border-l bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:block">
				<div className="sticky top-0 p-6">
					<h3 className="mb-4 font-semibold text-foreground text-lg">Sommaire</h3>
					<nav className="space-y-2">
						<Link className="block py-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground" href="#cibles">
							1. Rappel des cibles des projets
						</Link>
						<Link className="block py-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground" href="#fonctionnalites">
							2. Comparatif des fonctionnalités
						</Link>
						<Link className="block py-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground" href="#code">
							3. Analyse de similarité de code
						</Link>
						<Link className="block py-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground" href="#contributions">
							4. Analyse des contributions GitLab
						</Link>
						<Link className="block py-1 text-muted-foreground text-sm transition-colors duration-200 hover:text-foreground" href="#temps">
							5. Analyse du temps de travail (Asana)
						</Link>
					</nav>
				</div>
			</div>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Analyse Comparative - Mariol vs Nova",
	description: "Arguments chiffrés et analyse détaillée de l'investissement professionnel",
	robots: {
		index: false,
		follow: false,
	},
};
