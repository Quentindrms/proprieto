import { prisma } from "@libs/DatabaseClient";
import {
	ConflictException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateContractDto } from "@src/dto/contract.dto";

@Injectable()
export class ContractService {
	async create(contract: CreateContractDto) {
		const overLapping = await prisma.contracts.findFirst({
			where: {
				propertyId: contract.propertyId,
				isDeleted: false,
				AND: [
					{ startDate: { lt: contract.endDate } },
					{ endDate: { gt: contract.startDate } },
				],
			},
		});

		if (overLapping) {
			return new ConflictException(
				`Un contrat existe déjà pour la période du ${overLapping.startDate.toLocaleDateString("fr-FR")} au ${overLapping.endDate.toLocaleDateString("fr-FR")}`,
			);
		}

		return await prisma.contracts.create({
			data: {
				startDate: new Date(contract.startDate),
				endDate: new Date(contract.endDate),
				lease: Number(contract.lease),
				clientId: contract.clientId,
				propertyId: contract.propertyId,
			},
		});
	}

	async browse(userId: string) {
		return await prisma.contracts.findMany({
			where: {
				isDeleted: false,
				property: {
					userId: userId,
				},
			},
			select: {
				id: true,
				startDate: true,
				endDate: true,
				lease: true,
				property: true,
				client: {
					select: {
						directory: {
							select: {
								name: true,
								firstName: true,
							},
						},
					},
				},
			},
		});
	}

	async readDetailsByPropertySlug(slug: string, userId: string) {
		const contracts = await prisma.contracts.findMany({
			where: {
				property: {
					slug,
					userId,
					isDeleted: false,
				},
			},
			include: {
				client: {
					select: {
						directory: {
							select: {
								name: true,
								firstName: true,
							},
						},
					},
				},
				incomes: {
					where: {
						isDeleted: false,
						isPaid: true,
						category: {
							slug: "loan",
						},
					},
					select: {
						amount: true,
						isPaid: true,
					},
				},
			},
		});

		return contracts.map(({ incomes, ...contract }) => ({
			...contract,
			client: {
				directory: {
					...contract.client.directory,
					totalIncome: incomes.reduce((sum, income) => sum + income.amount, 0),
				},
			},
		}));
	}

	async readDetails(id: string) {
		try {
			return await prisma.contracts.findFirstOrThrow({
				where: {
					id,
					isDeleted: false,
				},
				include: {
					client: {
						include: {
							directory: {
								omit: {
									userId: true,
								},
							},
						},
					},
					property: {},
				},
			});
		} catch {
			return new NotFoundException();
		}
	}

	async deleteContract(id: string, userId: string) {
		try {
			await prisma.$transaction(async (transaction) => {
				const incomes = await transaction.incomes.findMany({
					where: {
						contractId: id,
					},
				});

				const incomesId = incomes.map((income) => income.id);

				await transaction.incomes.updateMany({
					where: {
						id: { in: incomesId },
						isDeleted: false,
					},
					data: {
						isDeleted: true,
					},
				});

				await transaction.contracts.update({
					where: {
						id,
						property: {
							userId,
						},
					},
					data: {
						isDeleted: true,
					},
				});
			});
		} catch (error) {
			return NotFoundException;
		}
	}
}
