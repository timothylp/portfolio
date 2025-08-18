import { queryAsanaTimeEntries } from "@/app/temp/asana";
import { AsanaTimeChartClient } from "./index.client";

export async function AsanaTimeChart() {
	const asanaTimeEntries = await queryAsanaTimeEntries();
	return <AsanaTimeChartClient asanaTimeEntries={asanaTimeEntries} />;
}
