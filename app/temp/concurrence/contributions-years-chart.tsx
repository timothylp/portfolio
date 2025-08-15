"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
	{
		month: "Septembre",
		previous: 124,
		current: 233,
	},
	{
		month: "Octobre",
		previous: 208,
		current: 199,
	},
	{
		month: "Novembre",
		previous: 148,
		current: 260,
	},
	{
		month: "Décembre",
		previous: 209,
		current: 183,
	},
	{
		month: "Janvier",
		previous: 215,
		current: 130,
	},
	{
		month: "Février",
		previous: 190,
		current: 169,
	},
	{
		month: "Mars",
		previous: 212,
		current: 210,
	},
	{
		month: "Avril",
		previous: 132,
		current: 133,
	},
	{
		month: "Mai",
		previous: 151,
		current: 128,
	},
	{
		month: "Juin",
		previous: 132,
		current: 153,
	},
	{
		month: "Juillet",
		previous: 178,
		current: 154,
	},
	{
		month: "Août",
		previous: 191,
		current: 144,
	},
];

const chartConfig = {
	previous: {
		label: "Année précédente",
		color: "var(--chart-1)",
	},
	current: {
		label: "Année en cours",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function ContributionsYearsChart() {
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
