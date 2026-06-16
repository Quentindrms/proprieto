import type { Contract } from "@app/types/contract";
import type { IncomeType } from "@app/types/income";
import { getContractStatus } from "@components/board";
import type { ContractRowData } from "@components/rows";
import {
	CreateContractSchema,
	type CreateContractType,
	RenewContractSchema,
	type RenewContractType,
	UpdateContractSchema,
	type UpdateContractType,
} from "@schemas/contract";
import { differenceInMonths } from "date-fns";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { navigate, reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onCreate, onDelete, onRenew, onUpdate } from "./useContract.telefunc";

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
		lease: 0,
		id: "",
	});

	const [renewContract, setRenewContract] = createSignal<RenewContractType>({
		clientId: "",
		startDate: new Date(),
		endDate: new Date(),
		lease: 0,
		propertyId: "",
		renewContract: "",
	});

	const [formError, setFormError] =
		createSignal<
			ZodSafeParseError<
				CreateContractType | UpdateContractType | RenewContractType
			>
		>();

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

	function handleRenewInput(field: keyof RenewContractType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setRenewContract((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	async function create() {
		const validate = CreateContractSchema.safeParse(createContract());
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
		await reload();
	}

	async function update() {
		const validate = UpdateContractSchema.safeParse(updateContract());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onUpdate(validate.data);
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la modification");
			return;
		}
		toast.success("Modification effectuée");
		await reload();
	}

	async function renew() {
		const validate = RenewContractSchema.safeParse(renewContract());
		console.log(renewContract());
		if (!validate.success) {
			console.log(validate);
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onRenew(validate.data);
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors du renouvellement");
			return;
		}
		toast.success("Contrat renouvelé");
		await reload();
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
			return (
				endDate >= now &&
				endDate <= sixMonthsLater &&
				contract.isRenewed === false
			);
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

	function progression(startDate: Date, endDate: Date) {
		const progression = Math.round(
			((Date.now() - new Date(startDate).getTime()) /
				(new Date(endDate).getTime() - new Date(startDate).getTime())) *
				100,
		);
		if (progression > 100) {
			return 100;
		}
		return progression;
	}

	function totalIncome(incomes: IncomeType[]) {
		return incomes.reduce((acc, income) => acc + income.amount, 0);
	}

	async function deleteContract(id: string) {
		const result = await onDelete(id);
		if (result?.success === true) {
			toast.success("Contrat supprimé");
			navigate("/app/contracts/");
		} else {
			toast.error("Une erreur est survenue lors de la suppression");
		}
	}

	return {
		create,
		update,
		deleteContract,
		handleCreateInput,
		handleUpdateInput,
		handleRenewInput,
		formError,
		setUpdateContract,
		getStats,
		sortContract,
		estimatedIncome,
		progression,
		totalIncome,
		setRenewContract,
		renew,
	};
}
