import type { Contract } from "@app/types/contract";
import type { CreateContractType } from "@schemas/contract";
import { CoreService } from "./core.service";

export class ContractService extends CoreService {
	create(contract: CreateContractType) {
		return this.post<{ message: string }>("/contracts/", contract);
	}

	browse() {
		return this.get<Contract[]>("/contracts/browse");
	}
}
