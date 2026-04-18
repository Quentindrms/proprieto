import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateClientDto, UpdateClientDto } from "types/DtoType";

@Injectable()
export class ClientService {
	async createClient(client: CreateClientDto, userId: string) {
		return await prisma.directories.create({
			data: {
				name: client.name,
				firstName: client.firstName,
				email: client.email,
				address: client.address,
				phone: client.phone,
				type: "client",
				userId,
				clients: {
					create: {
						status: "active",
					},
				},
			},
		});
	}

	async browseClient(userId: string) {
		return await prisma.directories.findMany({
			where: {
				userId,
				type: "client",
				isDeleted: false,
			},
			include: {
				clients: true,
			},
		});
	}

	async editClient(userId: string, client: UpdateClientDto) {
		const { id, ...data } = client;
		return await prisma.directories.update({
			where: {
				userId,
				id,
			},
			data: {
				name: data.name,
				firstName: data.firstName,
				address: data.address,
				email: data.email,
				phone: data.phone,
			},
		});
	}

	async deleteClient(userId: string, clientId) {
		return await prisma.directories.update({
			where: {
				userId,
				id: clientId,
			},
			data: {
				isDeleted: true,
			},
		});
	}
}
