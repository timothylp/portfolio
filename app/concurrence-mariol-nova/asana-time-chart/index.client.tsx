"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

type TimeTrackingEntry = {
	duration: number;
	date: string;
};

// Fonction pour calculer les totaux par mois pour une période donnée
function calculateMonthlyTotals(asanaTimeEntries: TimeTrackingEntry[], startDate: string, endDate: string, excludedMonths: string[] = []) {
	const monthlyData: { [key: string]: number } = {};

	for (const entry of asanaTimeEntries) {
		const entryDate = new Date(entry.date);
		const start = new Date(startDate);
		const end = new Date(endDate);

		if (entryDate >= start && entryDate <= end) {
			const monthKey = entryDate.toLocaleDateString("fr-FR", { month: "long" });

			// Exclure les mois spécifiés
			if (!excludedMonths.includes(monthKey)) {
				monthlyData[monthKey] = (monthlyData[monthKey] || 0) + entry.duration;
			}
		}
	}

	return monthlyData;
}

const chartConfig = {
	previous: {
		label: "2023-2024",
		color: "var(--chart-1)",
	},
	current: {
		label: "2024-2025",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function AsanaTimeChartClient({ asanaTimeEntries, excludedMonths = [] }: { asanaTimeEntries: TimeTrackingEntry[]; excludedMonths?: string[] }) {
	const previousData = calculateMonthlyTotals(asanaTimeEntries, "2023-09-01", "2024-08-31", excludedMonths);
	const currentData = calculateMonthlyTotals(asanaTimeEntries, "2024-09-01", "2025-08-15", excludedMonths);

	const months = ["septembre", "octobre", "novembre", "décembre", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août"];

	const chartData = months.map((month) => ({
		month,
		previous: Math.round((previousData[month] || 0) / 60),
		current: Math.round((currentData[month] || 0) / 60),
	}));

	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={chartData}>
				<CartesianGrid vertical={false} />
				<XAxis axisLine={false} dataKey="month" tickFormatter={(value) => value.slice(0, 3)} tickLine={false} tickMargin={10} />
				<ChartTooltip content={<ChartTooltipContent indicator="line" />} cursor={false} />
				<Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
				<Bar dataKey="current" fill="var(--color-current)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
