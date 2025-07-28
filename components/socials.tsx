import Link from "next/link";
import { GithubIcon } from "@/components/icons/github";
import { XIcon } from "@/components/icons/x";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const socials = {
	x: "https://x.com/timothylp_",
	github: "https://github.com/timothylp",
};

export function Socials(props: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex gap-2", props.className)}>
			<Link href={socials.x} target="_blank">
				<Button size="sm" variant="secondary">
					<XIcon className="size-3.5" />
					@timothylp_
				</Button>
			</Link>
			<Link href={socials.github} target="_blank">
				<Button size="sm" variant="secondary">
					<GithubIcon className="size-3.5" />
					timothylp
				</Button>
			</Link>
		</div>
	);
}
