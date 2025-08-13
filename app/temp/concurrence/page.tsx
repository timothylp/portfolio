import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContributionsChart } from "@/components/contributions-chart";
import { averageMonthlyCounts, fetchUserEventsMonthlyCounts, findUserIdByUsername } from "@/lib/gitlab";

const MONTHS = ["Jan", "Fév", "Mar", "Avr", "Mai", "Jun", "Jui", "Aoû", "Sep", "Oct", "Nov", "Déc"];

export default async function ConcurrencePage({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) {
	const token = typeof searchParams.token === "string" ? searchParams.token : undefined;
	if (!token || token !== process.env.TEMP_TOKEN) notFound();

	const username = typeof searchParams.username === "string" ? searchParams.username : undefined;
	const othersParam = typeof searchParams.others === "string" ? searchParams.others : undefined;
	const othersUsernames = othersParam
		? othersParam
				.split(",")
				.map((s) => s.trim())
				.filter(Boolean)
		: [];

	if (!username) {
		return (
			<div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background">
				<p className="text-muted-foreground text-sm">Ajoutez les paramètres de requête requis:</p>
				<code className="rounded-md border px-2 py-1 text-xs">?token=...&username=votre_username&others=autre1,autre2</code>
			</div>
		);
	}

	const currentYear = new Date().getUTCFullYear();
	const previousYear = currentYear - 1;

	const mainUserId = await findUserIdByUsername(username);
	if (!mainUserId) {
		return (
			<div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-2 bg-background">
				<p className="text-muted-foreground text-sm">Utilisateur introuvable sur GitLab:</p>
				<code className="rounded-md border px-2 py-1 text-xs">{username}</code>
			</div>
		);
	}

	const [currentCounts, previousCounts] = await Promise.all([
		fetchUserEventsMonthlyCounts(mainUserId, currentYear),
		fetchUserEventsMonthlyCounts(mainUserId, previousYear),
	]);

	let othersAverage: number[] = new Array(12).fill(0);
	if (othersUsernames.length) {
		const otherIds = (await Promise.all(othersUsernames.map((u) => findUserIdByUsername(u)))).filter((id): id is number => typeof id === "number");
		if (otherIds.length) {
			const otherCounts = await Promise.all(otherIds.map((id) => fetchUserEventsMonthlyCounts(id, currentYear)));
			othersAverage = averageMonthlyCounts(otherCounts);
		}
	}

	const data = MONTHS.map((label, idx) => ({
		month: label,
		current: currentCounts[idx] ?? 0,
		previous: previousCounts[idx] ?? 0,
		others: othersAverage[idx] ?? 0,
	}));

	return (
		<div className="absolute inset-0 flex h-screen w-screen flex-col items-center gap-6 overflow-auto bg-background p-6">
			<div className="w-full max-w-5xl">
				<div className="mb-2 font-semibold text-lg">Évolution des contributions mensuelles</div>
				<div className="text-muted-foreground text-sm">
					Utilisateur: <span className="font-medium">{username}</span> • Année {currentYear} vs {previousYear} • Moyenne des autres
				</div>
			</div>
			<div className="w-full max-w-5xl rounded-lg border p-4">
				<ContributionsChart data={data} />
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
