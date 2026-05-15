import React from "react";
import { render } from "react-email";
import { NewUser } from "./html/newUserPasswordEmail";
import { RecoverPassword } from "./html/recoverPasswordEMail";
import { UpdatePassword } from "./html/updatePassword";

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
	link: string,
): Promise<mailTemplate> {
	const renderHtml = await render(
		React.createElement(RecoverPassword, { resetLink: link }),
	);
	return {
		from: "noreply@quentin-derimais.fr",
		to: userEmail,
		subject: "Vous avez oublié votre mot de passe",
		html: renderHtml,
	};
}

export async function updatePassword(userEmail: string): Promise<mailTemplate> {
	const renderHtml = await render(React.createElement(UpdatePassword));
	return {
		from: "noreply@quentin-derimais.fr",
		to: userEmail,
		subject: "Votre mot de passe a été modifié",
		html: renderHtml,
	};
}
