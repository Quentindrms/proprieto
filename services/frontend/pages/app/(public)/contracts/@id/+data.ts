export type Data = Awaited<ReturnType<typeof data>>;

import { ContractService } from "@services/contract.service";
import { IncomeService } from "@services/income.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const contractService = new ContractService(cookies.auth);
	const incomesService = new IncomeService(cookies.auth);

	const [contract, incomes] = await Promise.all([
		contractService.details(pageContext.routeParams.id),
		incomesService.contractIncomeDetails(pageContext.routeParams.id),
	]);
	console.log(incomes);
	return { contract, incomes };
}
