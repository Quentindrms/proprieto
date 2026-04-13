import type { Contract } from "@app/types/contract";
import {
	CreateContractSchema,
	type CreateContractType,
	type UpdateContractType,
} from "@schemas/contract";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import type { ZodSafeParseError } from "zod";
import { onCreate } from "./useContract.telefunc";

export function useContract() {
	const [createContract, setCreateContract] = createSignal<CreateContractType>({
		startDate: new Date(),
		endDate: new Date(),
		clientId: "",
		lease: 0,
		propertyId: "",
	});

	const [updateContract, setUpdateContract] = createSignal<UpdateContractType>({
		startDate: new Date(),
		endDate: new Date(),
		clientId: "",
		lease: 0,
		propertyId: "",
		id: "",
	});

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<CreateContractType | UpdateContractType>>();

	function handleCreateInput(field: keyof CreateContractType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateContract((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	function handleUpdateInput(field: keyof UpdateContractType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateContract((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	async function create() {
		const validate = CreateContractSchema.safeParse(createContract());
		console.log(createContract());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onCreate(createContract());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création du contrat");
			return;
		}
		toast.success("Contrat crée avec succès");
	}

	function getMonthlyLease(contractsList: Contract[]) {
		const now = new Date();
		const currentYear = now.getFullYear();
		const currentMonth = now.getMonth();
		const monthStart = new Date(currentYear, currentMonth, 1);
		const monthEnd = new Date(
			currentYear,
			currentMonth + 1,
			0,
			23,
			59,
			59,
			999,
		);
		const totalLoans = contractsList
			.filter((contract) => {
				const start = new Date(contract.startDate);
				const end = new Date(contract.endDate);
				return start <= monthEnd && end >= monthStart;
			})
			.map((contract) => contract.lease)
			.reduce((sum, lease) => sum + lease, 0);
		console.log(`Total loans : ${totalLoans}`);
		return totalLoans;
	}

	function getEndSoon(contractsList: Contract[]) {
		const now = new Date();
		const sixMonthsLater = new Date();
		sixMonthsLater.setMonth(now.getMonth() + 6);

		return contractsList.filter((contract) => {
			const endDate = new Date(contract.endDate);
			return endDate >= now && endDate <= sixMonthsLater;
		});
	}

	function getStats(contractsList: Contract[]) {
		return {
			monthlyLease: getMonthlyLease(contractsList),
			endSoon: getEndSoon(contractsList),
		};
	}

	return {
		create,
		handleCreateInput,
		handleUpdateInput,
		formError,
		getStats,
	};
}
