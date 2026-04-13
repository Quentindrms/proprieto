import type { IncomeType } from "@app/types/income";
import type { IncomeCreationType } from "@schemas/income";
import { CoreService } from "./core.service";

export class IncomeService extends CoreService {
	async create(income: IncomeCreationType) {
		return this.post<{ message: string }>("/income/", income);
	}

	async browse() {
		return this.get<IncomeType[]>("/income/browse");
	}

	async getIncome(id: string) {
		return this.get<IncomeType>(`/income/${id}`);
	}
}
