export async function solveCapInvisible(): Promise<{ token: string } | null> {
	if (typeof window === "undefined" || !window.Cap) {
		console.warn("Cap.js is not available");
		return null;
	}

	try {
		const cap = new window.Cap({
			apiEndpoint: `${process.env.NEXT_PUBLIC_CAP_API_ENDPOINT}/`,
		});

		const solution = await cap.solve();
		return solution;
	} catch (error) {
		console.error("Error solving Cap invisible:", error);
		return null;
	}
}

declare global {
	// biome-ignore lint/nursery/useConsistentTypeDefinitions: C'est un interface global
	interface Window {
		Cap: new (config: {
			apiEndpoint: string;
		}) => {
			solve(): Promise<{ token: string }>;
		};
	}
}
