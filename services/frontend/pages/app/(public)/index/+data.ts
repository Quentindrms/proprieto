import { IncomeService } from "@services/income.service";
import { OutcomeService } from "@services/outcome.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const outcomeService = new OutcomeService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);

	const monthlyOutcome = await outcomeService.monthlyOutcome();
	const monthlyIncome = await incomeService.monthlyIncome();

	return { monthlyOutcome, monthlyIncome };
}
