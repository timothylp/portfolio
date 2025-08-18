import { readFile } from "node:fs/promises";

export async function readJsonFileIfExists<T>(filepath: string): Promise<T | null> {
	try {
		const content = await readFile(filepath, "utf-8");
		return JSON.parse(content) as T;
	} catch {
		return null;
	}
}
