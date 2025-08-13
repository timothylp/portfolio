import { Gitlab } from "@gitbeaker/rest";

export function createGitlabClient() {
	const host = process.env.GITLAB_HOST || "https://gitlab.com";
	const token = process.env.GITLAB_TOKEN;

	return new Gitlab({ host, token });
}

export type MonthlyCounts = number[]; // length 12

export function emptyMonthlyCounts(): MonthlyCounts {
	return new Array(12).fill(0);
}

export function addEventToMonthlyCounts(counts: MonthlyCounts, dateISO: string) {
	const date = new Date(dateISO);
	const monthIndex = date.getUTCMonth();
	counts[monthIndex]++;
}

export async function findUserIdByUsername(username: string): Promise<number | null> {
	const client = createGitlabClient();
	// GitLab REST allows filtering by exact username
	type UsersApi = { all: (opts: { username?: string }) => Promise<Array<{ id: number; username: string }>> };
	const usersApi = (client as unknown as { Users: UsersApi }).Users;
	const users = await usersApi.all({ username });
	const match = users.find((u) => u.username.toLowerCase() === username.toLowerCase());
	return match ? match.id : null;
}

const TRAILING_SLASH_REGEX = /\/$/;

export async function fetchUserEventsMonthlyCounts(userId: number, year: number): Promise<MonthlyCounts> {
	const counts = emptyMonthlyCounts();
	const host = process.env.GITLAB_HOST || "https://gitlab.com";
	const token = process.env.GITLAB_TOKEN;
	const after = `${year}-01-01`;
	const before = `${year}-12-31`;
	const perPage = 100;

	async function fetchAllPages(page: number): Promise<void> {
		const base = host.replace(TRAILING_SLASH_REGEX, "");
		const url = new URL(`${base}/api/v4/users/${userId}/events`);
		url.searchParams.set("after", after);
		url.searchParams.set("before", before);
		url.searchParams.set("per_page", String(perPage));
		url.searchParams.set("page", String(page));

		const res = await fetch(url, {
			headers: token ? { "PRIVATE-TOKEN": token } : undefined,
		});
		if (!res.ok) {
			throw new Error(`GitLab events request failed (${res.status})`);
		}
		const events = (await res.json()) as Array<{ created_at?: string }>;
		for (const ev of events) {
			if (ev?.created_at) addEventToMonthlyCounts(counts, ev.created_at);
		}
		if (events.length === perPage) {
			await fetchAllPages(page + 1);
		}
	}

	await fetchAllPages(1);

	return counts;
}

export function averageMonthlyCounts(arrays: MonthlyCounts[]): MonthlyCounts {
	if (!arrays.length) return emptyMonthlyCounts();
	const result = emptyMonthlyCounts();
	for (let m = 0; m < 12; m++) {
		let sum = 0;
		for (const arr of arrays) sum += arr[m] || 0;
		result[m] = Math.round(sum / arrays.length);
	}
	return result;
}
