import type { MDXComponents } from "mdx/types";
import { Contact } from "@/components/contact";
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
			<Contact />
		</>
	);
}
