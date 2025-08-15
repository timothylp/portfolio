import type { Metadata } from "next";
import { AsanaTimeChart } from "./asana-time-chart";
import { ContributionsAverageChart } from "./contributions-average-chart";
import { ContributionsYearsChart } from "./contributions-years-chart";

export default function ConcurrencePage() {
	return (
		<div className="absolute inset-0 flex h-screen w-screen flex-col items-center gap-6 overflow-auto bg-background p-6">
			<h2 className="mb-2 font-semibold text-lg">Comparaisons des contributions par mois entre 2024 et 2025</h2>
			<div className="w-full max-w-6xl rounded-lg border p-4">
				<ContributionsYearsChart />
			</div>
			<h2 className="mb-2 font-semibold text-lg">Comparaisons avec la moyenne des contributions par mois</h2>
			<div className="w-full max-w-6xl rounded-lg border p-4">
				<ContributionsAverageChart />
			</div>
			<h2 className="mb-2 font-semibold text-lg">Comparaisons des temps Asana par mois entre 2023-2024 et 2024-2025</h2>
			<div className="w-full max-w-6xl rounded-lg border p-4">
				<AsanaTimeChart />
			</div>
		</div>
	);
}

export const metadata: Metadata = {
	title: "Concurrence",
	description: "Concurrence",
	robots: {
		index: false,
		follow: false,
	},
};
