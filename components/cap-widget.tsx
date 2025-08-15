"use client";

import { createElement, useEffect, useRef } from "react";

type CapWidgetProps = {
	apiEndpoint: string;
	workerCount?: number;
	hiddenFieldName?: string;
	i18n?: {
		verifyingLabel?: string;
		initialState?: string;
		solvedLabel?: string;
		errorLabel?: string;
		verifyAriaLabel?: string;
		verifyingAriaLabel?: string;
		verifiedAriaLabel?: string;
		errorAriaLabel?: string;
	};
	onSolve?: (token: string) => void;
	onError?: (error: unknown) => void;
	onReset?: () => void;
	onProgress?: (progress: unknown) => void;
	className?: string;
	style?: React.CSSProperties;
};

export function CapWidget({
	apiEndpoint,
	workerCount,
	hiddenFieldName = "cap-token",
	i18n,
	onSolve,
	onError,
	onReset,
	onProgress,
	className,
	style,
}: CapWidgetProps) {
	const widgetRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!widgetRef.current) return;

		const widget = widgetRef.current;

		// Add event listeners
		const handleSolve = (e: CustomEvent) => {
			onSolve?.(e.detail.token);
		};

		const handleError = (e: CustomEvent) => {
			onError?.(e.detail);
		};

		const handleReset = () => {
			onReset?.();
		};

		const handleProgress = (e: CustomEvent) => {
			onProgress?.(e.detail);
		};

		widget.addEventListener("solve", handleSolve as EventListener);
		widget.addEventListener("error", handleError as EventListener);
		widget.addEventListener("reset", handleReset);
		widget.addEventListener("progress", handleProgress as EventListener);

		return () => {
			widget.removeEventListener("solve", handleSolve as EventListener);
			widget.removeEventListener("error", handleError as EventListener);
			widget.removeEventListener("reset", handleReset);
			widget.removeEventListener("progress", handleProgress as EventListener);
		};
	}, [onSolve, onError, onReset, onProgress]);

	return createElement("cap-widget", {
		className,
		"data-cap-api-endpoint": `${apiEndpoint}/`,
		"data-cap-hidden-field-name": hiddenFieldName,
		"data-cap-i18n-error-aria-label": i18n?.errorAriaLabel || "Erreur",
		"data-cap-i18n-error-label": i18n?.errorLabel || "Erreur",
		"data-cap-i18n-initial-state": i18n?.initialState || "Je ne suis pas un robot",
		"data-cap-i18n-solved-label": i18n?.solvedLabel || "Je ne suis pas un robot",
		"data-cap-i18n-verified-aria-label": i18n?.verifiedAriaLabel || "Je ne suis pas un robot",
		"data-cap-i18n-verify-aria-label": i18n?.verifyAriaLabel || "Je ne suis pas un robot",
		"data-cap-i18n-verifying-aria-label": i18n?.verifyingAriaLabel || "Vérification...",
		"data-cap-i18n-verifying-label": i18n?.verifyingLabel || "Vérification...",
		"data-cap-worker-count": workerCount,
		id: "cap",
		ref: widgetRef,
		style,
	});
}
