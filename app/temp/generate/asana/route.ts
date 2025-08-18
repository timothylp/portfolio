import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { NextResponse } from "next/server";
import { fetchAsana } from "@/app/temp/asana";

type TimeTrackingEntry = {
	duration_minutes: number;
	entered_on: string;
};

type AsanaResponse = {
	data: TimeTrackingEntry[];
	next_page?: {
		offset: string;
		path: string;
		uri: string;
	};
};

type FormattedEntry = {
	duration: number;
	date: string;
};

export async function GET() {
	try {
		const allTimeEntries: FormattedEntry[] = [];
		let hasNextPage = true;
		let offset = "";

		console.info("Starting to fetch all time tracking entries...");

		while (hasNextPage) {
			const searchParams = new URLSearchParams({
				user: process.env.ASANA_USER_GID || "",
				workspace: process.env.ASANA_WORKSPACE_GID || "",
				limit: "100",
			});

			if (offset) {
				searchParams.append("offset", offset);
			}

			const endpoint = `/time_tracking_entries?${searchParams.toString()}`;
			console.info(`Fetching page with offset: ${offset || "initial"}`);

			const response: AsanaResponse = await fetchAsana(endpoint);

			// Transform and add entries to our array
			const formattedEntries: FormattedEntry[] = response.data.map((entry) => ({
				duration: entry.duration_minutes,
				date: entry.entered_on,
			}));

			allTimeEntries.push(...formattedEntries);
			console.info(`Fetched ${response.data.length} entries (total: ${allTimeEntries.length})`);

			// Check if there's a next page
			if (response.next_page) {
				offset = response.next_page.offset;
			} else {
				hasNextPage = false;
			}
		}

		console.info(`Total entries fetched: ${allTimeEntries.length}`);

		// Create data directory if it doesn't exist
		const dataDir = join(process.cwd(), "data");
		mkdirSync(dataDir, { recursive: true });

		// Save to file
		const filename = `time-tracking-entries-${new Date().toISOString().split("T")[0]}.json`;
		const filepath = join(dataDir, filename);

		writeFileSync(filepath, JSON.stringify(allTimeEntries, null, 2), "utf-8");

		console.info(`Data saved to: ${filepath}`);

		return NextResponse.json({
			success: true,
			totalEntries: allTimeEntries.length,
			filename,
			filepath,
			sampleData: allTimeEntries.slice(0, 5), // Return first 5 entries as sample
		});
	} catch (error) {
		console.error("Error fetching time tracking entries:", error);
		return NextResponse.json(
			{
				error: "Failed to fetch time tracking entries",
				details: error instanceof Error ? error.message : "Unknown error",
			},
			{ status: 500 }
		);
	}
}
