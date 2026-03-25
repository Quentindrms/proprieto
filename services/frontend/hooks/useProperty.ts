import {
	PropertyCreationSchema,
	type PropertyCreationType,
} from "@schemas/property";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import type { ZodSafeParseError } from "zod";
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
	const [formError, setFormError] =
		createSignal<ZodSafeParseError<PropertyCreationType>>();

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
		const validate = validateData();
		if (!validate.success) {
			return validate.error;
		}
		const response = await onCreate(createProperty());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la création");
			return;
		}
		toast.success("Propriété créee");
	}

	function validateData() {
		const validation = PropertyCreationSchema.safeParse(createProperty());
		if (!validation.success) {
			setFormError(validation);
			return validation;
		}
		setFormError(undefined);
		return validation;
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
		formError,
	};
}
