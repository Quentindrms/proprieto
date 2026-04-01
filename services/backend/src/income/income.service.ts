import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateIncomeDto } from "types/DtoType";

@Injectable()
export class IncomeService {
	async create(income: CreateIncomeDto) {
		return await prisma.income.create({
			data: {
				name: income.name,
				amount: Number(income.amount),
				isRecurring: income.isReccuring,
				isPaid: income.isPaid,
				issueDate: new Date(income.issueDate),
				paidOn: new Date(income.paidOn),
				frequency: income.frequency,

				propertyId: income.propertyId,
				incomeCategoryId: income.incomeCategoryId,
				clientId: income.clientId,
			},
		});
	}
}
