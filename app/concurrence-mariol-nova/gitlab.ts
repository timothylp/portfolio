import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { Gitlab } from "@gitbeaker/rest";
import { cache } from "react";
import { readJsonFileIfExists } from "./utils";

export const gitlab = new Gitlab({
	host: process.env.GITLAB_HOST || "https://gitlab.com",
	token: process.env.GITLAB_TOKEN,
});

export type ContributionsByMonth = {
	month: string;
	previous: number;
	current: number;
};

const PREVIOUS_START_DATE = "2023-09-01";
const PREVIOUS_END_DATE = "2024-08-31";

const CURRENT_START_DATE = "2024-09-01";
const CURRENT_END_DATE = "2025-08-31";

const MONTHS_FR = ["septembre", "octobre", "novembre", "décembre", "janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août"];

const FILENAME = "contributions-by-month.json";

export const queryUserContributionsByMonth = cache(async () => {
	const isDev = process.env.NODE_ENV === "development";

	if (isDev) {
		const filepath = join(process.cwd(), "data", FILENAME);

		const existingEntries = await readJsonFileIfExists<ContributionsByMonth[]>(filepath);
		if (existingEntries) {
			return existingEntries;
		}
	}

	const [previousEvents, currentEvents] = await Promise.all([
		gitlab.Events.all({
			action: "pushed",
			userId: process.env.GITLAB_MAIN_USER_ID,
			after: PREVIOUS_START_DATE,
			before: PREVIOUS_END_DATE,
		}),
		gitlab.Events.all({
			action: "pushed",
			userId: process.env.GITLAB_MAIN_USER_ID,
			after: CURRENT_START_DATE,
			before: CURRENT_END_DATE,
		}),
	]);

	// Initialiser les compteurs pour les 12 mois
	const previousCounts = new Array(12).fill(0);
	const currentCounts = new Array(12).fill(0);

	// Compter les événements précédents par mois
	for (const event of previousEvents) {
		const date = new Date(event.created_at);
		const month = date.getMonth();
		previousCounts[month]++;
	}

	// Compter les événements actuels par mois
	for (const event of currentEvents) {
		const date = new Date(event.created_at);
		const month = date.getMonth();
		currentCounts[month]++;
	}

	// Créer le tableau de données au format chartData
	const contributionsByMonth = MONTHS_FR.map((month, index) => {
		const previous = previousCounts[index];
		const current = currentCounts[index];

		return {
			month,
			previous,
			current,
		};
	});

	if (isDev) {
		await mkdir(join(process.cwd(), "data"), { recursive: true });
		const filepath = join(process.cwd(), "data", FILENAME);
		await writeFile(filepath, JSON.stringify(contributionsByMonth, null, 2), "utf-8");
	}

	return contributionsByMonth;
});

// export const queryAverageContributionsByMonth = cache(async ({ userIds, startDate, endDate }: { userIds: number[]; startDate: string; endDate?: string }) => {
// 	const userContributionsPromises = userIds.map((userId) => queryUserContributionsByMonth({ userId, startDate, endDate }));

// 	const userContributions = await Promise.all(userContributionsPromises);

// 	const monthlyAverages = new Array(12).fill(0);

// 	for (const contributions of userContributions) {
// 		for (let month = 0; month < contributions.length; month++) {
// 			monthlyAverages[month] += contributions[month];
// 		}
// 	}

// 	const numberOfUsers = userIds.length;
// 	for (let month = 0; month < monthlyAverages.length; month++) {
// 		monthlyAverages[month] /= numberOfUsers;
// 	}

// 	return monthlyAverages;
// });
