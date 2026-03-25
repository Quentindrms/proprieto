import type { Outcome } from "@app/types/outcome";
import {
	OutcomeCreationSchema,
	type OutcomeCreationType,
	type OutcomeUpdateType,
} from "@schemas/outcome";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onCreate } from "./useOutcome.telefunc";

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

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<OutcomeCreationType | OutcomeUpdateType>>();

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

	async function create() {
		const validate = OutcomeCreationSchema.safeParse(createOutcome());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onCreate(createOutcome());
		if (response.message !== "success") {
			toast.error("Une erreur est survenue lors de la  création de la dépense");
			return;
		}
		toast.success("Dépense crée");
		await reload();
	}

	function update() {
		console.log(updateOutcome());
	}

	return {
		create,
		update,
		handleCreateInput,
		handleUpdateInput,
		formError,
	};
}
