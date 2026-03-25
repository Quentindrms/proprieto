import {
	PropertyCreationSchema,
	type PropertyCreationType,
	type PropertyUpdateType,
} from "@schemas/property";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { reload } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onBrowse, onCreate, onDelete, onUpdate } from "./useProperty.telefunc";

export function useProperty() {
	const [createProperty, setCreateProperty] =
		createSignal<PropertyCreationType>({
			name: "",
			purchasePrice: 0,
			purchaseDate: new Date(),
			sellDate: new Date(),
			sellPrice: 0,
		});
	const [updateProperty, setUpdateProperty] = createSignal<PropertyUpdateType>({
		id: "",
		name: "",
		purchasePrice: 0,
		purchaseDate: new Date(),
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

	function handleUpdateInput(field: keyof PropertyUpdateType) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setUpdateProperty((prev) => ({
				...prev,
				[field]: target.value,
			}));
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
		await reload();
	}

	async function update() {
		const response = await onUpdate(updateProperty());
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la mise à jour");
			return;
		}
		toast.success("Propriété mise à jour");
		await reload();
	}

	async function remove(propertyId: string) {
		console.log(propertyId);
		const response = await onDelete(propertyId);
		if (response?.message !== "success") {
			toast.error("Une erreur est survenue lors de la suppression");
			return;
		}
		toast.success("Propriété supprimée");
		await reload();
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
		handleUpdateInput,
		create,
		update,
		remove,
		browseProperties,
		formError,
		setUpdateProperty,
	};
}
