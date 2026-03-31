import type { IncomeCreationType } from "@schemas/income";
import { IncomeService } from "@services/income.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(income: IncomeCreationType) {
	const auth = getAuthTokenFromContext();

	try {
		const incomeService = new IncomeService(auth);
		return await incomeService.create(income);
	} catch (error) {
		console.trace(error);
	}
}
