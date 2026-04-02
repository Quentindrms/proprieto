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
				users: {
					some: {
						id: userId,
					},
				},
			},
		});
	}
}
