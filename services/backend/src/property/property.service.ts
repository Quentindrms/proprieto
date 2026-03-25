import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreatePropertyDto } from "types/DtoType";

@Injectable()
export class PropertyService {
	async create(property: CreatePropertyDto, userId: string) {
		return await prisma.property.create({
			data: {
				name: property.name,
				purchasePrice: Number(property.purchasePrice),
				purchaseDate: property.purchaseDate
					? new Date(property.purchaseDate)
					: new Date(),
				userId: userId,
				isDeleted: false,
			},
		});
	}

	async browseProperties(userId: string) {
		return await prisma.property.findMany({
			where: {
				userId,
				isDeleted: false,
			},
		});
	}
}
