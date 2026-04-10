import type { IncomeCreationType } from "@schemas/income";
import type { OutcomeCreationType } from "@schemas/outcome";
import { createSignal } from "solid-js";
import type { ZodSafeParseError } from "zod";

export function useFinance() {
	const [createIncome, setCreateIncome] = createSignal<IncomeCreationType>({
		name: "",
		amount: 0,
		contractId: "",
		incomeCategoryId: "",
		isPaid: false,
		frequency: "none",
		paidOn: undefined,
		issueDate: new Date(),
		isRecurring: false,
	});

	const [createOutcome, setCreateOutcome] = createSignal<OutcomeCreationType>({
		name: "",
		amount: 0,
		categoryId: "",
		isPaid: false,
		isRecurring: false,
		propertyId: "",
		providerId: "",
		frequency: "none",
		issueDate: undefined,
		paidOn: undefined,
	});

	const [outcomeErrors, setOutcomeErrors] =
		createSignal<ZodSafeParseError<OutcomeCreationType>>();
	const [incomeErrors, setIncomeErrors] =
		createSignal<ZodSafeParseError<IncomeCreationType>>();

	function handleInputIncome(field: keyof IncomeCreationType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateIncome((prev) => ({
				...prev,
				[field]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	function handleInputOutcome(field: keyof OutcomeCreationType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateOutcome((prev) => ({
				...prev,
				[field]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	function handleCreateIncome() {
		console.log(createIncome());
	}

	function handleCreateOutcome() {
		console.log(createOutcome());
	}

	return {
		handleInputIncome,
		handleInputOutcome,
		handleCreateIncome,
		handleCreateOutcome,
		outcomeErrors,
		incomeErrors,
	};
}
