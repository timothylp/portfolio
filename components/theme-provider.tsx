"use client";

import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";
import { useEffect, useState } from "react";

const initialRender = process.env.NODE_ENV === "production";

export function ThemeProvider(props: ThemeProviderProps) {
	const [shouldRender, setShouldRender] = useState(initialRender);

	useEffect(() => {
		if (!initialRender) {
			setShouldRender(true);
		}
	}, []);

	return shouldRender ? <NextThemesProvider {...props} /> : props.children;
}
