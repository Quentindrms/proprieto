type OutcomeFrequency = "week" | "month" | "year";

export interface Outcome {
	id: string;
	amount: number;
	isRecuring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: OutcomeFrequency;
}
