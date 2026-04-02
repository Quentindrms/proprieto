import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateProviderDto } from "types/DtoType";

@Injectable()
export class ProviderService {
	async create(provider: CreateProviderDto, userId: string) {
		return await prisma.users.update({
			where: {
				id: userId,
			},
			data: {
				directory: {
					create: {
						name: provider.name,
						firstName: provider.firstName,
						address: provider.address,
						email: provider.email,
						phone: provider.phone,
						providers: {
							create: {
								status: "active",
							},
						},
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
