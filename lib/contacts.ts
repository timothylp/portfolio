"use server";

import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";

type FormState = {
	success: boolean;
	error: string;
};

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmail(_prevState: FormState, formData: FormData): Promise<FormState> {
	const email = String(formData.get("email") || "").trim();
	const message = String(formData.get("message") || "").trim();

	if (process.env.EMAIL_ENABLED === "false") {
		return { success: false, error: "Les emails sont désactivés." };
	}

	if (!(process.env.EMAIL_FROM_NAME && process.env.EMAIL_FROM_ADDRESS && process.env.EMAIL_TO_ADDRESS)) {
		return { success: false, error: "La configuration des emails n'est pas correcte." };
	}

	if (!(email && message)) {
		return { success: false, error: "Les champs email et message sont requis." };
	}

	const { data, error } = await resend.emails.send({
		from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_ADDRESS}>`,
		to: [process.env.EMAIL_TO_ADDRESS],
		subject: "Nouveau message de contact",
		replyTo: email,
		react: EmailTemplate({ email, message }),
		text: `
			Email : ${email}
			Message : ${message}
		`,
	});

	if (error) {
		return { success: false, error: "Une erreur est survenue lors de l'envoi de l'email. Veuillez réessayer plus tard." };
	}

	console.info("Email sent successfully", data);

	return { success: true, error: "" };
}
