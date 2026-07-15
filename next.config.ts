import createMdx from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	reactCompiler: true,
	typedRoutes: true,

	images: {
		minimumCacheTTL: 31_536_000, // 1 year
		formats: ["image/webp"],
		qualities: [80, 85, 90, 100],
		contentDispositionType: "inline",
		deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
	},

	pageExtensions: ["md", "mdx", "ts", "tsx"],

	experimental: {
		useTypeScriptCli: true,
	},
};

const withMdx = createMdx({
	extension: /\.(md|mdx)$/,
});

const withCustom = (config: NextConfig) => {
	if (process.env.NODE_ENV === "production") {
		return {
			...config,
			productionBrowserSourceMaps: false,
			experimental: {
				...config.experimental,
				preloadEntriesOnStart: false,
				serverSourceMaps: false,
			},
		};
	}

	return config;
};

export default withMdx(withCustom(nextConfig));
