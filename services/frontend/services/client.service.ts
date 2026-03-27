import type { Client } from "@app/types/client";
import type { CreateClientType } from "@schemas/client";
import { CoreService } from "./core.service";

export class ClientService extends CoreService {
	create(client: CreateClientType) {
		return this.post<{ message: string }>("/client/", client);
	}

	browse() {
		return this.get<Client[]>("/client/browse");
	}
}
