"use client";

import { ForwardIcon, LoaderIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useLocalStorage, useMediaQuery } from "usehooks-ts";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { solveCapInvisible } from "@/lib/cap/index.client";
import { sendEmail } from "@/lib/contacts";
import { cn } from "@/lib/utils";

const texts = {
	button: "Parlons de votre projet",
	title: "Contact",
	description: "Je suis disponible pour discuter de vos projets.\nN'hésitez pas à me contacter.",
};

export function ContactClient({ className, isProduction }: React.ComponentProps<"button"> & { isProduction: boolean }) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)", { initializeWithValue: false });

	if (isDesktop) {
		return (
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger asChild>
					<Button className={className} data-umami-event="open-contact-form" size="lg" variant="outline">
						<MailIcon className="size-4" />
						{texts.button}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{texts.title}</DialogTitle>
						<DialogDescription className="whitespace-pre-line">{texts.description}</DialogDescription>
					</DialogHeader>
					<ContactForm isProduction={isProduction} setOpen={setOpen} />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={setOpen} open={open}>
			<DrawerTrigger asChild>
				<Button className={className} data-umami-event="open-contact-form" size="lg" variant="outline">
					{texts.button}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left!">
					<DrawerTitle>{texts.title}</DrawerTitle>
					<DrawerDescription className="whitespace-pre-line">{texts.description}</DrawerDescription>
				</DrawerHeader>
				<ContactForm className="px-4" isProduction={isProduction} setOpen={setOpen} />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="secondary">Annuler</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

function ContactForm({ className, setOpen, isProduction }: React.ComponentProps<"form"> & { setOpen: (open: boolean) => void; isProduction: boolean }) {
	const [form, setForm] = useLocalStorage("form", { email: "", message: "" });

	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setError(null);
		setIsLoading(true);

		const formData = new FormData(e.target as HTMLFormElement);
		try {
			if (process.env.NEXT_PUBLIC_CAP_API_ENDPOINT) {
				const solution = await solveCapInvisible();
				if (solution?.token) {
					formData.append("cap-token", solution.token);
				}
			}

			const response = await sendEmail(formData);

			if (response.success) {
				toast.success("Votre message a été envoyé avec succès", {
					description: "Je vous répondrai dans les plus brefs délais",
				});

				if (isProduction) {
					window.umami?.track("contact-form-submitted", {
						email: form.email,
					});
				}

				setForm({ email: "", message: "" });
				setOpen(false);
			} else {
				setError(response.error);
			}
		} catch (err) {
			console.error("Erreur lors de l'envoi du message:", err);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form className={cn("grid items-start gap-6", className)} onSubmit={handleSubmit}>
			<div className="grid gap-3">
				<Label htmlFor="email">Email</Label>
				<Input
					disabled={isLoading}
					id="email"
					name="email"
					onChange={handleFormChange}
					placeholder="email@example.com"
					required
					type="email"
					value={form.email}
				/>
			</div>
			<div className="grid gap-3">
				<Label htmlFor="message">Message</Label>
				<Textarea
					className="min-h-24 resize-y"
					disabled={isLoading}
					id="message"
					minLength={10}
					name="message"
					onChange={handleFormChange}
					placeholder="Bonjour, ..."
					required
					rows={4}
					value={form.message}
				/>
			</div>
			{error && <p className="text-destructive text-sm">{error}</p>}

			<p className="text-muted-foreground text-xs">
				En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre{" "}
				<Link className="text-primary underline hover:text-primary/80" href="/politique-de-confidentialite" prefetch>
					politique de confidentialité
				</Link>
				.
			</p>

			<Button className="w-full" disabled={isLoading} size="lg" type="submit" variant="outline">
				{isLoading ? (
					<LoaderIcon className="size-3.5 animate-spin" />
				) : (
					<>
						Envoyer
						<ForwardIcon className="size-3.5" />
					</>
				)}
			</Button>
		</form>
	);
}
