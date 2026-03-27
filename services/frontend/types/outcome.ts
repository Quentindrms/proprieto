type OutcomeFrequency = "none" | "week" | "month" | "year";

export interface Outcome {
	id: string;
	name: string;
	amount: number;
	isRecuring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: OutcomeFrequency;
	property: {
		id: string;
		name: string;
	};
	provider: {
		id: boolean;
		firstName: string;
		name: string;
	};
}
