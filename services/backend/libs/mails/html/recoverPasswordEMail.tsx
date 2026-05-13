import { Heading, Hr, Link, Section, Text } from "react-email";
import { EmailButton } from "./components/EmailButton";
import { EmailInfoBox } from "./components/EmailInfoBox";
import { EmailLayout } from "./components/EmailLayout";

interface RecoverPasswordProps {
	resetLink: string;
	expiresInHours?: number;
}

export function RecoverPassword({
	resetLink,
	expiresInHours = 2,
}: RecoverPasswordProps) {
	return (
		<EmailLayout preview="Réinitialisez votre mot de passe Proprieto">
			<Heading
				as="h2"
				style={{
					color: "#1b1b2f",
					fontFamily: "Manrope, Arial, sans-serif",
					fontSize: "20px",
					fontWeight: 800,
					margin: "0 0 8px",
					letterSpacing: "-0.2px",
				}}
			>
				Réinitialisation du mot de passe
			</Heading>

			<Text
				style={{
					color: "#696b7d",
					fontFamily: "Manrope, Arial, sans-serif",
					fontSize: "14px",
					fontWeight: 500,
					margin: "0 0 24px",
					lineHeight: "1.6",
				}}
			>
				Vous avez demandé la réinitialisation de votre mot de passe. Cliquez
				sur le bouton ci-dessous pour en choisir un nouveau.
			</Text>

			<Section style={{ textAlign: "center", margin: "0 0 24px" }}>
				<EmailButton href={resetLink} color="green">
					Réinitialiser mon mot de passe
				</EmailButton>
			</Section>

			<EmailInfoBox variant="warning">
				Ce lien est valable pendant {expiresInHours} heure
				{expiresInHours > 1 ? "s" : ""}. Passé ce délai, vous devrez faire une
				nouvelle demande.
			</EmailInfoBox>

			<Hr
				style={{
					borderColor: "#e5e6ed",
					margin: "24px 0",
				}}
			/>

			<Text
				style={{
					color: "#9999b3",
					fontFamily: "Manrope, Arial, sans-serif",
					fontSize: "12px",
					fontWeight: 400,
					margin: 0,
					lineHeight: "1.6",
				}}
			>
				Si vous n'avez pas demandé de réinitialisation de mot de passe, ignorez
				cet email. Votre mot de passe restera inchangé.
				<br />
				Si vous pensez avoir reçu cet email par erreur, contactez-nous à{" "}
				<Link
					href="mailto:noreply@quentin-derimais.fr"
					style={{ color: "#2d7adb", textDecoration: "none" }}
				>
					noreply@quentin-derimais.fr
				</Link>
				.
			</Text>
		</EmailLayout>
	);
}
