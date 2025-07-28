import { BASE_URL } from "@/lib/constants";

export function EmailTemplate({ email, message }: { email: string; message: string }) {
	return (
		<div
			style={{
				fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
				lineHeight: 1.6,
				color: "#333",
				maxWidth: "600px",
				margin: "0 auto",
				padding: "20px",
				backgroundColor: "#f9fafb",
			}}
		>
			<div
				style={{
					backgroundColor: "white",
					borderRadius: "8px",
					padding: "30px",
					boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
				}}
			>
				<div
					style={{
						textAlign: "center",
						marginBottom: "30px",
						paddingBottom: "20px",
						borderBottom: "2px solid #f3f4f6",
					}}
				>
					<h1
						style={{
							color: "#1f2937",
							fontSize: "24px",
							fontWeight: 600,
							margin: "0 0 10px 0",
						}}
					>
						Nouveau message de contact
					</h1>
					<p
						style={{
							color: "#6b7280",
							fontSize: "16px",
							margin: 0,
						}}
					>
						Vous avez reçu un nouveau message via votre portfolio
					</p>
				</div>

				<div style={{ marginBottom: "25px" }}>
					<span
						style={{
							fontWeight: 600,
							color: "#374151",
							marginBottom: "5px",
							display: "block",
						}}
					>
						Email :
					</span>
					<div
						style={{
							color: "#1f2937",
							marginBottom: "15px",
							padding: "10px",
							backgroundColor: "#f9fafb",
							borderRadius: "4px",
							borderLeft: "3px solid #3b82f6",
						}}
					>
						{email}
					</div>
				</div>

				<div style={{ marginTop: "30px" }}>
					<span
						style={{
							fontWeight: 600,
							color: "#374151",
							marginBottom: "5px",
							display: "block",
						}}
					>
						Message :
					</span>
					<div
						style={{
							backgroundColor: "#f9fafb",
							padding: "20px",
							borderRadius: "6px",
							border: "1px solid #e5e7eb",
							whiteSpace: "pre-wrap",
						}}
					>
						{message}
					</div>
				</div>

				<div
					style={{
						marginTop: "30px",
						paddingTop: "20px",
						borderTop: "1px solid #e5e7eb",
						textAlign: "center",
						color: "#6b7280",
						fontSize: "14px",
					}}
				>
					<p>
						Ce message a été envoyé depuis votre <a href={BASE_URL}>formulaire de contact</a>
					</p>
					<div
						style={{
							color: "#9ca3af",
							fontSize: "12px",
							marginTop: "10px",
						}}
					>
						Envoyé le{" "}
						{new Date().toLocaleDateString("fr-FR", {
							year: "numeric",
							month: "long",
							day: "numeric",
							hour: "2-digit",
							minute: "2-digit",
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
