import type { ProviderType } from "@app/types/provider";
import type { CreateProviderType } from "@schemas/provider";
import { CoreService } from "./core.service";

export class ProviderService extends CoreService {
	async create(provider: CreateProviderType) {
		return this.post<{ message: string }>("/provider/create", provider);
	}

	async browse() {
		return this.get<ProviderType[]>("/provider/browse");
	}
}
