export function Conclusion() {
	return (
		<div className="space-y-6">
			{/* Sentiment d'injustice */}
			<div className="rounded-lg border border-red-200 bg-red-50 p-6">
				<h3 className="mb-4 font-semibold text-lg text-red-800">Sentiment d'injustice et d'insulte</h3>
				<div className="space-y-4">
					<p className="text-red-700 text-sm leading-relaxed">
						L'accusation de concurrence déloyale et de vol de code constitue une
						<strong> insulte grave </strong> à mon éthique professionnelle et à mon investissement dans l'agence. Les données chiffrées présentées
						dans ce document démontrent clairement :
					</p>
					<ul className="space-y-2 text-red-700 text-sm">
						<li>
							• <strong>Aucune similarité technique</strong> entre Mariol et Nova
						</li>
						<li>
							• <strong>Marchés et cibles complètement différents</strong>
						</li>
						<li>
							• <strong>Investissement accru</strong> malgré la réduction du temps de travail
						</li>
					</ul>
					<div className="rounded-lg bg-red-100 p-4">
						<p className="font-medium text-red-800 text-sm">
							Cette accusation remet en question la confiance mutuelle et la reconnaissance de l'expertise apportée à l'agence.
						</p>
					</div>
				</div>
			</div>

			{/* Stratégie de développement Nova */}
			<div className="rounded-lg border border-blue-200 bg-blue-50 p-6">
				<h3 className="mb-4 font-semibold text-blue-800 text-lg">Stratégie et développement en cours sur Nova</h3>
				<div className="space-y-4">
					<div className="grid gap-6 md:grid-cols-2">
						<div>
							<h4 className="mb-3 font-medium text-blue-900">Développements en cours</h4>
							<ul className="space-y-2 text-blue-700 text-sm">
								<li>• Finalisation du registre de composants et de blocs</li>
								<li>• Tableau de bord de suivi et de création de projet</li>
								<li>• Système de déploiement automatisé fonctionnel avec docker</li>
								<li>• Documentation technique complète</li>
							</ul>
						</div>
						<div>
							<h4 className="mb-3 font-medium text-blue-900">Préparation de la transition</h4>
							<ul className="space-y-2 text-blue-700 text-sm">
								<li>• Formation de l'équipe sur Nova</li>
								<li>• Documentation des processus</li>
								<li>• Transfert des connaissances</li>
							</ul>
						</div>
					</div>
					<div className="rounded-lg bg-blue-100 p-4">
						<p className="text-blue-800 text-sm">
							<strong>Objectif :</strong> Assurer une transition en douceur et garantir la pérennité de Nova pour l'agence.
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}
