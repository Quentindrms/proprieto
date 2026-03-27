import { ClientService } from "@services/client.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const clientService = new ClientService(cookies.auth);
	const client = await clientService.browse();

	return { client };
}
