import type { OutcomeCreationType } from "@schemas/outcome";
import { OutcomeService } from "@services/outcome.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(outcome: OutcomeCreationType) {
	const token = getAuthTokenFromContext();

	const outcomeService = new OutcomeService(token);
	return await outcomeService.createOutcome(outcome);
}
