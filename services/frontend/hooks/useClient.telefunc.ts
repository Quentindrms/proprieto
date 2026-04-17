import type { CreateClientType, UpdateClientType } from "@schemas/client";
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

export async function onEdit(client: UpdateClientType) {
	const authToken = getAuthTokenFromContext();
	try {
		const clientService = new ClientService(authToken);
		return await clientService.edit(client);
	} catch (error) {
		console.trace(error);
	}
}

export async function onDelete(id: string) {
	const authToken = getAuthTokenFromContext();
	try {
		const clientService = new ClientService(authToken);
		return await clientService.remove(id);
	} catch (error) {
		console.trace(error);
	}
}
