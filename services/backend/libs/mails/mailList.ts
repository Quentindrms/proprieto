import React from "react";
import { render } from "react-email";
import { NewUser } from "./html/newUserPasswordEmail";
import { RecoverPassword } from "./html/recoverPasswordEMail";

interface mailTemplate {
	from: string;
	to: string;
	subject: string;
	html: string;
}

export async function createAccount(userEmail: string): Promise<mailTemplate> {
	const renderHtml = await render(
		React.createElement(NewUser, {
			loginUrl: "https://proprieto.quentin-derimais.fr/auth/login",
		}),
	);
	return {
		from: "noreply@quentin-derimais.fr",
		to: userEmail,
		subject: "Bienvenue sur Proprieto — votre compte a été créé",
		html: renderHtml,
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
