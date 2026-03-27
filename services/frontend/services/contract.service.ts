import type { CreateContractType } from "@schemas/contract";
import { CoreService } from "./core.service";

export class ContractService extends CoreService {
	create(contract: CreateContractType) {
		return this.post<{ message: string }>("/contract/", contract);
	}
}
