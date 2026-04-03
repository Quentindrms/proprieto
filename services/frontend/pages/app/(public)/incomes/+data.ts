import { IncomeCategoryService } from "@services/incomeCategory.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const incomeCategoryService = new IncomeCategoryService(cookies.auth);
	const propertyService = new PropertyService(cookies.auth);

	const income = await incomeCategoryService.browseCategories();
	const properties = await propertyService.browseProperties();
	return { income, properties };
}
