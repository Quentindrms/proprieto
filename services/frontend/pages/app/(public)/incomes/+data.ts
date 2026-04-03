import { ContractService } from "@services/contract.service";
import { IncomeService } from "@services/income.service";
import { IncomeCategoryService } from "@services/incomeCategory.service";
import { PropertyService } from "@services/property.service";
import { getCookiesFromPageContext } from "@utils/cookie";
import type { PageContextServer } from "vike/types";

export type Data = Awaited<ReturnType<typeof data>>;

export async function data(pageContext: PageContextServer) {
	const cookies = getCookiesFromPageContext(pageContext);

	const incomeCategoryService = new IncomeCategoryService(cookies.auth);
	const incomeService = new IncomeService(cookies.auth);
	const contractService = new ContractService(cookies.auth);

	const incomeCategories = await incomeCategoryService.browseCategories();
	const incomeList = await incomeService.browse();
	const contracts = await contractService.browse();

	return { incomeCategories, contracts };
}
