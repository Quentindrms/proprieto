import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateOutcomeDto } from "types/DtoType";

@Injectable()
export class OutcomeService {
	async createOutcome(outcome: CreateOutcomeDto) {
		return await prisma.outcome.create({
			data: {
				name: outcome.name,
				amount: outcome.amount,
				isReccuring: outcome.isRecuring,
				isPaid: outcome.isPaid,
				issueDate: new Date(outcome.issueDate),
				paidOn: outcome.paidOn ? new Date(outcome.paidOn) : null,
				frequency: outcome.frequency,
				propertyId: "",
				outcomeCategoryId: "",
				providersId: "",
				/** TODO : Implements propertyId, outcomeCategoryId, providersId */
			},
		});
	}
}
