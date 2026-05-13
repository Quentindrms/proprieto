import React from "react";
import { render } from "react-email";
import { RecoverPassword } from "./html/recoverPasswordEMail";
import { createAccountHtml } from "./mailText";

interface mailTemplate {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export function createAccount(userEmail: string): mailTemplate {
	return {
		from: "noreply@quentin-derimais.fr",
		to: userEmail,
		subject: "Bienvenue sur Proprieto — votre compte a été créé",
		html: createAccountHtml(userEmail),
	};
}

export async function recoverPassword(
	userEmail: string,
): Promise<mailTemplate> {
	const renderHtml = await render(
		React.createElement(RecoverPassword, { resetLink: "#" }),
	);
	return {
		from: "noreply@quentin-derimais.fr",
		to: userEmail,
		subject: "Vous avez oublié votre mot de passe",
		html: renderHtml,
	};
}
