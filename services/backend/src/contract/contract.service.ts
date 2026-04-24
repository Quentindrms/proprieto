import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateContractDto } from "@src/dto/contract.dto";

@Injectable()
export class ContractService {
	async create(contract: CreateContractDto, userId: string) {
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
			},
		});
	}
}
