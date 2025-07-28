import createMDX from "@next/mdx";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,

	images: {
		minimumCacheTTL: 31_536_000, // 1 year
		formats: ["image/webp"],
		qualities: [80, 85, 90, 100],
		contentDispositionType: "inline",
		deviceSizes: [640, 768, 1024, 1280, 1536, 1920],
	},

	pageExtensions: ["md", "mdx", "ts", "tsx"],

	experimental:
		process.env.NODE_ENV === "production"
			? {
					reactCompiler: true,
				}
			: undefined,
};

const withMDX = createMDX({
	extension: /\.(md|mdx)$/,
});

export default withMDX(nextConfig);
