import { IncomeService } from "@services/income.service";
import { OutcomeService } from "@services/outcome.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const outcomeService = new OutcomeService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);
	const propertyService = new PropertyService(cookies.auth);

	const monthlyOutcome = await outcomeService.monthlyOutcome();
	const monthlyIncome = await incomeService.monthlyIncome();
	const propertyCount = await propertyService.countProperties();

	return { monthlyOutcome, monthlyIncome, propertyCount };
}
