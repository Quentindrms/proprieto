import { Hr, Link, Text } from "react-email";
import { EmailHeading } from "./components/EmailHeading";
import { EmailInfoBox } from "./components/EmailInfoBox";
import { EmailLayout } from "./components/EmailLayout";
import { EmailText } from "./components/EmailText";

export function UpdatePassword() {
	return (
		<EmailLayout preview="Votre mot de passe a été modifié">
			<EmailHeading component="h2">
				Votre mot de passe a été modifié
			</EmailHeading>

			<EmailText>
				Votre mot de passe Proprieto a bien été modifié. Si vous êtes à
				l'origine de cette action, vous n'avez rien d'autre à faire.
			</EmailText>

			<EmailInfoBox variant="warning">
				Si vous n'avez pas effectué cette modification, votre compte est
				peut-être compromis. Contactez-nous immédiatement.
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
				Pour toute question, contactez-nous à{" "}
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
