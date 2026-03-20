import { navigate } from "vike/client/router";
import type { PageContextServer } from "vike/types";

export async function guard(pageContext: PageContextServer) {
	if (!pageContext.isAuthenticated) throw navigate("/auth/login");
}
