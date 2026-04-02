import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateProviderDto } from "types/DtoType";

@Injectable()
export class ProviderService {
	async create(provider: CreateProviderDto, userId: string) {
		return await prisma.directories.create({
			data: {
				name: provider.name,
				firstName: provider.firstName,
				email: provider.email,
				phone: provider.phone,
				address: provider.address,
				type: "provider",
				users: {
					connect: {
						id: userId,
					},
				},
			},
		});
	}

	async browse(userId) {
		return await prisma.users.findMany({
			where: {
				id: userId,
			},
			select: {
				directory: {
					select: {
						providers: {
							where: {
								status: "active",
							},
						},
					},
				},
			},
		});
	}
}
