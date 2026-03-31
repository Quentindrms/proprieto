import type { IncomeCreationType } from "@schemas/income";
import { CoreService } from "./core.service";

export class IncomeService extends CoreService {
	async create(income: IncomeCreationType) {
		return this.post<{ message: string }>("/income/", income);
	}
}
