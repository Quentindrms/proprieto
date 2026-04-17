export type IncomeFrequency = "none" | "week" | "month" | "year";

export type IncomeDetail = {
	id: string;
	name: string;
	amount: number;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date | null;
	frequency: IncomeFrequency;
	contractId: string;
	categoryId: string;
	isRecurring: boolean;
};

export type IncomeType = {
	id: string;
	name: string;
	amount: number;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: string;
	propertyId: string;
	incomeCategoryId: string;
	contractId: string;
	clientId: string;
	isRecurring: boolean;
};

export type MonthlyIncome = {
	incomes: IncomeType[];
	sum: number;
	growth: number;
	incomesValue: number;
	unpaidIncomes: number;
};
