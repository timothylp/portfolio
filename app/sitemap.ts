import { BASE_URL } from "@/lib/constants";

export default function sitemap() {
	return [
		{
			url: BASE_URL,
			lastModified: new Date().toISOString().split("T")[0],
		},
	];
}
