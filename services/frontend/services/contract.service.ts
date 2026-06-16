import type { Contract } from "@app/types/contract";
import type {
	CreateContractType,
	RenewContractType,
	UpdateContractType,
} from "@schemas/contract";
import { CoreService } from "./core.service";

export class ContractService extends CoreService {
	create(contract: CreateContractType) {
		return this.post<{ message: string }>("/contracts/", contract);
	}

	browse() {
		return this.get<Contract[]>("/contracts/browse");
	}

	update(contract: UpdateContractType) {
		return this.put<{ message: string }>("/contracts/", contract);
	}

	renew(contract: RenewContractType) {
		return this.post<{ message: string }>("/contracts/renew", contract);
	}

	detailsByPropertySlug(slug: string) {
		return this.get<Contract[]>(`/contracts/read/${slug}`);
	}

	details(id: string) {
		return this.get<Contract>(`/contracts/details/${id}`);
	}

	deleteContract(id: string) {
		return this.delete<{ success: boolean }>(`/contracts/${id}`);
	}
}
