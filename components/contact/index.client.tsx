"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { ForwardIcon, LoaderIcon, MailIcon } from "lucide-react";
import Form from "next/form";
import Link from "next/link";
import { useTheme } from "next-themes";
import React, { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { useMediaQuery } from "@/hooks/use-media-query";
import { sendEmail } from "@/lib/contacts";
import { cn } from "@/lib/utils";

const texts = {
	button: "Parlons de votre projet",
	title: "Contact",
	description: "Je suis disponible pour discuter de vos projets.\nN'hésitez pas à me contacter.",
};

export function ContactClient({ className }: React.ComponentProps<"button">) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog onOpenChange={setOpen} open={open}>
				<DialogTrigger asChild>
					<Button className={className} size="lg" variant="outline">
						<MailIcon className="size-4" />
						{texts.button}
					</Button>
				</DialogTrigger>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>{texts.title}</DialogTitle>
						<DialogDescription className="whitespace-pre-line">{texts.description}</DialogDescription>
					</DialogHeader>
					<ContactForm />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer onOpenChange={setOpen} open={open}>
			<DrawerTrigger asChild>
				<Button className={className} size="lg" variant="outline">
					{texts.button}
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<DrawerHeader className="text-left!">
					<DrawerTitle>{texts.title}</DrawerTitle>
					<DrawerDescription className="whitespace-pre-line">{texts.description}</DrawerDescription>
				</DrawerHeader>
				<ContactForm className="px-4" />
				<DrawerFooter className="pt-2">
					<DrawerClose asChild>
						<Button variant="secondary">Annuler</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}

const initialState = {
	success: false,
	error: "",
};

function ContactForm({ className }: React.ComponentProps<"form">) {
	const { theme } = useTheme();

	const [state, action, isPending] = useActionState(sendEmail, initialState);
	const [form, setForm] = useLocalStorage("form", { email: "", message: "" });

	const [token, setToken] = useState<string | null>(null);

	useEffect(() => {
		if (state.success) {
			setForm({ email: "", message: "" });
			toast.success("Votre message a été envoyé avec succès", {
				description: "Je vous répondrai dans les plus brefs délais",
			});
		}
	}, [state.success, setForm]);

	const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const disabledSubmit = (process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && !token) || isPending;

	return (
		<Form action={action} className={cn("grid items-start gap-6", className)}>
			<div className="grid gap-3">
				<Label htmlFor="email">Email</Label>
				<Input
					disabled={isPending}
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
			{state.error && <p className="text-destructive text-sm">{state.error}</p>}

			<p className="text-muted-foreground text-xs">
				En soumettant ce formulaire, vous acceptez que vos données soient traitées conformément à notre{" "}
				<Link className="text-primary underline hover:text-primary/80" href="/politique-de-confidentialite" prefetch>
					politique de confidentialité
				</Link>
				.
			</p>

			<div className="flex flex-col items-center justify-center gap-4">
				{process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY && (
					<Turnstile
						onError={() => setToken(null)}
						onSuccess={setToken}
						options={{
							size: "flexible",
							language: "fr",
							theme: theme === "dark" ? "dark" : "light",
						}}
						siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY}
					/>
				)}
				<Button className="w-full" disabled={disabledSubmit} size="lg" type="submit" variant="outline">
					{disabledSubmit ? (
						<LoaderIcon className="size-3.5 animate-spin" />
					) : (
						<>
							Envoyer
							<ForwardIcon className="size-3.5" />
						</>
					)}
				</Button>
			</div>
		</Form>
	);
}
