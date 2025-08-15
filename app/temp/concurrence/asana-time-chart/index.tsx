import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { AsanaTimeChartClient } from "./index.client";

export async function AsanaTimeChart() {
	const asanaTimeEntries = JSON.parse(await readFile(join(process.cwd(), "data", "asana-time-entries.json"), "utf-8")) as {
		duration: number;
		date: string;
	}[];

	return <AsanaTimeChartClient asanaTimeEntries={asanaTimeEntries} />;
}
