import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { XIcon } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Socials(props: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex gap-2", props.className)}>
			<Link href={SOCIALS.x.href} target="_blank">
				<Button size="sm" variant="secondary">
					<XIcon className="size-3.5" />
					{SOCIALS.x.label}
				</Button>
			</Link>
			<Link href={SOCIALS.github.href} target="_blank">
				<Button size="sm" variant="secondary">
					<GithubIcon className="size-3.5" />
					{SOCIALS.github.label}
				</Button>
			</Link>
		</div>
	);
}
