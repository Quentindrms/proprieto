import { ContractService } from "@services/contract.service";
import { IncomeService } from "@services/income.service";
import { IncomeCategoryService } from "@services/incomeCategory.service";
import { OutcomeService } from "@services/outcome.service";
import { OutcomeCategoryService } from "@services/outcomeCategory.service";
import { PropertyService } from "@services/property.service";
import { ProviderService } from "@services/provider.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const outcomeService = new OutcomeService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);
	const incomeCategoryService = new IncomeCategoryService(cookies.auth);
	const outcomeCategoryService = new OutcomeCategoryService(cookies.auth);
	const contractService = new ContractService(cookies.auth);
	const propertyService = new PropertyService(cookies.auth);
	const providerService = new ProviderService(cookies.auth);

	const outcomeCategories = await outcomeCategoryService.browseCategory();
	const incomeCategories = await incomeCategoryService.browseCategories();

	const properties = await propertyService.browseProperties();

	const providers = await providerService.browse();

	const outcomeList = await outcomeService.browseOutcome();
	const incomeList = await incomeService.browse();

	const contractList = await contractService.browse();

	return {
		outcomeCategories,
		incomeCategories,
		outcomeList,
		incomeList,
		contractList,
		properties,
		providers,
	};
}
