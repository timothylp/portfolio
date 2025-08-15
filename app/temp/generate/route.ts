import { NextResponse } from "next/server";
import { queryAverageContributionsByMonth } from "@/lib/gitlab";

export async function GET() {
	try {
		// Récupération des IDs depuis les variables d'environnement
		const userIdsEnv = process.env.GITLAB_OTHERS_USERS_IDS;
		if (!userIdsEnv) {
			return NextResponse.json({ error: "Variable d'environnement GITLAB_OTHERS_USERS_IDS manquante" }, { status: 500 });
		}

		const userIds = userIdsEnv.split(",").map((id) => Number.parseInt(id.trim(), 10));
		// Appel de la fonction des moyennes des contributions
		const monthlyAverages = await queryAverageContributionsByMonth({
			userIds,
			startDate: "2024-09-01",
		});

		return NextResponse.json({
			success: true,
			message: "Données des moyennes des contributions écrites dans le fichier",
			data: monthlyAverages,
		});
	} catch (error) {
		console.error("Erreur lors de la génération des moyennes des contributions:", error);

		return NextResponse.json(
			{
				error: "Erreur interne du serveur",
				message: error instanceof Error ? error.message : "Erreur inconnue",
			},
			{ status: 500 }
		);
	}
}
