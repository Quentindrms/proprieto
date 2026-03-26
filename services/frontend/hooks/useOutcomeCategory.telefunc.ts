import { OutcomeCategoryService } from "@services/outcomeCategory.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onBrowseCategory() {
	const authToken = getAuthTokenFromContext();
	try {
		const outcomeCategoryService = new OutcomeCategoryService(authToken);
		return await outcomeCategoryService.browseCategory();
	} catch (error) {
		console.trace(error);
	}
}
