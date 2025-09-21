import createMdx from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	// biome-ignore lint/suspicious/useAwait: rewrites needs to be async
	async rewrites() {
		return [
			{
				source: "/script.js",
				destination: "https://stats.timothylepallec.com/script.js",
			},
		];
	},

	images: {
		minimumCacheTTL: 31_536_000, // 1 year
		formats: ["image/webp"],
		qualities: [80, 85, 90, 100],
		contentDispositionType: "inline",
		deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
	},

	pageExtensions: ["md", "mdx", "ts", "tsx"],

	productionBrowserSourceMaps: process.env.NODE_ENV === "development",

	experimental:
		process.env.NODE_ENV === "production"
			? {
					reactCompiler: true,
					preloadEntriesOnStart: false,
					webpackMemoryOptimizations: true,
					serverSourceMaps: false,
				}
			: undefined,
};

const withMdx = createMdx({
	extension: /\.(md|mdx)$/,
});

export default withMdx(nextConfig);
