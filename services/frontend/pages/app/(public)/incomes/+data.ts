import { IncomeCategoryService } from "@services/incomeCategory.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const incomeCategoryService = new IncomeCategoryService(cookies.auth);

	const income = await incomeCategoryService.browseCategories();

	return { income };
}
