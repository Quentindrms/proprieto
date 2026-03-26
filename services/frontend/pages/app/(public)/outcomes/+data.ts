import { OutcomeCategoryService } from "@services/outcomeCategory.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const propertyService = new PropertyService(cookies.auth);
	const outcomeCategoryService = new OutcomeCategoryService(cookies.auth);
	const properties = await propertyService.browseProperties();
	const categories = await outcomeCategoryService.browseCategory();

	return { properties, categories };
}
