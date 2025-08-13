"use client";

import { createContext, useContext, useMemo } from "react";
import { cn } from "@/lib/utils";

export type ChartConfig = Record<
	string,
	{
		label?: string;
		color?: string;
	}
>;

type ChartContextValue = {
	config: ChartConfig;
};

const ChartContext = createContext<ChartContextValue | null>(null);

export function ChartContainer({
	config,
	children,
	className,
	...props
}: {
	config: ChartConfig;
	children: React.ReactNode;
	className?: string;
} & React.ComponentProps<"div">) {
	const style = useMemo(() => {
		const cssVars: Record<string, string> = {};
		let index = 1;
		for (const [key, value] of Object.entries(config)) {
			if (!value) continue;
			const color = value.color ?? `hsl(var(--chart-${index}))`;
			cssVars[`--color-${key}`] = color;
			index++;
		}
		return cssVars as React.CSSProperties;
	}, [config]);

	return (
		<ChartContext.Provider value={{ config }}>
			<div className={cn("w-full", className)} style={style} {...props}>
				{children}
			</div>
		</ChartContext.Provider>
	);
}

export function useChartConfig() {
	const ctx = useContext(ChartContext);
	if (!ctx) throw new Error("useChartConfig must be used within ChartContainer");
	return ctx.config;
}

export function ChartTooltip({ content, ...props }: React.ComponentProps<"div"> & { content: React.ReactNode }) {
	// This component is a thin wrapper to align with shadcn/ui API
	return <div {...props}>{content}</div>;
}

export function ChartTooltipContent({
	label,
	className,
	indicator = "dot",
	hideLabel,
	hideIndicator,
	payload,
	nameKey,
	labelKey,
}: {
	label?: string;
	className?: string;
	indicator?: "line" | "dot" | "dashed";
	hideLabel?: boolean;
	hideIndicator?: boolean;
	payload?: { name: string; value: number; fill: string }[];
	nameKey?: string;
	labelKey?: string;
}) {
	const config = useChartConfig();

	const resolvedLabel = labelKey && config[labelKey]?.label ? config[labelKey]?.label : label;

	if (!payload?.length) return null;

	const tooltipLabel = hideLabel ? null : <div className="font-medium">{resolvedLabel}</div>;

	const nestLabel = payload.length === 1 && indicator !== "dot";

	return (
		<div
			className={cn("grid min-w-[8rem] items-start gap-1.5 rounded-lg border border-border/50 bg-background px-2.5 py-1.5 text-xs shadow-xl", className)}
		>
			{nestLabel ? null : tooltipLabel}
			<div className="grid gap-1.5">
				{payload.map((item, index) => {
					const indicatorColor = item.fill;
					const displayName = nameKey && config[item.name]?.label ? config[item.name]?.label : item.name;
					return (
						<div
							className={cn(
								"flex w-full items-stretch gap-2 [&>svg]:h-2.5 [&>svg]:w-2.5 [&>svg]:text-muted-foreground",
								indicator === "dot" && "items-center"
							)}
							key={index}
						>
							{hideIndicator ? null : (
								<div
									className={cn("shrink-0 rounded-[2px] border-[--color-border] bg-[--color-bg]", {
										"h-2.5 w-2.5": indicator === "dot",
										"w-1": indicator === "line",
										"w-0 border-[1.5px] border-dashed bg-transparent": indicator === "dashed",
										"my-0.5": nestLabel && indicator === "dashed",
									})}
									style={createCssVarStyle({ "--color-bg": indicatorColor, "--color-border": indicatorColor })}
								/>
							)}
							<div className={cn("flex flex-1 justify-between leading-none", nestLabel ? "items-end" : "items-center")}>
								<div className="grid gap-1.5">
									{nestLabel ? tooltipLabel : null}
									<span className="text-muted-foreground">{displayName}</span>
								</div>
								<span className="font-medium font-mono text-foreground tabular-nums">{item.value.toLocaleString()}</span>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export function ChartLegend({ content }: { content: React.ReactNode }) {
	return <div className="mt-2 flex flex-wrap items-center gap-3">{content}</div>;
}

export function ChartLegendContent({ nameKey, items }: { nameKey?: string; items: { name: string; color: string }[] }) {
	const config = useChartConfig();
	return (
		<div className="flex flex-wrap items-center gap-3 text-xs">
			{items.map((item) => {
				const label = nameKey && config[item.name]?.label ? config[item.name]?.label : item.name;
				return (
					<div className="inline-flex items-center gap-2" key={item.name}>
						<span className="inline-block h-2.5 w-2.5 rounded-[2px]" style={{ backgroundColor: item.color }} />
						<span className="text-muted-foreground">{label}</span>
					</div>
				);
			})}
		</div>
	);
}

type CSSVarStyle = React.CSSProperties & Record<string, string | number>;

function createCssVarStyle(vars: Record<string, string | number>): CSSVarStyle {
	return vars as CSSVarStyle;
}
