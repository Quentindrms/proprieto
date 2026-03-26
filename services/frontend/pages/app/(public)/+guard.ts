import { redirect } from "vike/abort";
import type { PageContextServer } from "vike/types";

export async function guard(pageContext: PageContextServer) {
	if (!pageContext.isAuthenticated) throw redirect("/auth/login");
}
