import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateClientDto } from "types/DtoType";

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
				clients: {
					create: {
						status: "active",
					},
				},
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async browseClient(userId: string) {
		return await prisma.directories.findMany({
			where: {
				type: "client",
				users: {
					some: {
						id: userId,
					},
				},
			},
		});
	}
}
