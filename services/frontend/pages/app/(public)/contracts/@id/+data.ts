export type Data = Awaited<ReturnType<typeof data>>;

import { ClientService } from "@services/client.service";
import { ContractService } from "@services/contract.service";
import { IncomeService } from "@services/income.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import { render } from "vike/abort";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const contractService = new ContractService(cookies.auth);
	const incomesService = new IncomeService(cookies.auth);
	const clientService = new ClientService(cookies.auth);

	const [contract, incomes] = await Promise.all([
		contractService.details(pageContext.routeParams.id),
		incomesService.contractIncomeDetails(pageContext.routeParams.id),
	]);

	const client = await clientService.clientDetails(contract.clientId);

	if (!contract.id) {
		throw render(404, "Ressource not found");
	}
	return { contract, incomes, client };
}
