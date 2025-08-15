import { Gitlab } from "@gitbeaker/rest";
import { cache } from "react";

export const gitlab = new Gitlab({
	host: process.env.GITLAB_HOST || "https://gitlab.com",
	token: process.env.GITLAB_TOKEN,
});

export const queryUserContributionsByMonth = cache(async ({ userId, startDate, endDate }: { userId: number; startDate: string; endDate?: string }) => {
	const events = await gitlab.Events.all({
		action: "pushed",
		userId,
		after: startDate,
		before: endDate,
	});

	const monthlyCounts = events.reduce((acc, event) => {
		const date = new Date(event.created_at);
		const month = date.getMonth();
		acc[month]++;
		return acc;
	}, new Array(12).fill(0));

	return monthlyCounts;
});

export const queryAverageContributionsByMonth = cache(async ({ userIds, startDate, endDate }: { userIds: number[]; startDate: string; endDate?: string }) => {
	const userContributionsPromises = userIds.map((userId) => queryUserContributionsByMonth({ userId, startDate, endDate }));

	const userContributions = await Promise.all(userContributionsPromises);

	const monthlyAverages = new Array(12).fill(0);

	for (const contributions of userContributions) {
		for (let month = 0; month < contributions.length; month++) {
			monthlyAverages[month] += contributions[month];
		}
	}

	const numberOfUsers = userIds.length;
	for (let month = 0; month < monthlyAverages.length; month++) {
		monthlyAverages[month] /= numberOfUsers;
	}

	return monthlyAverages;
});
