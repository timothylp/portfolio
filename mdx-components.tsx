import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
	return {
		h1: ({ children }) => <h1 className="font-bold text-2xl">{children}</h1>,
		h2: ({ children }) => <h2 className="font-semibold text-xl">{children}</h2>,
		p: ({ children }) => <p className="text-muted-foreground">{children}</p>,
		ul: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
		li: ({ children }) => <li>{children}</li>,
		a: ({ href, children, ...props }) => (
			<Link className="text-primary underline hover:text-primary/80" href={href} rel="noopener noreferrer" target="_blank" {...props}>
				{children}
			</Link>
		),
		strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
		...components,
	};
}
