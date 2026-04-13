import { IncomeCreationSchema, type IncomeCreationType } from "@schemas/income";
import {
	OutcomeCreationSchema,
	type OutcomeCreationType,
} from "@schemas/outcome";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import {
	onCreateIncome,
	onCreateOutcome,
	onDeleteFlux,
} from "./useFinance.telefunc";

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

	async function handleCreateIncome() {
		const validate = IncomeCreationSchema.safeParse(createIncome());
		console.log(createIncome());
		if (!validate.success) {
			setIncomeErrors(validate);
			return;
		}
		setIncomeErrors(undefined);
		const response = await onCreateIncome(createIncome());
		if (response.message !== "success") {
			toast.error("Une erreur est survenue lors de la création du revenu");
			return;
		}
		toast.success("Revenu crée");
		await reload();
		return;
	}

	async function handleCreateOutcome() {
		const validate = OutcomeCreationSchema.safeParse(createOutcome());
		console.log(createOutcome());
		if (!validate.success) {
			setOutcomeErrors(validate);
			return;
		}
		setOutcomeErrors(undefined);
		const response = await onCreateOutcome(createOutcome());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création de la dépense");
			return;
		}
		toast.success("Dépense crée");
		await reload();
		return;
	}

	async function handleDelete(id: string, type: "income" | "outcome") {
		const response = await onDeleteFlux(id, type);
		if (response?.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la suppréssion de la ressource",
			);
			return;
		}
		toast.success("Ressource supprimée");
		return;
	}

	return {
		handleInputIncome,
		handleInputOutcome,
		handleCreateIncome,
		handleCreateOutcome,
		outcomeErrors,
		incomeErrors,
		handleDelete,
	};
}
