import type { OutcomeCreationType } from "@schemas/outcome";
import { CoreService } from "./core.service";

export class OutcomeService extends CoreService {
	async createOutcome(outcome: OutcomeCreationType) {
		return await this.post<{ message: string }>("/outcome/", outcome);
	}
}
