import type { ProviderType } from "./provider";

type OutcomeFrequency = "none" | "week" | "month" | "year";

export type OutcomeDetail = {
	id: string;
	name: string;
	amount: number;
	isRecurring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date | null;
	frequency: OutcomeFrequency;
	propertyId: string;
	providerId: string;
	categoryId: string;
};

export interface Outcome {
	id: string;
	name: string;
	amount: number;
	isRecurring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: OutcomeFrequency;
	property: {
		id: string;
		name: string;
	};
	provider: ProviderType;
}

export interface MonthlyOutcome {
	outcomes: Outcome[];
	sum: number;
	outcomesValue: number;
	unpaidOutcomes: number;
	growth: number;
}
