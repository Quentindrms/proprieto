import type { Client } from "@app/types/client";
import {
	CreateClientSchema,
	type CreateClientType,
	UpdateClientSchema,
	type UpdateClientType,
} from "@schemas/client";
import { createContext, createSignal, useContext } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onCreate, onDelete, onEdit } from "./useClient.telefunc";

export function useClient() {
	const emptyField: CreateClientType = {
		name: "",
		firstName: "",
		email: "",
		address: "",
		phone: "",
	};

	const [createClient, setCreateClient] =
		createSignal<CreateClientType>(emptyField);

	const [updateClient, setUpdateClient] = createSignal<UpdateClientType>({
		id: "",
		name: "",
		firstName: "",
		address: "",
		phone: "",
		email: "",
	});

	const [clientDetails, setClientDetails] = createSignal<Client>({
		address: "",
		email: "",
		firstName: "",
		id: "",
		name: "",
		phone: "",
		clients: [],
	});

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<CreateClientType | UpdateClientType>>();

	function handleCreate(field: keyof CreateClientType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateClient((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	function handleUpdateClient(field: keyof UpdateClientType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateClient((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	async function create() {
		const validate = CreateClientSchema.safeParse(createClient());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onCreate(createClient());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création du client");
		}
		toast.success("Client crée avec succès");
		setCreateClient(emptyField);
		await reload();
	}

	async function update() {
		console.log(updateClient());
		const validate = UpdateClientSchema.safeParse(updateClient());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = await onEdit(updateClient());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de l'édition de la ressource");
			return;
		}
		toast.success("Ressource éditée");
		return;
	}

	async function remove() {
		const response = await onDelete(clientDetails().id);
		if (response?.message !== "success") {
			toast.error(
				"Une erreur est survenue lros de la suppression de la ressource",
			);
			return;
		}
		toast.success("Ressource supprimée");
		return;
	}

	return {
		create,
		handleCreate,
		handleUpdateClient,
		formError,
		setClientDetails,
		clientDetails,
		update,
		setUpdateClient,
	};
}

export const ClientContext = createContext<ReturnType<typeof useClient>>();

export function useClientContext() {
	const context = useContext(ClientContext);
	if (!context) throw new Error("Context absent");
	return context;
}
