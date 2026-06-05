export type Data = Awaited<ReturnType<typeof data>>;

import { ContractService } from "@services/contract.service";
import { IncomeService } from "@services/income.service";
import { OutcomeService } from "@services/outcome.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const propertyService = new PropertyService(cookies.auth);
	const outcomeService = new OutcomeService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);
	const contratService = new ContractService(cookies.auth);

	const [property, contract, income, outcome, propertyType] = await Promise.all(
		[
			propertyService.propertyDetails(pageContext.routeParams.slug),
			contratService.details(pageContext.routeParams.slug),
			incomeService.incomePropertyDetails(pageContext.routeParams.slug),
			outcomeService.outcomePropertyDetails(pageContext.routeParams.slug),
			propertyService.browsePropertyType(),
		],
	);
	console.log("Property : ", property?.propertyType.slug);
	if (!property?.name) {
		console.log(property);
		throw render(404, "Ressource not found");
	}
	return { property, contract, income, outcome, propertyType };
}
