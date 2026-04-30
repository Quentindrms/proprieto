import { getUserFromPageContext, setAuthCookie } from "@utils/cookie";
import { redirect } from "vike/abort";
import type { PageContextServer } from "vike/types";

export async function onCreatePageContext(pageContext: PageContextServer) {
	try {
		const { user, token } = await getUserFromPageContext(pageContext);
		if (!user) throw new Error("No user found");
		setAuthCookie(pageContext.fastify.reply, token);
		pageContext.user = user;
		pageContext.isAuthenticated = Boolean(user);
	} catch {
		pageContext.fastify.reply.clearCookie("auth", { path: "/" });
		pageContext.user = undefined;
		throw redirect("/auth/login/");
	}
}
