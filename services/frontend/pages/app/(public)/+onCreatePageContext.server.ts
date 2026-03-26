import { getUserFromPageContext, setAuthCookie } from "@utils/cookie";
import { redirect } from "vike/abort";
import type { PageContextServer } from "vike/types";

export async function onCreatePageContext(pageContext: PageContextServer) {
	try {
		const { user, token } = await getUserFromPageContext(pageContext);
		console.log(`USER : ${user} TOKEN : ${token}`);
		if (!user) throw new Error("No user found");
		setAuthCookie(pageContext.fastify.reply, token);
		pageContext.user = user;
		pageContext.isAuthenticated = Boolean(user);
	} catch {
		/** TODO : IMPLEMENTS LOGOUT AND INVALIDE COOKIE DELETION */
		pageContext.user = undefined;
		throw redirect("/auth/login/");
	}
}
