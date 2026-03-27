import type { CreateClientType } from "@schemas/client";
import { CoreService } from "./core.service";

export class ClientService extends CoreService {
	create(client: CreateClientType) {
		return this.post<{ message: "success" }>("/client/", client);
	}
}
