export type Data = Awaited<ReturnType<typeof data>>;

import { ClientService } from "@services/client.service";
import { ContractService } from "@services/contract.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const contractService = new ContractService(cookies.auth);
	const propertyService = new PropertyService(cookies.auth);
	const clientService = new ClientService(cookies.auth);

	const contracts = await contractService.browse();
	const properties = await propertyService.browseProperties();
	const clients = await clientService.browse();

	console.log(clients);

	return { contracts, properties, clients };
}
