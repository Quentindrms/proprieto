import type { IncomeType } from "@app/types/income";
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
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
		incomeCategoryId: "",
		contractId: "",
	});

	const [updateIncome, setUpdateIncome] = createSignal<IncomeUpdateType>({
		id: "",
		name: "",
		amount: 0,
		isPaid: false,
		issueDate: new Date(),
		paidOn: new Date(),
		frequency: "",
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
		const validate = IncomeCreationSchema.safeParse(createIncome());
		if (!validate.success) {
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

	function listIncomes(incomes: IncomeType[]) {
		return incomes.map((income) => [
			income.name,
			String(income.amount),
			income.isPaid ? "Payé" : "En attente de paiement",
			new Date(income.issueDate).toLocaleDateString("fr-FR"),
		]);
	}

	function listCols() {
		return ["Nom", "Montant", "Statut", "Date d'émission"];
	}

	function getMonthIncomes(incomes: IncomeType[]) {
		const currentMonth = new Date();
		const nextMonth = new Date(currentMonth);
		currentMonth.setDate(1);
		currentMonth.setHours(0, 0, 0, 0);
		nextMonth.setMonth(currentMonth.getMonth() + 1);
		nextMonth.setDate(1);
		nextMonth.setHours(0, 0, 0, 0);

		return incomes
			.filter((income) => {
				const incomeDate = new Date(income.paidOn).getTime();
				return (
					incomeDate >= currentMonth.getTime() &&
					incomeDate < nextMonth.getTime()
				);
			})
			.reduce((sum, income) => sum + income.amount, 0)
			.toString();
	}

	function getStats(incomes: IncomeType[]) {
		return {
			monthStat: getMonthIncomes(incomes),
		};
	}

	return {
		handleCreateInput,
		handleUpdateInput,
		create,
		formError,
		listIncomes,
		listCols,
		getStats,
	};
}
