import type { outcomeCategory } from "@app/types/outcomeCategory";
import { CoreService } from "./core.service";

export class OutcomeCategoryService extends CoreService {
	browseCategory() {
		return this.get<outcomeCategory[]>("");
	}
}
