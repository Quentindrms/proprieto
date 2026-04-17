import { OutcomeService } from "@services/outcome.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const outcomeService = new OutcomeService(cookies.auth);
	const monthlyOutcome = await outcomeService.monthlyProfit();

	return { monthlyOutcome };
}
