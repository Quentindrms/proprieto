import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useProperty } from "@hooks/useProperty";
import type { PropertyCreationType } from "@schemas/property";
import z from "zod";

interface UpdatePropertyFormProps {
	property: PropertyCreationType | null;
}

export default function UpdatePropertyForm(props: UpdatePropertyFormProps) {
	const property = useProperty();

	return (
		<Form callback={property.update}>
			<TextField
				label="Nom"
				type="text"
				name="name"
				value={props?.property?.name}
				onInput={property.handleCreateInput("name")}
			/>
			{property.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(property.formError()!.error).properties?.name
							?.errors[0]
					}
				</span>
			)}

			<TextField
				label="Prix d'acquisition"
				type="text"
				name="purshacePrice"
				value={props?.property?.purchasePrice}
				onInput={property.handleCreateInput("purchasePrice")}
			/>
			{property.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(property.formError()!.error).properties
							?.purchasePrice?.errors[0]
					}
				</span>
			)}

			<TextField
				label="Date d'acquisition"
				type="date"
				name="purshaceDate"
				value={
					props.property?.purchaseDate
						? new Date(props.property.purchaseDate).toISOString().split("T")[0]
						: ""
				}
				onInput={property.handleCreateInput("purchaseDate")}
			/>
			{property.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(property.formError()!.error).properties?.purchaseDate
							?.errors[0]
					}
				</span>
			)}

			<Select
				label="Type de bien"
				labelOptions="Sélectionner un type de bien"
				options={[]}
			/>
			<div class="flex justify-center p-2">
				<Button type="submit">Créer une nouvelle propriété</Button>
			</div>
		</Form>
	);
}
