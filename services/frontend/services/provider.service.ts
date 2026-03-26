import type { CreateProviderType } from "@schemas/provider";
import { CoreService } from "./core.service";

export class ProviderService extends CoreService {
	async create(provider: CreateProviderType) {
		return this.post<{ message: string }>("/providers/", provider);
	}
}
