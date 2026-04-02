export type Data = Awaited<ReturnType<typeof data>>;

import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const propertyService = new PropertyService(cookies.auth);
	const propertyTypes = await propertyService.browsePropertyType();
	const properties = await propertyService.browseProperties();
	console.log(properties);
	return { properties, propertyTypes };
}
