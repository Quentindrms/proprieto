import {
	calculateTotalAmount,
	calculateTotalUnpaid,
	previousMonthGrowth,
} from "@libs/calculation";
import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateIncomeDto, UpdateIncomeDto } from "@src/dto/income.dto";

@Injectable()
export class IncomeService {
	async create(income: CreateIncomeDto) {
		return await prisma.incomes.create({
			data: {
				name: income.name,
				amount: Number(income.amount),
				isPaid: income.isPaid,
				issueDate: new Date(income.issueDate),
				paidOn: income.paidOn ? new Date(income.paidOn) : undefined,
				frequency: income.frequency,
				contractId: income.contractId,
				categoryId: income.categoryId,
			},
		});
	}

	async browse(userId: string) {
		return await prisma.incomes.findMany({
			where: {
				isDeleted: false,
				contract: {
					property: {
						userId,
					},
				},
			},
		});
	}

	async get(incomeId: string) {
		return await prisma.incomes.findFirst({
			where: {
				id: incomeId,
			},
		});
	}

	async delete(incomeId: string) {
		return await prisma.incomes.update({
			where: {
				id: incomeId,
			},
			data: {
				isDeleted: true,
			},
		});
	}

	async update(income: UpdateIncomeDto) {
		return await prisma.incomes.update({
			where: {
				id: income.id,
			},
			data: {
				amount: income.amount,
				categoryId: income.categoryId,
				contractId: income.contractId,
				frequency: income.frequency,
				isDeleted: false,
				isPaid: income.isPaid,
				issueDate: income.issueDate,
				name: income.name,
				paidOn: income.paidOn,
			},
		});
	}

	async monthlyProfit(userId: string) {
		const now = new Date();
		const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
		const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));

		const startPreviousMonth = new Date(
			Date.UTC(now.getFullYear(), now.getMonth() - 1, 1),
		);
		const endPreviousMonth = new Date(
			Date.UTC(now.getFullYear(), now.getMonth(), 1),
		);

		const currentMonth = await prisma.incomes.findMany({
			orderBy: [{ issueDate: "asc" }],
			where: {
				issueDate: {
					gte: start,
					lt: end,
				},
				contract: {
					property: {
						userId,
					},
				},
			},
		});

		const previousMonth = await prisma.incomes.findMany({
			orderBy: [{ issueDate: "asc" }],
			where: {
				issueDate: {
					gte: startPreviousMonth,
					lt: endPreviousMonth,
				},
				contract: {
					property: {
						userId,
					},
				},
			},
		});

		return {
			incomes: currentMonth,
			sum: calculateTotalAmount(currentMonth),
			growth: previousMonthGrowth(currentMonth, previousMonth),
			incomesValue: currentMonth.length,
			unpaidIncomes: calculateTotalUnpaid(currentMonth),
		};
	}

	async propertyIncomeDetails(slug: string, userId: string) {
		try {
			return await prisma.incomes.findMany({
				where: {
					contract: {
						property: {
							slug,
							userId,
						},
					},
				},
			});
		} catch (error) {
			console.trace(error);
			return;
		}
	}
}
