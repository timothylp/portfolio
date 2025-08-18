import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { cache } from "react";
import { readJsonFileIfExists } from "./utils";

const ASANA_URL = "https://app.asana.com/api/1.0";

export async function fetchAsana(endpoint: string, options: RequestInit = {}) {
	const token = process.env.ASANA_TOKEN;

	if (!token) {
		throw new Error("ASANA_TOKEN environment variable is required");
	}

	const url = `${ASANA_URL}${endpoint}`;

	const config: RequestInit = {
		...options,
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "application/json",
			Accept: "application/json",
			...options.headers,
		},
	};

	const response = await fetch(url, config);

	if (!response.ok) {
		const error = await response.json();
		console.error(error);
		throw new Error(`Asana API error: ${response.status} ${response.statusText}`);
	}

	return response.json();
}

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

const FILENAME = "time-tracking-entries.json";

export const queryAsanaTimeEntries = cache(async () => {
	const allTimeEntries: FormattedEntry[] = [];
	let hasNextPage = true;
	let offset = "";

	const isDev = process.env.NODE_ENV === "development";

	if (isDev) {
		const filepath = join(process.cwd(), "data", FILENAME);

		const existingEntries = await readJsonFileIfExists<FormattedEntry[]>(filepath);
		if (existingEntries) {
			return existingEntries;
		}
	}

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
		const response: AsanaResponse = await fetchAsana(endpoint);

		// Transform and add entries to our array
		const formattedEntries: FormattedEntry[] = response.data.map((entry) => ({
			duration: entry.duration_minutes,
			date: entry.entered_on,
		}));

		allTimeEntries.push(...formattedEntries);

		// Check if there's a next page
		if (response.next_page) {
			offset = response.next_page.offset;
		} else {
			hasNextPage = false;
		}
	}

	if (isDev) {
		await mkdir(join(process.cwd(), "data"), { recursive: true });
		const filepath = join(process.cwd(), "data", FILENAME);
		await writeFile(filepath, JSON.stringify(allTimeEntries, null, 2), "utf-8");
	}

	return allTimeEntries;
});
