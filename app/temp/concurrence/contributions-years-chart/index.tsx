import { queryUserContributionsByMonth } from "../../gitlab";
import { ContributionsYearsChartClient } from "./index.client";

export async function ContributionsYearsChart() {
	const contributionsByMonth = await queryUserContributionsByMonth();
	return <ContributionsYearsChartClient contributionsByMonth={contributionsByMonth} />;
}
