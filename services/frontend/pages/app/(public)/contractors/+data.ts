export type Data = Awaited<ReturnType<typeof data>>;

import { ProviderService } from "@services/provider.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const providerService = new ProviderService(cookies.auth);
	const providers = await providerService.browse();
	console.log(providers);

	return { providers };
}
