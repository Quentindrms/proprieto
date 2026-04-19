import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateProviderDto, UpdateProviderDto } from "types/DtoType";

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
				userId,
				providers: {
					create: {
						status: "active",
					},
				},
			},
		});
	}

	async browse(userId: string) {
		return await prisma.providers.findMany({
			where: {
				status: "active",
				directories: {
					userId,
				},
			},
			include: {
				directories: true,
			},
		});
	}

	async edit(userId: string, provider: UpdateProviderDto) {
		const { id, ...data } = provider;

		return await prisma.directories.update({
			where: {
				userId,
				id,
			},
			data,
		});
	}

	async remove(userId, providerId) {
		return await prisma.directories.update({
			where: {
				userId,
				id: providerId,
			},
			data: {
				isDeleted: true,
			},
		});
	}
}
