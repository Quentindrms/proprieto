import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateOutcomeDto } from "types/DtoType";

@Injectable()
export class OutcomeService {
	async createOutcome(outcome: CreateOutcomeDto) {
		return await prisma.outcome.create({
			data: {
				name: outcome.name,
				amount: Number(outcome.amount),
				isReccuring: outcome.isRecuring,
				isPaid: outcome.isPaid,
				issueDate: new Date(outcome.issueDate),
				paidOn: outcome.paidOn ? new Date(outcome.paidOn) : null,
				frequency: outcome.frequency,
				propertyId: outcome.propertyId,
				outcomeCategoryId: outcome.categoryId,
				providerId: outcome.providerId,

				/** TODO : Implements propertyId, outcomeCategoryId, providersId */
			},
		});
	}

	async browseOutcome(userId: string) {
		return await prisma.outcome.findMany({
			where: {
				property: {
					userId,
				},
			},
			select: {
				name: true,
				amount: true,
				isReccuring: true,
				isPaid: true,
				issueDate: true,
				paidOn: true,
				frequency: true,
				property: {
					select: {
						id: true,
						name: true,
					},
				},
				provider: {
					select: {
						id: true,
						firstName: true,
						name: true,
					},
				},
			},
		});
	}
}
