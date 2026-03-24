import type { CreateProperty } from "@app/types/property";
import { createSignal } from "solid-js";
import { onCreate } from "./useProperty.telefunc";

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

	function create() {
		onCreate(createProperty());
	}

	return {
		createProperty,
		handleCreateInput,
		create,
	};
}
