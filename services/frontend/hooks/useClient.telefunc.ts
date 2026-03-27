import type { CreateClientType } from "@schemas/client";
import { ClientService } from "@services/client.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(client: CreateClientType) {
	const authToken = getAuthTokenFromContext();
	try {
		const clientService = new ClientService(authToken);
		return await clientService.create(client);
	} catch (error) {
		console.trace(error);
	}
}
