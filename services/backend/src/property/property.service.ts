import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreatePropertyDto, UpdatePropertyDto } from "types/DtoType";

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

	async updateProperty(property: UpdatePropertyDto) {
		return await prisma.property.update({
			where: {
				id: property.id,
			},
			data: {
				name: property.name,
				purchasePrice: property.purchasePrice,
				purchaseDate: property.purchaseDate,
				sellPrice: property.sellPrice,
				sellDate: property.sellDate,
			},
		});
	}
}
