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

	return {
		create,
		handleCreateInput,
		handleUpdateInput,
		formError,
	};
}
