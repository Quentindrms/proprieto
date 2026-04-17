import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { Outcomes } from "@prisma/browser";
import type { CreateOutcomeDto, UpdateOutcomeDto } from "types/DtoType";

@Injectable()
export class OutcomeService {
	async createOutcome(outcome: CreateOutcomeDto) {
		return await prisma.outcomes.create({
			data: {
				name: outcome.name,
				amount: Number(outcome.amount),
				isRecurring: outcome.isRecurring,
				isPaid: outcome.isPaid,
				issueDate: new Date(outcome.issueDate),
				paidOn: outcome.paidOn ? new Date(outcome.paidOn) : null,
				frequency: outcome.frequency,
				propertyId: outcome.propertyId,
				categoryId: outcome.categoryId,
				providerId: outcome.providerId,

				/** TODO : Implements propertyId, outcomeCategoryId, providersId */
			},
		});
	}

	async browseOutcome(userId: string) {
		return await prisma.outcomes.findMany({
			where: {
				isDeleted: false,
				property: {
					userId,
				},
			},
			select: {
				id: true,
				name: true,
				amount: true,
				isRecurring: true,
				isPaid: true,
				issueDate: true,
				paidOn: true,
				frequency: true,
				isDeleted: true,
				property: {
					select: {
						id: true,
						name: true,
					},
				},
				provider: {
					select: {
						id: true,
						directories: true,
					},
				},
			},
		});
	}

	async getOutcome(outcomeId: string, userId: string) {
		return await prisma.outcomes.findFirst({
			where: {
				id: outcomeId,
				property: {
					userId,
				},
			},
		});
	}

	async delete(outcomeId: string) {
		return await prisma.outcomes.update({
			where: {
				id: outcomeId,
			},
			data: {
				isDeleted: true,
			},
		});
	}

	async update(outcome: UpdateOutcomeDto) {
		const { id, amount, ...data } = outcome;
		return await prisma.outcomes.update({
			where: {
				id,
			},
			data: {
				...data,
				amount: Number(amount),
			},
		});
	}

	async monthlyLoss(userId: string) {
		const now = new Date();
		const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
		const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));

		const startPreviousMonth = new Date(
			Date.UTC(now.getFullYear(), now.getMonth() - 1, 1),
		);
		const endPreviousMonth = new Date(
			Date.UTC(now.getFullYear(), now.getMonth(), 1),
		);

		const currentMonth = await prisma.outcomes.findMany({
			orderBy: [{ issueDate: "desc" }],
			where: {
				issueDate: {
					gte: start,
					lt: end,
				},
				property: {
					userId,
				},
			},
		});

		const previousMonth = await prisma.outcomes.findMany({
			orderBy: [{ issueDate: "desc" }],
			where: {
				issueDate: {
					gte: startPreviousMonth,
					lt: endPreviousMonth,
				},
				property: {
					userId,
				},
			},
		});

		return {
			outcomes: currentMonth,
			sum: this.calculateTotalAmount(currentMonth),
			growth: this.previousMonthGrowth(currentMonth, previousMonth),
			outcomesValue: currentMonth.length,
			unpaidOutcomes: this.calculateTotalUnpaid(currentMonth),
		};
	}

	private calculateTotalAmount(outcomes: Outcomes[]) {
		return outcomes
			.map((outcome) => outcome.amount)
			.reduce((sum, amount) => sum + amount, 0);
	}

	private calculateTotalUnpaid(outcomes: Outcomes[]) {
		return outcomes.filter((outcome) => outcome.isPaid === false).length;
	}

	private previousMonthGrowth(
		currentMonth: Outcomes[],
		previousMonth: Outcomes[],
	) {
		const currentMonthTotal = currentMonth
			.map((outcome) => outcome.amount)
			.reduce((sum, amount) => sum + amount, 0);
		const previousMonthTotal = previousMonth
			.map((outcome) => outcome.amount)
			.reduce((sum, amount) => sum + amount, 0);

		if (previousMonthTotal === 0) {
			return currentMonthTotal > 0 ? 100 : 0;
		}

		const growth =
			((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
		return growth;
	}
}
