import { prisma } from "@libs/DatabaseClient";
import { slugify } from "@libs/slugify";
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
					slug: slugify(property.name),
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

	async deleteProperty(id: string, userId: string) {
		return await prisma.$transaction(async (transaction) => {
			const property = await transaction.properties.findFirstOrThrow({
				where: { id, userId },
				select: {
					contracts: {
						where: {
							propertyId: id,
						},
						select: {
							id: true,
						},
					},
				},
			});

			const contractId = property.contracts.map((contract) => contract.id);

			await transaction.incomes.updateMany({
				where: {
					contractId: { in: contractId },
					isDeleted: false,
				},
				data: {
					isDeleted: true,
				},
			});

			await transaction.outcomes.updateMany({
				where: {
					propertyId: id,
					isDeleted: false,
				},
				data: {
					isDeleted: true,
				},
			});

			await transaction.properties.update({
				where: {
					userId,
					id,
				},
				data: {
					isDeleted: true,
				},
			});
			return true;
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

	async propertyDetails(slug: string, userId: string) {
		return await prisma.properties.findFirst({
			where: {
				userId,
				slug,
			},
		});
	}
}
