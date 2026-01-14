import type { MetadataRoute } from "next";
import { BASE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
	return [
		{
			url: BASE_URL,
			lastModified: new Date("2026-01-14"),
			changeFrequency: "monthly",
			priority: 1.0,
		},
		{
			url: `${BASE_URL}/politique-de-confidentialite`,
			lastModified: new Date("2026-01-14"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
		{
			url: `${BASE_URL}/mentions-legales`,
			lastModified: new Date("2026-01-14"),
			changeFrequency: "yearly",
			priority: 0.3,
		},
	];
}
