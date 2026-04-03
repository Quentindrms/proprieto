import {
	IncomeCreationSchema,
	type IncomeCreationType,
	type IncomeUpdateType,
} from "@schemas/income";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import type { ZodSafeParseError, ZodSafeParseResult } from "zod";
import { onCreate } from "./useIncome.telefunc";

export function UseIncome() {
	const [createIncome, setCreateIncome] = createSignal<IncomeCreationType>({
		name: "",
		amount: 0,
		isRecurring: "",
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
		propertyId: "",
		incomeCategoryId: "",
		contractId: "",
	});

	const [updateIncome, setUpdateIncome] = createSignal<IncomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isRecurring: "",
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
		propertyId: "",
		incomeCategoryId: "",
		contractId: "",
	});

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<IncomeCreationType | IncomeUpdateType>>();

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

	async function create() {
		console.log(createIncome());
		const validate = IncomeCreationSchema.safeParse(createIncome());
		if (!validate.success) {
			console.error(validate.error);
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onCreate(createIncome());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création de la dépense");
			return;
		}
		toast.success("Dépense crée");
	}

	return {
		handleCreateInput,
		handleUpdateInput,
		create,
		formError,
	};
}
