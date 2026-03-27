import type { CreateClientType, UpdateClientType } from "@schemas/client";
import { createSignal } from "solid-js";

export function useClient() {
	const [createClient, setCreateClient] = createSignal<CreateClientType>({
		name: "",
		firstName: "",
		email: "",
		address: "",
		phoneSchema: "",
	});

	const [updateClient, setUpdateClient] = createSignal<CreateClientType>({
		name: "",
		firstName: "",
		address: "",
		phoneSchema: "",
		email: "",
	});

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
		console.log(createClient);
	}

	return {
		create,
		handleCreate,
		handleUpdateClient,
	};
}
