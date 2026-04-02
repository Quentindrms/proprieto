import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateContractDto } from "types/DtoType";

@Injectable()
export class ContractService {
	async create(contract: CreateContractDto) {
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
					userId,
				},
			},
		});
	}
}
