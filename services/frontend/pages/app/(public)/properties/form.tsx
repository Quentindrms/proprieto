import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useProperty } from "@hooks/useProperty";
import z from "zod";

export default function CreatePropertyForm() {
	const property = useProperty();

	return (
		<Form callback={property.create}>
			<TextField
				label="Nom"
				type="text"
				name="name"
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
