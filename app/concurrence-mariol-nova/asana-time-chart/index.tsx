import { queryAsanaTimeEntries } from "../asana";
import { AsanaTimeChartClient } from "./index.client";

export async function AsanaTimeChart({ excludedMonths = [] }: { excludedMonths?: string[] } = {}) {
	const asanaTimeEntries = await queryAsanaTimeEntries();
	return <AsanaTimeChartClient asanaTimeEntries={asanaTimeEntries} excludedMonths={excludedMonths} />;
}
