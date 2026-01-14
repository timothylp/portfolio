import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Footer } from "@/components/footer";
import { RichSnippets } from "@/components/rich-snippets";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { BASE_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	metadataBase: new URL(BASE_URL),
	title: {
		default: "Timothy Le Pallec | Expert Next.js & PayloadCMS | Fondateur de Mariol",
		template: "%s | Timothy Le Pallec",
	},
	description:
		"Expert en architectures Next.js et PayloadCMS. Fondateur de Mariol, je conçois des solutions web haute performance alliant simplicité d'usage et excellence technique.",
	keywords: [
		"Timothy Le Pallec",
		"Next.js",
		"PayloadCMS",
		"Mariol",
		"Développeur Web Fullstack",
		"Architecture Web",
		"Headless CMS",
		"TypeScript",
		"React",
		"Performance Web",
		"SaaS",
		"Lead Developer",
	],
	authors: [{ name: "Timothy Le Pallec", url: BASE_URL }],
	openGraph: {
		title: "Timothy Le Pallec",
		description:
			"Expert en architectures Next.js et PayloadCMS. Fondateur de Mariol, je conçois des solutions web haute performance alliant simplicité d'usage et excellence technique.",
		url: BASE_URL,
		siteName: "Timothy Le Pallec",
		locale: "fr_FR",
		type: "website",
	},
	twitter: {
		creator: "@timothylp_",
	},
	appleWebApp: {
		title: "Timothy",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const isUmamiEnabled = Boolean(process.env.NODE_ENV === "production" && process.env.UMAMI_WEBSITE_ID && process.env.UMAMI_URL);
	const isCapEnabled = Boolean(process.env.NEXT_PUBLIC_CAP_API_ENDPOINT);
	return (
		<html className={cn(geistSans.variable, geistMono.variable, "text-pretty antialiased")} lang="fr">
			<head>
				<RichSnippets />
				{isUmamiEnabled ? <Script data-website-id={process.env.UMAMI_WEBSITE_ID} src={`${process.env.UMAMI_URL}/script.js`} /> : null}
				{isCapEnabled ? <Script src="https://cdn.jsdelivr.net/npm/@cap.js/widget@0.1.25" /> : null}
			</head>
			<body>
				<ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange enableSystem>
					<div className="mx-4 my-8 max-w-xl space-y-16 lg:mx-auto">
						<main className="flex min-w-0 flex-auto flex-col gap-16">{children}</main>
						<Footer />
					</div>
					<Toaster position="bottom-center" />
				</ThemeProvider>
			</body>
		</html>
	);
}
