import type { Outcome } from "@app/types/outcome";
import type { OutcomeCreationType, OutcomeUpdateType } from "@schemas/outcome";
import { createSignal } from "solid-js";

export function useOutcome() {
	const [createOutcome, setCreateOutcome] = createSignal<OutcomeCreationType>({
		name: "",
		amount: 0,
		isRecuring: false,
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "month",
	});

	const [updateOutcome, setUpdateOutcome] = createSignal<OutcomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isRecuring: false,
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "month",
	});

	function handleCreateInput(key: keyof OutcomeCreationType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateOutcome((prev) => ({
				...prev,
				[key]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	function handleUpdateInput(key: keyof OutcomeUpdateType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateOutcome((prev) => ({
				...prev,
				[key]: target.value,
			}));
		};
	}

	function create() {
		console.log(createOutcome());
	}

	function update() {
		console.log(updateOutcome());
	}

	return {
		create,
		update,
		handleCreateInput,
		handleUpdateInput,
	};
}
