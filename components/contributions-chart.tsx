"use client";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ChartConfig } from "@/components/ui/chart";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltipContent } from "@/components/ui/chart";

type MonthlyDatum = {
	month: string;
	current: number;
	previous: number;
	others: number;
};

export function ContributionsChart({ data, title }: { data: MonthlyDatum[]; title?: string }) {
	const chartConfig: ChartConfig = {
		current: { label: "Année en cours", color: "hsl(var(--chart-1))" },
		previous: { label: "Année précédente", color: "hsl(var(--chart-2))" },
		others: { label: "Moyenne des autres", color: "hsl(var(--chart-3))" },
	};

	return (
		<div className="w-full">
			{title ? <div className="mb-4 font-medium text-muted-foreground text-sm">{title}</div> : null}
			<ChartContainer className="w-full" config={chartConfig}>
				<div className="w-full">
					<ResponsiveContainer height={320} width="100%">
						<BarChart accessibilityLayer data={data}>
							<CartesianGrid strokeDasharray="3 3" vertical={false} />
							<XAxis axisLine={false} dataKey="month" tickLine={false} />
							<YAxis allowDecimals={false} axisLine={false} tickLine={false} width={28} />
							<Tooltip
								content={({ label, payload }) => (
									<ChartTooltipContent
										label={typeof label === "string" ? label : undefined}
										nameKey="name"
										payload={(payload || []).map((p) => ({
											name: String(p?.name ?? ""),
											value: Number(p?.value ?? 0),
											fill: String(
												p?.color ?? (p?.payload && p?.name ? (chartConfig[p.name as keyof typeof chartConfig]?.color ?? "") : "")
											),
										}))}
									/>
								)}
								cursor={{ fill: "transparent" }}
							/>
							<Legend
								content={() => (
									<ChartLegend
										content={
											<ChartLegendContent
												items={[
													{ name: "current", color: chartConfig.current?.color ?? "" },
													{ name: "previous", color: chartConfig.previous?.color ?? "" },
													{ name: "others", color: chartConfig.others?.color ?? "" },
												]}
												nameKey="name"
											/>
										}
									/>
								)}
								verticalAlign="top"
							/>
							<Bar dataKey="current" fill={chartConfig.current?.color ?? ""} name="current" radius={4} />
							<Bar dataKey="previous" fill={chartConfig.previous?.color ?? ""} name="previous" radius={4} />
							<Bar dataKey="others" fill={chartConfig.others?.color ?? ""} name="others" radius={4} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</ChartContainer>
		</div>
	);
}
