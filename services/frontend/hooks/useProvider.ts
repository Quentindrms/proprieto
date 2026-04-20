import type { ProviderType } from "@app/types/provider";
import {
	CreateProviderSchema,
	type CreateProviderType,
	UpdateProviderSchema,
	type UpdateProviderType,
} from "@schemas/provider";
import { createContext, createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onEdit } from "./useClient.telefunc";
import { onCreate, onRemove } from "./useProvider.telefunc";

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

	const [details, setDetails] = createSignal<ProviderType>({
		directories: {
			address: "",
			email: "",
			firstName: "",
			name: "",
			phone: "",
			userId: "",
		},
		id: "",
	});

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
		const validate = CreateProviderSchema.safeParse(createProvider());
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

	async function edit() {
		const validate = UpdateProviderSchema.safeParse(updateProvider());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		const respponse = await onEdit(updateProvider());
		if (respponse?.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la modification de la ressource",
			);
			return;
		}
		toast.success("Ressource modifiée");
		await reload();
		return;
	}

	async function remove() {
		console.log(details().id);
		const response = await onRemove(details().id);
		if (response?.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la suppression de la ressource",
			);
			return false;
		}
		toast.success("Ressource supprimée");
		return true;
	}

	return {
		create,
		formError,
		updateProvider,
		setUpdateProvider,
		handleCreateInput,
		handleUpdateInput,
		edit,
		remove,
		details,
		setDetails,
	};
}

export const ProviderContext = createContext<ReturnType<typeof useProvider>>();

export function useProviderContext() {
	const context = useContext(ProviderContext);
	if (!context) throw new Error("Context absent");
	return context;
}
