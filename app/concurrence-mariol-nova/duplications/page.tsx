import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import crossProjectDuplicates from "../cross-project-duplicates.json" with { type: "json" };

export default function DuplicationsCompletesPage() {
	const duplications = crossProjectDuplicates;

	return (
		<div className="absolute inset-0 flex h-screen w-screen overflow-auto bg-background">
			<div className="container mx-auto px-4 py-8">
				{/* Header */}
				<div className="mb-8">
					<div className="mb-4 flex items-center justify-between">
						<div>
							<h1 className="font-bold text-3xl text-gray-900">Rapport Complet des Duplications</h1>
							<p className="mt-2 text-gray-600">Analyse détaillée de toutes les duplications de code entre les projets Mariol et Nova</p>
						</div>
						<Link className={buttonVariants({ variant: "outline" })} href="/concurrence-mariol-nova">
							← Retour à l'analyse
						</Link>
					</div>

					{/* Statistiques */}
					<div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-4">
						<div className="rounded-lg border bg-white p-4">
							<div className="font-bold text-2xl text-green-600">{duplications.summary.crossProjectDuplicates}</div>
							<div className="text-gray-600 text-sm">Total des duplications entre projets</div>
						</div>
						<div className="rounded-lg border bg-white p-4">
							<div className="font-bold text-2xl text-purple-600">{new Date(duplications.summary.detectionDate).toLocaleDateString("fr-FR")}</div>
							<div className="text-gray-600 text-sm">Date de détection</div>
						</div>
					</div>
				</div>

				{/* Liste des duplications */}
				<div className="space-y-4">
					{duplications.crossProjectDuplicates.map((dup) => (
						<div className="rounded-lg border border-gray-200 p-4" key={dup.id}>
							<div className="mb-3 flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 font-medium text-blue-800 text-xs">
										{dup.format.toUpperCase()}
									</span>
									<span className="text-gray-500 text-sm">{dup.lines} lignes</span>
								</div>
								<span className="text-gray-400 text-xs">Duplication #{dup.id}</span>
							</div>

							<div className="grid grid-cols-1 gap-3 md:grid-cols-2">
								<div className="rounded-md bg-blue-50 p-3">
									<div className="mb-1 flex items-center gap-2">
										<span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 font-medium text-blue-800 text-xs">
											{dup.firstFile.project}
										</span>
									</div>
									<div className="truncate font-medium text-gray-900 text-sm">{dup.firstFile.path}</div>
									<div className="text-gray-500 text-xs">
										Lignes {dup.firstFile.start}-{dup.firstFile.end}
									</div>
								</div>

								<div className="rounded-md bg-red-50 p-3">
									<div className="mb-1 flex items-center gap-2">
										<span className="inline-flex items-center rounded-full bg-red-100 px-2 py-0.5 font-medium text-red-800 text-xs">
											{dup.secondFile.project}
										</span>
									</div>
									<div className="truncate font-medium text-gray-900 text-sm">{dup.secondFile.path}</div>
									<div className="text-gray-500 text-xs">
										Lignes {dup.secondFile.start}-{dup.secondFile.end}
									</div>
								</div>
							</div>

							{/* Code dupliqué */}
							<details className="mt-3">
								<summary className="mb-2 cursor-pointer font-medium text-blue-600 text-sm hover:text-blue-800">
									Afficher le code dupliqué
								</summary>
								<div className="max-h-48 overflow-x-auto overflow-y-auto whitespace-pre-wrap rounded-md border border-gray-200 bg-gray-50 p-3 font-mono text-xs">
									{dup.fragment}
								</div>
							</details>
						</div>
					))}
				</div>

				{/* Footer */}
				<div className="mt-8 text-center text-gray-500 text-sm">
					<p>Rapport généré le {new Date(duplications.summary.detectionDate).toLocaleString("fr-FR")}</p>
				</div>
			</div>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Rapport Complet des Duplications",
	description: "Analyse détaillée de toutes les duplications de code entre les projets Mariol et Nova",
	robots: {
		index: false,
		follow: false,
	},
};
