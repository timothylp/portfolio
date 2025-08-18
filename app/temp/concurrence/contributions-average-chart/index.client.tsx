"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const chartData = [
	{
		month: "Septembre",
		users: 233,
		average: 112,
	},
	{
		month: "Octobre",
		users: 199,
		average: 105,
	},
	{
		month: "Novembre",
		users: 260,
		average: 66,
	},
	{
		month: "Décembre",
		users: 183,
		average: 88,
	},
	{
		month: "Janvier",
		users: 130,
		average: 65,
	},
	{
		month: "Février",
		users: 169,
		average: 89,
	},
	{
		month: "Mars",
		users: 210,
		average: 57,
	},
	{
		month: "Avril",
		users: 133,
		average: 35,
	},
	{
		month: "Mai",
		users: 128,
		average: 60,
	},
	{
		month: "Juin",
		users: 153,
		average: 84,
	},
	{
		month: "Juillet",
		users: 154,
		average: 70,
	},
	{
		month: "Août",
		users: 144,
		average: 74,
	},
];

const chartConfig = {
	average: {
		label: "Moyenne",
		color: "var(--chart-1)",
	},
	users: {
		label: "Utilisateurs",
		color: "var(--chart-2)",
	},
} satisfies ChartConfig;

export function ContributionsAverageChart() {
	return (
		<ChartContainer config={chartConfig}>
			<LineChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis axisLine={false} dataKey="month" tickFormatter={(value) => value.slice(0, 3)} tickLine={false} tickMargin={8} />
				<ChartTooltip content={<ChartTooltipContent />} cursor={false} />
				<Line dataKey="average" dot={false} stroke="var(--color-average)" strokeWidth={2} type="monotone" />
				<Line dataKey="users" dot={false} stroke="var(--color-users)" strokeWidth={2} type="monotone" />
			</LineChart>
		</ChartContainer>
	);
}
