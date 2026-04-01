import type { IncomeCreationType, IncomeUpdateType } from "@schemas/income";
import { createSignal } from "solid-js";

export function UseIncome() {
	const [createIncome, setCreateIncome] = createSignal<IncomeCreationType>({
		name: "",
		amount: 0,
		isRecurring: false,
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
		propertyId: "",
		incomeCategoryId: "",
		contractId: "",
		clientId: "",
	});

	const [updateIncome, setUpdateIncome] = createSignal<IncomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isRecurring: false,
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
		propertyId: "",
		incomeCategoryId: "",
		contractId: "",
		clientId: "",
	});

	function handleCreateInput(field: keyof IncomeCreationType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateIncome((prev) => ({
				...prev,
				[field]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	function handleUpdateInput(field: keyof IncomeUpdateType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateIncome((prev) => ({
				...prev,
				[field]: target.type === "chekbox" ? target.checked : target.value,
			}));
		};
	}

	function create() {
		console.log(createIncome());
	}

	return {
		handleCreateInput,
		handleUpdateInput,
		create,
	};
}
