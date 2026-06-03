export type Data = Awaited<ReturnType<typeof data>>;

import { IncomeService } from "@services/income.service";
import { OutcomeService } from "@services/outcome.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const propertyService = new PropertyService(cookies.auth);
	const outcomeService = new OutcomeService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);

	const [property, income] = await Promise.all([
		propertyService.propertyDetails(pageContext.routeParams.slug),
		incomeService.incomePropertyDetails(pageContext.routeParams.slug),
	]);

	return { property, income };
}
