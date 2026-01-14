import { notFound } from "next/navigation";
import { ExportOG } from "./export-og";

export default function OGImage() {
	if (process.env.NODE_ENV === "production") notFound();

	const title = "Timothy Le Pallec";
	const description = "Co-fondateur et CTO de Mariol | Expert Next.js & PayloadCMS";

	return (
		<div className="absolute inset-0 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-black">
			<div className="flex h-[630px] w-[1200px] flex-col justify-center bg-[#fdfdfd] px-6 text-[#21201c]" id="og-image">
				<h1 className="flex flex-col gap-1">
					<span className="font-semibold text-5xl tracking-tighter">{title}</span>
					<span className="sr-only"> - </span>
					<span className="font-mono text-2xl">{description}</span>
				</h1>
			</div>
			<ExportOG />
		</div>
	);
}
