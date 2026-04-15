import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreatePropertyDto, UpdatePropertyDto } from "types/DtoType";

@Injectable()
export class PropertyService {
	async create(property: CreatePropertyDto, userId: string) {
		return await prisma.properties.create({
			data: {
				name: property.name,
				purchasePrice: Number(property.purchasePrice),
				purchaseDate: property.purchaseDate
					? new Date(property.purchaseDate)
					: new Date(),
				userId: userId,
				isDeleted: false,
				typeId: property.type,
			},
		});
	}

	async browseProperties(userId: string) {
		return await prisma.properties.findMany({
			where: {
				userId,
			},
			include: {
				propertyType: true,
			},
		});
	}

	async updateProperty(property: UpdatePropertyDto) {
		const { id, ...data } = property;

		return await prisma.properties.update({
			where: {
				id,
			},
			data: {
				...data,
			},
		});
	}

	async deleteProperty(id: string) {
		return await prisma.properties.update({
			where: {
				id,
			},
			data: {
				isDeleted: true,
			},
		});
	}

	async browseType() {
		return await prisma.propertyTypes.findMany({});
	}
}
