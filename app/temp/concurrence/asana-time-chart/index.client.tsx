"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TimeTrackingEntry = {
	duration: number;
	date: string;
};

// Fonction pour calculer les totaux par mois pour une période donnée
function calculateMonthlyTotals(asanaTimeEntries: TimeTrackingEntry[], startDate: string, endDate: string) {
	const monthlyData: { [key: string]: number } = {};

	for (const entry of asanaTimeEntries) {
		const entryDate = new Date(entry.date);
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (entryDate >= start && entryDate <= end) {
			const monthKey = entryDate.toLocaleDateString("fr-FR", { month: "long" });
			monthlyData[monthKey] = (monthlyData[monthKey] || 0) + entry.duration;
		}
	}

	return monthlyData;
}

const chartConfig = {
	previous: {
		label: "2023-2024 (heures)",
		color: "var(--chart-1)",
	},
	current: {
		label: "2024-2025 (heures)",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function AsanaTimeChartClient({ asanaTimeEntries }: { asanaTimeEntries: TimeTrackingEntry[] }) {
	// Calculer les données pour les deux périodes
	const period1Data = calculateMonthlyTotals(asanaTimeEntries, "2023-09-01", "2024-08-31");
	const period2Data = calculateMonthlyTotals(asanaTimeEntries, "2024-09-01", "2025-08-15");
	// Créer les données du graphique
	const months = ["septembre", "octobre", "novembre", "décembre", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août"];

	const chartData = months.map((month) => ({
		month,
		previous: Math.round((period1Data[month] || 0) / 60), // Convertir en heures
		current: Math.round((period2Data[month] || 0) / 60), // Convertir en heures
	}));

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis axisLine={false} dataKey="month" tickFormatter={(value) => value.slice(0, 3)} tickLine={false} tickMargin={10} />
				<ChartTooltip content={<ChartTooltipContent indicator="dashed" />} cursor={false} />
				<Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
				<Bar dataKey="current" fill="var(--color-current)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
