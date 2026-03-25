import type { PropertyCreationType } from "@schemas/property";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { onBrowse, onCreate } from "./useProperty.telefunc";

export function useProperty() {
	const [createProperty, setCreateProperty] =
		createSignal<PropertyCreationType>({
			name: "",
			purchasePrice: 0,
			purchaseDate: new Date(),
			sellDate: new Date(),
			sellPrice: 0,
		});

	function handleCreateInput(field: keyof PropertyCreationType) {
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
		if (!response) return;
		return response;
	}

	return {
		createProperty,
		handleCreateInput,
		create,
		browseProperties,
	};
}
