import { ContractService } from "@services/contract.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const contractService = new ContractService(cookies.auth);

	const [contract] = await Promise.all([contractService.details("slug")]);
	console.log(contract);

	return { contract };
}
