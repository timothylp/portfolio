import { Socials } from "./socials";
import { ThemeToggle } from "./theme-toggle";

export function Header() {
	return (
		<header className="flex justify-between">
			<div className="flex flex-col gap-2">
				<h1 className="flex flex-col">
					<span className="font-semibold text-2xl tracking-tighter">Timothy Le Pallec</span>
					<span className="sr-only"> - </span>
					<span className="font-mono">Co-fondateur et CTO de Mariol</span>
				</h1>
				<Socials />
			</div>

			<ThemeToggle />
		</header>
	);
}
