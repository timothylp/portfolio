import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import crossProjectDuplicates from "./cross-project-duplicates.json" with { type: "json" };

export function CodeComparison() {
	const duplications = crossProjectDuplicates;
	const displayedDuplications = duplications.crossProjectDuplicates.slice(0, 5);

	return (
		<div className="space-y-6">
			{/* Rapport de duplication */}
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-lg">Rapport d'analyse de similarité de code</h3>

				<p className="mb-4 text-muted-foreground text-sm">
					Le rapport de duplication à été généré grâce à l'outil{" "}
					<Link
						className="underline underline-offset-2 hover:text-primary"
						href="https://github.com/kucherenko/jscpd"
						rel="noopener noreferrer"
						target="_blank"
					>
						JSCPD
					</Link>
					.
				</p>
				<div className="space-y-4">
					<div className="flex items-center justify-between rounded-lg border bg-white p-4">
						<div>
							<h4 className="font-medium text-gray-900">Duplications détectées</h4>
							<p className="text-gray-600 text-sm">Analyse comparative des bases de code</p>
						</div>
						<div className="text-right">
							<div className="font-bold text-2xl text-gray-800">{duplications.summary.crossProjectDuplicates}</div>
							<div className="text-gray-500 text-xs">duplications entre projets</div>
						</div>
					</div>

					{/* Section collapsible */}
					<div className="rounded-lg border bg-white">
						<Collapsible>
							<div className="flex items-center justify-between p-4">
								<div>
									<h4 className="font-medium text-gray-900">Détails des duplications</h4>
									<p className="text-gray-600 text-sm">
										Voir les {displayedDuplications.length} premières duplications détectées sur{" "}
										{duplications.crossProjectDuplicates.length}
									</p>
								</div>
								<CollapsibleTrigger asChild>
									<button className="flex items-center gap-2 rounded-md p-2 hover:bg-gray-100" type="button">
										<ChevronsUpDown className="h-4 w-4" />
										<span className="sr-only">Toggle duplications</span>
									</button>
								</CollapsibleTrigger>
							</div>

							<CollapsibleContent className="space-y-4 border-t p-4">
								{displayedDuplications.map((dup) => (
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

								<div className="pt-2 text-center">
									<Link className={buttonVariants({ variant: "outline", size: "sm" })} href="/concurrence-mariol-nova/duplications">
										Voir toutes les duplications ({duplications.summary.crossProjectDuplicates} au total)
									</Link>
								</div>
							</CollapsibleContent>
						</Collapsible>
					</div>
				</div>
			</div>

			{/* Conclusion */}
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
				<h4 className="mb-2 font-medium text-amber-800">Conclusion de l'analyse technique</h4>
				<p className="text-amber-700 text-sm">
					L'analyse met en avant que les similarités de code concernent principalement des librairies de composants utilisées en commun ou du code
					Payload étant proche du à la structure du CMS, et non des parties métier ou des fonctionnalités spécifiques.
				</p>
			</div>
		</div>
	);
}
