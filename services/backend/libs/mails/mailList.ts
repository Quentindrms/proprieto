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
		subject: "Votre compte a été crée",
		html: "<p>Hello world !<p>",
	};
}
