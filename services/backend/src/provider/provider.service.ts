import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateProviderDto } from "types/DtoType";

@Injectable()
export class ProviderService {
	async create(provider: CreateProviderDto, userId: string) {
		return await prisma.directories.create({
			data: {
				address: provider.address,
				email: provider.email,
				firstName: provider.firstName,
				name: provider.name,
				phone: provider.phone,
				type: "provider",
				providers: {
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

	async browse(directoryId: string) {
		return await prisma.directories.findMany({
			where: {
				type: "provider",
				id: directoryId,
			},
			include: {
				providers: true,
			},
		});
	}
}
