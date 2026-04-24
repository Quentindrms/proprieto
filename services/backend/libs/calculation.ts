import type { Incomes, Outcomes } from "generated/prisma/client";

export function calculateTotalAmount(entry: Outcomes[] | Incomes[]) {
	return entry
		.map((outcome) => outcome.amount)
		.reduce((sum, amount) => sum + amount, 0);
}

export function calculateTotalUnpaid(entry: Outcomes[] | Incomes[]) {
	return entry.filter((outcome) => outcome.isPaid === false).length;
}

export function previousMonthGrowth(
	currentMonth: Outcomes[] | Incomes[],
	previousMonth: Outcomes[] | Incomes[],
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
	return Math.round(growth);
}
