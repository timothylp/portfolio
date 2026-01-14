import type { MDXComponents } from "mdx/types";
import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { FAQ } from "@/components/faq";
import { Header } from "@/components/header";
import { Projects } from "@/components/projects";
import Introduction from "@/content/introduction.mdx";

const overrideComponents: MDXComponents = {
	h2: ({ children }) => <h2 className="font-mono font-semibold text-xl">{children}</h2>,
};

export default function HomePage() {
	return (
		<>
			<Header />
			<Introduction components={overrideComponents} />
			<Projects />
			<FAQ />
			<Contact />
		</>
	);
}

export const metadata: Metadata = {
	alternates: {
		canonical: "/",
	},
};
