import {
	IncomeCreationSchema,
	type IncomeCreationType,
	IncomeUpdateSchema,
	type IncomeUpdateType,
} from "@schemas/income";
import {
	OutcomeCreationSchema,
	type OutcomeCreationType,
	OutcomeUpdateSchema,
	type OutcomeUpdateType,
} from "@schemas/outcome";
import { createContext, createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import {
	onCreateIncome,
	onCreateOutcome,
	onDeleteFlux,
	onEditIncome,
	onEditOutcome,
} from "./useFinance.telefunc";

export function useFinance() {
	/**
	 * Signals for reactivity
	 */

	const [createIncome, setCreateIncome] = createSignal<IncomeCreationType>({
		name: "",
		amount: 0,
		contractId: "",
		categoryId: "",
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

	const [updateIncome, setUpdateIncome] = createSignal<IncomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isPaid: false,
		issueDate: new Date(),
		categoryId: "",
		contractId: "",
		isRecurring: false,
		paidOn: undefined,
		frequency: undefined,
	});

	const [updateOutcome, setUpdateOutcome] = createSignal<OutcomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isPaid: false,
		isRecurring: false,
		categoryId: "",
		propertyId: "",
		providerId: "",
		frequency: "none",
		issueDate: undefined,
		paidOn: undefined,
	});

	/**
	 * Signal for forms error
	 */

	const [outcomeErrors, setOutcomeErrors] =
		createSignal<ZodSafeParseError<OutcomeCreationType | OutcomeUpdateType>>();
	const [incomeErrors, setIncomeErrors] =
		createSignal<ZodSafeParseError<IncomeCreationType | IncomeUpdateType>>();

	/**
	 * Handle input for creation
	 */

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

	/**
	 * Handle input for update
	 */

	function handleUpdateIncome(field: keyof IncomeUpdateType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateIncome((prev) => ({
				...prev,
				[field]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	function handleUpdateOutcome(field: keyof OutcomeUpdateType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateOutcome((prev) => ({
				...prev,
				[field]: target.type === "checkbox" ? target.checked : target.value,
			}));
		};
	}

	/**
	 * Handle submit event for creation/update/deletion
	 */

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
		if (!response) {
			toast.error(
				"Une erreur est survenue lors de la suppréssion de la ressource",
			);
			return;
		}
		if (response.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la suppréssion de la ressource",
			);
			return;
		}
		toast.success("Ressource supprimée");
		await reload();
		return;
	}

	async function handleEditOutcome() {
		const validate = OutcomeUpdateSchema.safeParse(updateOutcome());
		if (!validate.success) {
			setOutcomeErrors(validate);
			return;
		}
		setOutcomeErrors(undefined);
		const response = await onEditOutcome(updateOutcome());
		if (response.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la modification de la ressource",
			);
			return;
		}
		toast.success("Ressource modifiée");
		return;
	}

	async function handleEditIncome() {
		console.log("EDIT INCOME");
		const validate = IncomeUpdateSchema.safeParse(updateIncome());
		if (!validate) {
			setIncomeErrors(validate);
			return;
		}
		setIncomeErrors(undefined);
		const response = await onEditIncome(updateIncome());
		if (response.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la modification de la ressource",
			);
			return;
		}
		toast.success("Ressource modifiée");
		return;
	}

	return {
		handleInputIncome,
		handleInputOutcome,
		handleCreateIncome,
		handleCreateOutcome,
		handleUpdateIncome,
		handleUpdateOutcome,
		outcomeErrors,
		incomeErrors,
		handleDelete,
		setUpdateIncome,
		setUpdateOutcome,
		updateIncome,
		updateOutcome,
		handleEditIncome,
		handleEditOutcome,
	};
}

export const FinanceContext = createContext<ReturnType<typeof useFinance>>();

export function useFinanceContext() {
	const context = useContext(FinanceContext);
	if (!context) throw new Error("Context absent");
	return context;
}
