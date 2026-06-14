import type { CreateContractType, UpdateContractType } from "@schemas/contract";
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

export async function onUpdate(contract: UpdateContractType) {
	const authToken = getAuthTokenFromContext();
	try {
		const contractService = new ContractService(authToken);
		return await contractService.update(contract);
	} catch (error) {
		console.trace(error);
	}
}

export async function onDelete(id: string) {
	const authToken = getAuthTokenFromContext();
	try {
		const contractService = new ContractService(authToken);
		return await contractService.deleteContract(id);
	} catch (error) {
		console.trace(error);
	}
}
