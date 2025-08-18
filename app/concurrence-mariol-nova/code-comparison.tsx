import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export function CodeComparison() {
	return (
		<div className="space-y-6">
			{/* Rapport de duplication */}
			<div className="rounded-lg border border-gray-200 bg-gray-50 p-6">
				<h3 className="mb-4 font-semibold text-gray-800 text-lg">Rapport d'analyse de similarité de code</h3>
				<div className="space-y-4">
					<div className="flex items-center justify-between rounded-lg border bg-white p-4">
						<div>
							<h4 className="font-medium text-gray-900">Similarité globale</h4>
							<p className="text-gray-600 text-sm">Analyse comparative des bases de code</p>
						</div>
						<div className="text-right">
							<div className="font-bold text-2xl text-gray-800">4.8%</div>
							<div className="text-gray-500 text-xs">de similarité détectée</div>
						</div>
					</div>
					<div className="flex justify-center">
						<Link className={buttonVariants()} href="#" rel="noopener noreferrer" target="_blank">
							Voir le rapport de similarité de code
						</Link>
					</div>
				</div>
			</div>

			{/* Conclusion */}
			<div className="rounded-lg border border-amber-200 bg-amber-50 p-4">
				<h4 className="mb-2 font-medium text-amber-800">Conclusion de l'analyse technique</h4>
				<p className="text-amber-700 text-sm">
					L'analyse met en avant que les similarités de code concernent principalement des librairies de composants utilisées en commun ou du code
					Payload etant proche du à la structure du CMS, et non des parties métier ou des fonctionnalités spécifiques.
				</p>
			</div>
		</div>
	);
}
