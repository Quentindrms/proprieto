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
