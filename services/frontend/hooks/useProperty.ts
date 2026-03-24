import type { CreateProperty } from "@app/types/property";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { onBrowse, onCreate } from "./useProperty.telefunc";

export function useProperty() {
	const [createProperty, setCreateProperty] = createSignal<CreateProperty>({
		name: "",
		isActive: false,
		type: "",
	});

	function handleCreateInput(field: keyof CreateProperty) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setCreateProperty((prev) => ({
				...prev,
				[field]: target.value,
			}));
			console.log(createProperty());
		};
	}

	async function create() {
		const response = await onCreate(createProperty());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création");
			return;
		}
		toast.success("Propriété créee");
	}

	async function browseProperties() {
		const response = await onBrowse();
		console.log(response);
		return response;
	}

	return {
		createProperty,
		handleCreateInput,
		create,
		browseProperties,
	};
}
