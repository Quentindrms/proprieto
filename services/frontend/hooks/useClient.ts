import {
	CreateClientSchema,
	type CreateClientType,
	type UpdateClientType,
} from "@schemas/client";
import { createSignal } from "solid-js";
import type { ZodSafeParseError } from "zod";

export function useClient() {
	const [createClient, setCreateClient] = createSignal<CreateClientType>({
		name: "",
		firstName: "",
		email: "",
		address: "",
		phone: "",
	});

	const [updateClient, setUpdateClient] = createSignal<CreateClientType>({
		name: "",
		firstName: "",
		address: "",
		phone: "",
		email: "",
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

	function create() {
		const validate = CreateClientSchema.safeParse(createClient());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
	}

	return {
		create,
		handleCreate,
		handleUpdateClient,
		formError,
	};
}
