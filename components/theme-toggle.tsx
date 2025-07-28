"use client";

import { useTheme } from "next-themes";
import { Button } from "./ui/button";

const THEMES = ["light", "dark", "system"] as const;
const THEME_LABELS: Record<string, string> = {
	light: "Clair",
	dark: "Sombre",
	system: "Système",
};

export function ThemeToggle() {
	const { theme, setTheme } = useTheme();

	const cycleTheme = () => {
		const currentIndex = THEMES.indexOf(theme as (typeof THEMES)[number]);
		const nextIndex = (currentIndex + 1) % THEMES.length;
		setTheme(THEMES[nextIndex]);
	};

	if (!theme) {
		return null;
	}

	return (
		<Button onClick={cycleTheme} size="sm" type="button" variant="ghost">
			{THEME_LABELS[theme]}
		</Button>
	);
}
