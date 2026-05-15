import { AuthService } from "@services/auth.service";
import { ClientService } from "@services/client.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const authSevice = new AuthService();
	const response = await authSevice.verifyRecoverToken(
		pageContext.routeParams.token,
	);

	return { response };
}
