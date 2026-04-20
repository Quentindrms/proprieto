import type { ProviderType } from "@app/types/provider";
import type { CreateProviderType, UpdateProviderType } from "@schemas/provider";
import { CoreService } from "./core.service";

export class ProviderService extends CoreService {
	async create(provider: CreateProviderType) {
		return this.post<{ message: string }>("/provider/create", provider);
	}

	async browse() {
		return this.get<ProviderType[]>("/provider/browse");
	}

	async edit(provider: UpdateProviderType) {
		return this.put<{ message: string }>("/provider/", provider);
	}

	async remove(providerId: string) {
		return this.delete<{ message: string }>(`/provider/${providerId}`);
	}
}
