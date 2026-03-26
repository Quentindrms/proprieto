import type { CreateProviderType } from "@schemas/provider";
import { ProviderService } from "@services/provider.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(provider: CreateProviderType) {
	const authToken = getAuthTokenFromContext();
	try {
		const providerService = new ProviderService(authToken);
		return providerService.create(provider);
	} catch (error) {
		console.trace(error);
	}
}
