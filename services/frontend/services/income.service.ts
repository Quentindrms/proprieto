import type {
	IncomeDetail,
	IncomeType,
	MonthlyIncome,
} from "@app/types/income";
import type { IncomeCreationType, IncomeUpdateType } from "@schemas/income";
import { CoreService } from "./core.service";

export class IncomeService extends CoreService {
	async create(income: IncomeCreationType) {
		return this.post<{ message: string }>("/income/", income);
	}

	async browse() {
		return this.get<IncomeType[]>("/income/browse");
	}

	async getIncome(id: string) {
		return this.get<IncomeDetail>(`/income/${id}`);
	}

	async deleteIncome(id: string) {
		return this.delete<{ message: string }>(`/income/${id}`);
	}

	async updateIncome(income: IncomeUpdateType) {
		return this.put<{ message: string }>(`/income/`, income);
	}

	async monthlyIncome() {
		return this.get<MonthlyIncome>("/income/monthly");
	}
}
