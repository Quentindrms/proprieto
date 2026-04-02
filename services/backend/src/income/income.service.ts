import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateIncomeDto } from "types/DtoType";

@Injectable()
export class IncomeService {
	async create(income: CreateIncomeDto) {
		return await prisma.incomes.create({
			data: {
				name: income.name,
				amount: Number(income.amount),
				isRecurring: income.isReccuring,
				isPaid: income.isPaid,
				issueDate: new Date(income.issueDate),
				paidOn: income.paidOn ? new Date(income.paidOn) : undefined,
				frequency: income.frequency,

				propertyId: income.propertyId,
				categoryId: income.incomeCategoryId,
				clientId: income.clientId,
				contractId: income.contractId,
			},
		});
	}
}
