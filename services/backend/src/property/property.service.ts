import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreatePropertyDto, UpdatePropertyDto } from "@src/dto/property.dto";

@Injectable()
export class PropertyService {
	async create(property: CreatePropertyDto, userId: string) {
		try {
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
		} catch (error) {
			console.trace(error);
			return null;
		}
	}

	async browseProperties(userId: string) {
		return await prisma.properties.findMany({
			where: {
				userId,
				isDeleted: false,
			},
			include: {
				propertyType: true,
			},
		});
	}

	async updateProperty(property: UpdatePropertyDto) {
		const { id, type, ...data } = property;
		return await prisma.properties.update({
			where: {
				id,
			},
			data: {
				...data,
				typeId: type,
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

	async countProperties(userId: string) {
		return await prisma.properties.count({
			where: {
				userId,
			},
		});
	}
}
