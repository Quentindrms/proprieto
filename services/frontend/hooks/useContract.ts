import type { Contract } from "@app/types/contract";
import { getContractStatus } from "@components/board";
import type { ContractRowData } from "@components/rows";
import {
	CreateContractSchema,
	type CreateContractType,
	type UpdateContractType,
} from "@schemas/contract";
import { differenceInMonths } from "date-fns";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { navigate } from "vike/client/router";
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
		createContract();
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onCreate(validate.data);
		if (response?.message !== "success") {
			toast.error(response?.message);
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
		`Total loans : ${totalLoans}`;
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

	function sortContract(contracts: Contract[]) {
		const onGoing: ContractRowData[] = [];
		const expired: ContractRowData[] = [];
		contracts.forEach((contract) => {
			const result = isContractExpired(contract);
			if (result) {
				expired.push({
					clientName: `${contract.client.directory.firstName} ${contract.client.directory.name}`,
					loan: contract.lease,
					period: `${new Date(contract.startDate).toLocaleDateString("fr-FR")} - ${new Date(contract.endDate).toLocaleDateString("fr-FR")}`,
					propertyName: contract.property.name,
					status: "expired",
					onClick: () => navigate(`/app/contracts/${contract.id}`),
				});
			} else {
				onGoing.push({
					clientName: `${contract.client.directory.firstName} ${contract.client.directory.name}`,
					loan: contract.lease,
					period: `${new Date(contract.startDate).toLocaleDateString("fr-FR")} - ${new Date(contract.endDate).toLocaleDateString("fr-FR")}`,
					propertyName: contract.property.name,
					status: getContractStatus(contract.endDate),
					onClick: () => navigate(`/app/contracts/${contract.id}`),
				});
			}
		});
		return { onGoing, expired };
	}

	function isContractExpired(contract: Contract) {
		const endDate = new Date(contract.endDate);
		if (endDate.getTime() < Date.now()) {
			return true;
		} else {
			return false;
		}
	}

	function estimatedIncome(startDate: Date, endDate: Date, loan: number) {
		const months = differenceInMonths(endDate, startDate);
		return loan * months;
	}

	return {
		create,
		handleCreateInput,
		handleUpdateInput,
		formError,
		getStats,
		sortContract,
		estimatedIncome,
	};
}
