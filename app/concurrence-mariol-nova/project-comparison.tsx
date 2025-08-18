export function ProjectComparison() {
	return (
		<div className="space-y-8">
			{/* Tableau unifié de comparaison */}
			<div className="overflow-hidden rounded-lg border bg-card">
				<div className="overflow-x-auto">
					<table className="w-full">
						<thead>
							<tr className="border-b bg-muted/50">
								<th className="px-6 py-4 text-left font-semibold text-foreground">Critère de comparaison</th>
								<th className="px-6 py-4 text-left font-semibold text-[#6b40ce]">Mariol (Plateforme Cloud SaaS)</th>
								<th className="px-6 py-4 text-left font-semibold text-[#ff4d4d]">Nova (Outils internes d'agence)</th>
							</tr>
						</thead>
						<tbody className="divide-y">
							{/* Section : Marché et cible */}
							<tr className="bg-muted/30">
								<td className="px-6 py-3 font-bold text-foreground text-sm uppercase tracking-wide">Marché et cible</td>
								<td className="px-6 py-3" />
								<td className="px-6 py-3" />
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Marché visé</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">B2C / B2B light : indépendants, TPE, créateurs non techniques</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									B2B : entreprises, marques, clients de l'agence avec besoins spécifiques
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Technicité requise</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Nulle (utilisateur final configure son site)</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Élevée (développeurs, designers, intégrateurs)</td>
							</tr>

							{/* Section : Positionnement et offre */}
							<tr className="bg-muted/30">
								<td className="px-6 py-3 font-bold text-foreground text-sm uppercase tracking-wide">Positionnement et offre</td>
								<td className="px-6 py-3" />
								<td className="px-6 py-3" />
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Positionnement</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Solution clé-en-main pour créer et gérer un site en ligne avec des thèmes prêts à l'emploi orientés e-commerce/services
								</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Design system et socle technique pour développer rapidement du sur-mesure
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Nature de l'offre</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Abonnement mensuel, plateforme packagée, hébergement inclus</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Prestation sur-mesure avec facturation projet + maintenance et hébergement inclus éventuellement
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Produits/services</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Thèmes prêts à l'emploi, hébergement, mises à jour et support</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Composants UI, routes Next.js, config Payload, CLI, documentation, modules, connexion à des API tierces, etc.
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Valeur principale</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Rapidité, simplicité, autonomie, coût maîtrisé</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Flexibilité totale, design et fonctionnalités adaptées à chaque client
								</td>
							</tr>

							{/* Section : Personnalisation et flexibilité */}
							<tr className="bg-muted/30">
								<td className="px-6 py-3 font-bold text-foreground text-sm uppercase tracking-wide">Personnalisation et flexibilité</td>
								<td className="px-6 py-3" />
								<td className="px-6 py-3" />
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Degré de personnalisation</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Personnalisation limitée aux options de thèmes (couleurs, sections, style)
								</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Personnalisation totale, sur-mesure possible pour chaque client</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Rapidité de mise en ligne</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Immédiate (site prêt en quelques minutes via thème choisi)</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Dépend du projet sur-mesure, nécessite intervention technique</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Durée du cycle</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Court : mise en ligne immédiate via thèmes prêts</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Long : cadrage, design, dev, mise en production</td>
							</tr>

							{/* Section : Technique et infrastructure */}
							<tr className="bg-muted/30">
								<td className="px-6 py-3 font-bold text-foreground text-sm uppercase tracking-wide">Technique et infrastructure</td>
								<td className="px-6 py-3" />
								<td className="px-6 py-3" />
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Technologies</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Next.js 15, PayloadCMS 3.0, Supabase, Resend, Cloudflare R2, Stripe Connect
								</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Next.js 15, PayloadCMS 3.0, TypeScript, Turborepo, Azure, packages internes
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Hébergement</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Géré et intégré (SaaS, multi-boutiques indépendantes, déploiement auto sur Vercel)
								</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									À la charge de l'agence, selon les besoins du projet (flexibilité totale)
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Scalabilité</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Très forte : chaque nouveau client est une instance automatisée</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Limitée par la capacité de production de l'agence</td>
							</tr>

							{/* Section : Business et relation client */}
							<tr className="bg-muted/30">
								<td className="px-6 py-3 font-bold text-foreground text-sm uppercase tracking-wide">Business et relation client</td>
								<td className="px-6 py-3" />
								<td className="px-6 py-3" />
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Business model</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Abonnement mensuel, revenus récurrents, pas de vente de code source</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">
									Usage interne, pas de modèle SaaS ; outil pour accélérer la production client
								</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Facturation</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">100% récurrente (SaaS), scalable avec le volume</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Facturation unique (projet) ou récurrente en maintenance</td>
							</tr>
							<tr className="transition-colors hover:bg-muted/20">
								<td className="px-6 py-4 font-medium text-foreground">Relation client</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Self-service avec support minimal, centré sur l'outil</td>
								<td className="px-6 py-4 text-muted-foreground text-sm">Accompagnement personnalisé (stratégie, conseil, support technique)</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Conclusion */}
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-6 dark:border-amber-800 dark:bg-amber-950/20">
				<h4 className="mb-3 font-semibold text-amber-800 text-lg dark:text-amber-200">Conclusion de la comparaison</h4>
				<p className="text-amber-700 text-sm leading-relaxed dark:text-amber-300">
					<strong>Mariol</strong> et <strong>Nova</strong> ciblent des marchés et des besoins fondamentalement différents. Mariol est une solution
					SaaS automatisée pour des sites simples, tandis que Nova est un framework de développement pour des projets complexes et personnalisés. Il
					n'y a donc pas de lien direct entre ces deux projets.
				</p>
			</div>
		</div>
	);
}
