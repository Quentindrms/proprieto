import type { CreateContractType } from "@schemas/contract";
import { ContractService } from "@services/contract.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(contract: CreateContractType) {
	const authToken = getAuthTokenFromContext();
	try {
		const contractService = new ContractService(authToken);
		return await contractService.create(contract);
	} catch (error) {
		console.trace(error);
	}
}
