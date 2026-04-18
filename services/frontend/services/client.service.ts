import type { Client } from "@app/types/client";
import type { CreateClientType, UpdateClientType } from "@schemas/client";
import { CoreService } from "./core.service";

export class ClientService extends CoreService {
	create(client: CreateClientType) {
		return this.post<{ message: string }>("/client/", client);
	}

	browse() {
		return this.get<Client[]>("/client/browse");
	}

	edit(client: UpdateClientType) {
		return this.patch<{ message: string }>("/client/", client);
	}

	remove(id: string) {
		return this.delete<{ message: string }>(`/client/${id}`);
	}
}
