import { BASE_URL } from "@/lib/constants";

export default function sitemap() {
	return [
		{
			url: BASE_URL,
			lastModified: new Date().toISOString().split("T")[0],
		},
		{
			url: `${BASE_URL}/politique-de-confidentialite`,
			lastModified: new Date().toISOString().split("T")[0],
		},
		{
			url: `${BASE_URL}/mentions-legales`,
			lastModified: new Date().toISOString().split("T")[0],
		},
	];
}
