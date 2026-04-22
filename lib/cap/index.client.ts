"use client";

export async function solveCapWidgetToken(apiEndpoint: string | undefined): Promise<string | undefined> {
	const { default: Cap } = await import("@cap.js/widget");
	const cap = new Cap({ apiEndpoint });
	const { token } = await cap.solve();
	return token;
}
