export function FeaturesComparison() {
	return (
		<div className="grid gap-8 md:grid-cols-2">
			<div className="space-y-4">
				<h3 className="font-medium text-[#6b40ce] text-xl">Mariol</h3>
				<ul className="space-y-2 text-sm">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Thèmes prêts à l'emploi</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Gestion des pages</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Blocs de contenu de base : Bannière, Texte/image, Réassurance, Produits mis en avant, Carousel de produits</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Personnalisation des couleurs, logos, images et contenu</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Gestion des produits : Physique/Digital, Variantes, Stock, Prix, Images, Description, Catégories</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Gestion des commandes : Récapitulatif, Livraison, Paiement, Statut, etc.</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Gestion des méthodes de livraison : Colissimo, Chronopost et Mondial Relay.</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Gestion des réductions : Code promotionnel, Remise, etc.</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Tunnel de vente avec Stripe</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#6b40ce]">✓</span>
						<span>Tableau de bord avec statistiques</span>
					</li>
				</ul>
			</div>
			<div className="space-y-4">
				<h3 className="font-medium text-[#ff4d4d] text-xl">Nova</h3>
				<ul className="space-y-2 text-sm">
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Tableau de bord de suivi des projets avec tunnel de création automatisé</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Outil en ligne de commande pour ajouter de nouvelles fonctionnalités à des projets existants</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Gestion des pages : privées, publiques, avec blocs de contenu ou éditeur</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>
							Blocs de contenu : flexibles, colonnes, bannière, galerie, relations, avis, accordéon (FAQ), chronologie, réassurance, tuiles,
							marques
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Barre d'administration : éditer ou ajouter des pages depuis le front</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Template préconfiguré pour les nouveaux projets Nova</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Tableau de bord personnalisable avec widgets</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>
							Module items : gestion d’éléments pour des listings (actualités, événements, catalogue raisonné, blog, etc.) avec catégories,
							filtres, recherche et pagination
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>
							Module popup : activation de popups sur les pages avec contenu personnalisé, dates de début et de fin, enregistrement en cookie pour
							éviter le spam
						</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>Module avis : gestion des avis clients avec modération, blocs associés et formulaire de dépôt d’avis</span>
					</li>
					<li className="flex items-start gap-2">
						<span className="mt-1 text-[#ff4d4d]">✓</span>
						<span>
							Module formulaire : gestion des formulaires de contact, avec enregistrement en base de données et envoi de notifications par email à
							l’administrateur et à l’utilisateur
						</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
