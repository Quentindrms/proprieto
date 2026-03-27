import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateProviderDto } from "types/DtoType";

@Injectable()
export class ProviderService {
	async create(provider: CreateProviderDto, userId: string) {
		return await prisma.provider.create({
			data: {
				name: provider.name,
				firstName: provider.firstName,
				address: provider.address,
				email: provider.email,
				phone: provider.phone,
				userId,
			},
		});
	}

	async browse(userId) {
		return await prisma.provider.findMany({
			where: {
				userId,
			},
		});
	}
}
