import type { CreateProviderType, UpdateProviderType } from "@schemas/provider";
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

export async function onEdit(provider: UpdateProviderType) {
	const authToken = getAuthTokenFromContext();
	try {
		const providerService = new ProviderService(authToken);
		return providerService.edit(provider);
	} catch (error) {
		console.trace(error);
	}
}

export async function onRemove(providerId: string) {
	const authToken = getAuthTokenFromContext();
	try {
		const providerService = new ProviderService(authToken);
		return providerService.remove(providerId);
	} catch (error) {
		console.trace(error);
	}
}
