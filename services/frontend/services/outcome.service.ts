import type { Outcome, OutcomeDetail } from "@app/types/outcome";
import type { OutcomeCreationType } from "@schemas/outcome";
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
}
