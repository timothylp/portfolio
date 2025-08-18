"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import type { ContributionsByMonth } from "../gitlab";

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

export function ContributionsYearsChartClient({ contributionsByMonth }: { contributionsByMonth: ContributionsByMonth[] }) {
	return (
		<ChartContainer config={chartConfig}>
			<BarChart accessibilityLayer data={contributionsByMonth}>
				<CartesianGrid vertical={false} />
				<XAxis axisLine={false} dataKey="month" tickFormatter={(value) => value.slice(0, 3)} tickLine={false} tickMargin={10} />
				<ChartTooltip content={<ChartTooltipContent indicator="dashed" />} cursor={false} />
				<Bar dataKey="previous" fill="var(--color-previous)" radius={4} />
				<Bar dataKey="current" fill="var(--color-current)" radius={4} />
			</BarChart>
		</ChartContainer>
	);
}
