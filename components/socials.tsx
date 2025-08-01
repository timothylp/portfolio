import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { XIcon } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { SOCIALS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Socials(props: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex gap-2", props.className)}>
			<Button asChild size="sm" variant="secondary">
				<Link data-umami-event="open-social" data-umami-event-social="x" href={SOCIALS.x.href} target="_blank">
					<XIcon className="size-3.5" />
					{SOCIALS.x.label}
				</Link>
			</Button>
			<Button asChild size="sm" variant="secondary">
				<Link data-umami-event="open-social" data-umami-event-social="github" href={SOCIALS.github.href} target="_blank">
					<GithubIcon className="size-3.5" />
					{SOCIALS.github.label}
				</Link>
			</Button>
		</div>
	);
}
