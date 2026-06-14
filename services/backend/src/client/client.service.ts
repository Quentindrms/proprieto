import { prisma } from "@libs/DatabaseClient";
import { Injectable, NotFoundException } from "@nestjs/common";
import type { CreateClientDto, UpdateClientDto } from "@src/dto/client.dto";

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

	async clientDetails(clientId: string, userId: string) {
		try {
			return await prisma.directories.findFirstOrThrow({
				where: {
					userId,
					type: "client",
					isDeleted: false,
					clients: {
						some: {
							id: clientId,
						},
					},
				},
				include: {
					clients: {},
				},
			});
		} catch {
			return NotFoundException;
		}
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
