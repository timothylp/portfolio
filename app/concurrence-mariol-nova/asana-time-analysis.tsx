import { queryAsanaTimeEntries } from "./asana";

export async function AsanaTimeAnalysis({ excludedMonths = [] }: { excludedMonths?: string[] } = {}) {
	const asanaTimeEntries = await queryAsanaTimeEntries();

	// Fonction pour calculer les totaux par mois pour une période donnée
	function calculateMonthlyTotals(entries: typeof asanaTimeEntries, startDate: string, endDate: string, excludedMonthsList: string[] = []) {
		const monthlyData: { [key: string]: number } = {};

		for (const entry of entries) {
			const entryDate = new Date(entry.date);
			const start = new Date(startDate);
			const end = new Date(endDate);

			if (entryDate >= start && entryDate <= end) {
				const monthKey = entryDate.toLocaleDateString("fr-FR", { month: "long" });

				// Exclure les mois spécifiés
				if (!excludedMonthsList.includes(monthKey)) {
					monthlyData[monthKey] = (monthlyData[monthKey] || 0) + entry.duration;
				}
			}
		}

		return monthlyData;
	}

	// Calculer les données pour les deux années
	const previousData = calculateMonthlyTotals(asanaTimeEntries, "2023-09-01", "2024-08-31", excludedMonths);
	const currentData = calculateMonthlyTotals(asanaTimeEntries, "2024-09-01", "2025-08-15", excludedMonths);

	// Calculer les statistiques
	const totalPreviousHours = Math.round(Object.values(previousData).reduce((sum, minutes) => sum + minutes, 0) / 60);
	const totalCurrentHours = Math.round(Object.values(currentData).reduce((sum, minutes) => sum + minutes, 0) / 60);
	const percentageChange = totalPreviousHours > 0 ? Math.round(((totalCurrentHours - totalPreviousHours) / totalPreviousHours) * 100) : 0;

	// Calculer la moyenne mensuelle
	const averagePerMonth = Math.round(totalCurrentHours / 12);
	const averagePrevious = Math.round(totalPreviousHours / 12);

	return (
		<div className="space-y-6">
			{/* Résumé des heures de travail réelles */}
			<div className="grid gap-4 md:grid-cols-2">
				<div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
					<div className="font-bold text-2xl text-blue-600">{totalCurrentHours}h</div>
					<div className="text-blue-700 text-sm">Heures totales</div>
					<div className="mt-1 text-blue-600 text-xs">
						{percentageChange >= 0 ? "+" : ""}
						{percentageChange}% vs année précédente
					</div>
				</div>
				<div className="rounded-lg border border-green-200 bg-green-50 p-4">
					<div className="font-bold text-2xl text-green-600">{averagePerMonth}h</div>
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
								<span className="text-gray-600 text-sm">Total heures</span>
								<span className="font-medium text-sm">{totalPreviousHours}h</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Moyenne mensuelle</span>
								<span className="font-medium text-sm">{averagePrevious}h</span>
							</div>
						</div>
					</div>
					<div>
						<h4 className="mb-3 font-medium text-gray-900">Année en cours (2024-2025)</h4>
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Total heures</span>
								<span className="font-medium text-sm">{totalCurrentHours}h</span>
							</div>
							<div className="flex items-center justify-between">
								<span className="text-gray-600 text-sm">Moyenne mensuelle</span>
								<span className="font-medium text-sm">{averagePerMonth}h</span>
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
							<div className="font-bold text-2xl text-amber-600">-18%</div>
							<div className="text-amber-700 text-sm">Temps de travail</div>
							<div className="mt-1 text-amber-600 text-xs">39h → 32h/semaine</div>
						</div>
					</div>
					<div className="rounded-lg border bg-white p-4">
						<div className="text-center">
							<div className="font-bold text-2xl text-green-600">{Math.round((totalCurrentHours / totalPreviousHours) * 100)}%</div>
							<div className="text-green-700 text-sm">Heures réalisées</div>
							<div className="mt-1 text-green-600 text-xs">vs année précédente</div>
						</div>
					</div>
				</div>
				<div className="mt-4 rounded-lg bg-amber-100 p-4">
					<p className="text-amber-800 text-sm">
						<strong>Analyse :</strong> Malgré une réduction de 18% du temps de travail (39h → 32h/semaine),
						{totalCurrentHours > totalPreviousHours ? " les heures de travail ont augmenté" : " les heures de travail ont diminué"}
						de {Math.abs(percentageChange)}% par rapport à l'année précédente.
					</p>
				</div>
			</div>
		</div>
	);
}
