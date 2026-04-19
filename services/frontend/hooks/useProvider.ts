import type { ProviderType } from "@app/types/provider";
import {
	CreateProviderSchema,
	type CreateProviderType,
	type UpdateProviderType,
} from "@schemas/provider";
import { createContext, createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import type { ZodSafeParseError } from "zod";
import { onCreate } from "./useProvider.telefunc";

export function useProvider() {
	const [createProvider, setCreateProvider] = createSignal<CreateProviderType>({
		name: "",
		firstName: "",
		address: "",
		email: "",
		phone: "",
	});

	const [updateProvider, setUpdateProvider] = createSignal<UpdateProviderType>({
		name: "",
		firstName: "",
		address: "",
		email: "",
		phone: "",
		userId: "",
		id: "",
	});

	const [providerDetails, setProviderDetails] = createSignal<ProviderType>();

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<CreateProviderType | UpdateProviderType>>();

	function handleCreateInput(field: keyof CreateProviderType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateProvider((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	function handleUpdateInput(field: keyof UpdateProviderType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateProvider((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	async function create() {
		console.log(createProvider());
		const validate = CreateProviderSchema.safeParse(createProvider());
		console.log(validate);
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		const response = await onCreate(createProvider());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création");
			return;
		}
		toast.success("Créancier crée avec succès");
	}

	return {
		create,
		formError,
		updateProvider,
		setUpdateProvider,
		handleCreateInput,
		handleUpdateInput,
		setProviderDetails,
		providerDetails,
	};
}

export const ProviderContext = createContext<ReturnType<typeof useProvider>>();

export function useProviderContext() {
	const context = useContext(ProviderContext);
	if (!context) throw new Error("Context absent");
	return context;
}
