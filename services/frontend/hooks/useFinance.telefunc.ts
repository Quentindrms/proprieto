import type { IncomeCreationType } from "@schemas/income";
import type { OutcomeCreationType } from "@schemas/outcome";
import { IncomeService } from "@services/income.service";
import { OutcomeService } from "@services/outcome.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreateOutcome(outcome: OutcomeCreationType) {
	try {
		const token = getAuthTokenFromContext();
		const outcomeService = new OutcomeService(token);
		return await outcomeService.createOutcome(outcome);
	} catch (error) {
		console.trace(error);
	}
}

export async function onCreateIncome(income: IncomeCreationType) {
	try {
		const token = getAuthTokenFromContext();
		const incomeService = new IncomeService(token);
		return await incomeService.create(income);
	} catch (error) {
		console.trace(error);
		return { message: "error" };
	}
}

export async function onGetFluxDetails(id: string, type: "income" | "outcome") {
	const token = getAuthTokenFromContext();
	try {
		if (type === "income") {
			const incomeService = new IncomeService(token);
			return incomeService.getIncome(id);
		} else if (type === "outcome") {
			const outcomeService = new OutcomeService(token);
			return outcomeService.getOutcome(id);
		}
	} catch (error) {
		console.trace(error);
	}
}

export async function onDeleteFlux(id: string, type: "income" | "outcome") {
	const token = getAuthTokenFromContext();
	try {
		if (type === "income") {
			const income = new IncomeService(token);
			return income.deleteIncome(id);
		} else if (type === "outcome") {
			const outcome = new OutcomeService(token);
			return outcome.deleteOutcome(id);
		}
	} catch (error) {
		console.trace(error);
	}
}
