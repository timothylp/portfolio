import { NextResponse } from "next/server";
import { fetchAsana } from "@/app/temp/asana";

export async function GET() {
	try {
		const searchParams = new URLSearchParams({
			user: process.env.ASANA_USER_GID || "",
			workspace: process.env.ASANA_WORKSPACE_GID || "",
			limit: "100",
		});

		const endpoint = `/time_tracking_entries?${searchParams.toString()}`;
		const timeEntries = await fetchAsana(endpoint);

		return NextResponse.json(timeEntries);
	} catch (error) {
		console.error("Error fetching time tracking entries:", error);
		return NextResponse.json({ error: "Failed to fetch time tracking entries" }, { status: 500 });
	}
}
