import type { ProviderType } from "./provider";

type OutcomeFrequency = "none" | "week" | "month" | "year";

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
