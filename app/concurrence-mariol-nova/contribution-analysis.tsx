import { queryUserContributionsByMonth } from "./gitlab";

export async function ContributionAnalysis() {
	const contributionsByMonth = await queryUserContributionsByMonth();

	// Calculer les statistiques réelles
	const totalPrevious = contributionsByMonth.reduce((sum, month) => sum + month.previous, 0);
	const totalCurrent = contributionsByMonth.reduce((sum, month) => sum + month.current, 0);
	const percentageChange = totalPrevious > 0 ? Math.round(((totalCurrent - totalPrevious) / totalPrevious) * 100) : 0;

	// Trouver les mois les plus actifs
	const currentYearData = contributionsByMonth.map((month, index) => ({ month: month.month, contributions: month.current, index }));
	const sortedByActivity = [...currentYearData].sort((a, b) => b.contributions - a.contributions);
	const mostActiveMonth = sortedByActivity[0];

	// Calculer la moyenne mensuelle
	const averagePerMonth = Math.round(totalCurrent / 12);
	const averagePrevious = Math.round(totalPrevious / 12);

	// Calculer l'efficacité (contributions par heure de travail)
	// Réduction de 39h à 32h = -18% de temps de travail
	const timeReduction = 18; // 18% de temps en moins
	const efficiencyGain = Math.round(((totalCurrent / (1 - timeReduction / 100) - totalPrevious) / totalPrevious) * 100);

	return (
		<div className="space-y-6">
			{/* Résumé des contributions réelles */}
			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="font-bold text-2xl text-blue-600">{totalCurrent}</div>
					<div className="text-blue-700 text-sm">Contributions totales</div>
					<div className="mt-1 text-blue-600 text-xs">
						{percentageChange >= 0 ? "+" : ""}
						{percentageChange}% vs année précédente
					</div>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="font-bold text-2xl text-green-600">{averagePerMonth}</div>
					<div className="text-green-700 text-sm">Moyenne mensuelle</div>
					<div className="mt-1 text-green-600 text-xs">Cette année</div>
				</div>
			</div>

			{/* Analyse comparative par année */}
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-lg">Comparaison année précédente vs année en cours</h3>
				<div className="grid gap-6 md:grid-cols-2">
					<div>
						<h4 className="mb-3 font-medium text-gray-900">Année précédente (2023-2024)</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Total contributions</span>
								<span className="font-medium text-sm">{totalPrevious}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Moyenne mensuelle</span>
								<span className="font-medium text-sm">{averagePrevious}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Mois le plus actif</span>
								<span className="font-medium text-sm">
									{contributionsByMonth.reduce((max, month) => (month.previous > max.previous ? month : max)).month}
								</span>
							</div>
						</div>
					</div>
					<div>
						<h4 className="mb-3 font-medium text-gray-900">Année en cours (2024-2025)</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Total contributions</span>
								<span className="font-medium text-sm">{totalCurrent}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Moyenne mensuelle</span>
								<span className="font-medium text-sm">{averagePerMonth}</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Mois le plus actif</span>
								<span className="font-medium text-sm">{mostActiveMonth.month}</span>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Analyse de la réduction du temps de travail */}
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-6">
				<h3 className="mb-4 font-semibold text-amber-800 text-lg">Impact de la réduction du temps de travail (39h → 32h)</h3>
				<div className="grid gap-4 md:grid-cols-2">
					<div className="rounded-lg border bg-white p-4">
						<div className="text-center">
							<div className="font-bold text-2xl text-amber-600">-{timeReduction}%</div>
							<div className="text-amber-700 text-sm">Temps de travail</div>
							<div className="mt-1 text-amber-600 text-xs">39h → 32h/semaine</div>
						</div>
					</div>
					<div className="rounded-lg border bg-white p-4">
						<div className="text-center">
							<div className="font-bold text-2xl text-green-600">+{efficiencyGain}%</div>
							<div className="text-green-700 text-sm">Gain d'efficacité</div>
							<div className="mt-1 text-green-600 text-xs">Contributions/horaire</div>
						</div>
					</div>
				</div>
				<div className="mt-4 rounded-lg bg-amber-100 p-4">
					<p className="text-amber-800 text-sm">
						<strong>Analyse :</strong> Malgré une réduction de {timeReduction}% du temps de travail (39h → 32h/semaine), les contributions sont
						équivalentes. L'efficacité horaire a {efficiencyGain >= 0 ? "progressé" : "régressé"} de {Math.abs(efficiencyGain)}%
					</p>
				</div>
			</div>
		</div>
	);
}
