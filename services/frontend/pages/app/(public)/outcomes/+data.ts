import { OutcomeService } from "@services/outcome.service";
import { OutcomeCategoryService } from "@services/outcomeCategory.service";
import { PropertyService } from "@services/property.service";
import { ProviderService } from "@services/provider.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const propertyService = new PropertyService(cookies.auth);
	const outcomeCategoryService = new OutcomeCategoryService(cookies.auth);
	const providerService = new ProviderService(cookies.auth);
	const outcomeService = new OutcomeService(cookies.auth);

	const properties = await propertyService.browseProperties();
	const categories = await outcomeCategoryService.browseCategory();
	const providers = await providerService.browse();
	const outcomes = await outcomeService.browseOutcome();

	console.log(providers);

	return { properties, categories, providers, outcomes };
}
