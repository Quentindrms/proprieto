import {
	CreateProviderSchema,
	type CreateProviderType,
	type UpdateProviderType,
} from "@schemas/provider";
import { createSignal } from "solid-js";
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

	function create() {
		console.log(createProvider());
		const validate = CreateProviderSchema.safeParse(createProvider());
		console.log(validate);
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		onCreate(createProvider());
	}

	return {
		create,
		formError,
		handleCreateInput,
		handleUpdateInput,
	};
}
