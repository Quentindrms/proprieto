import { CoreService } from "./core.service";

export class IncomeCategoryService extends CoreService {
	browseCategories() {
		this.get("");
	}
}
