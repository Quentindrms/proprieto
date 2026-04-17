import type {
	MonthlyOutcome,
	Outcome,
	OutcomeDetail,
} from "@app/types/outcome";
import type { OutcomeCreationType, OutcomeUpdateType } from "@schemas/outcome";
import { CoreService } from "./core.service";

export class OutcomeService extends CoreService {
	async createOutcome(outcome: OutcomeCreationType) {
		return await this.post<{ message: string }>("/outcome/", outcome);
	}

	async browseOutcome() {
		return await this.get<Outcome[]>("/outcome/browse");
	}

	async getOutcome(id: string) {
		return await this.get<OutcomeDetail>(`/outcome/${id}`);
	}

	async deleteOutcome(id: string) {
		return await this.delete<{ message: string }>(`/outcome/${id}`);
	}

	async updateOutcome(outcome: OutcomeUpdateType) {
		return await this.put<{ message: string }>("/outcome/", outcome);
	}

	async monthlyProfit() {
		return await this.get<MonthlyOutcome>("/outcome/monthly");
	}
}
