import type { IncomeCategory } from "@app/types/incomeCategory";
import { CoreService } from "./core.service";

export class IncomeCategoryService extends CoreService {
	async browseCategories() {
		return await this.get<IncomeCategory[]>("/income-category/browse");
	}
}
