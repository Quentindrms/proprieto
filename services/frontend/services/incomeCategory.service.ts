import { CoreService } from "./core.service";

export class IncomeCategoryService extends CoreService {
	browseCategories() {
		return this.get("/income-category/browse");
	}
}
