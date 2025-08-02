"use client";

import { snapdom } from "@zumer/snapdom";
import { Button } from "@/components/ui/button";

export function ExportOG() {
	const handleExport = async () => {
		const ogImage = document.getElementById("og-image");
		if (!ogImage) return;
		const result = await snapdom(ogImage, {
			embedFonts: true,
			quality: 100,
			width: 1200,
			height: 630,
		});

		await result.download({ format: "png", filename: "opengraph-image" });
	};

	return (
		<Button onClick={handleExport} variant="outline">
			Générer l'image
		</Button>
	);
}
