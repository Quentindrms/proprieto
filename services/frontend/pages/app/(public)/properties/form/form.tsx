import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useProperty } from "@hooks/useProperty";
import { useData } from "vike-solid/useData";
import z from "zod";
import type { Data } from "../+data";

export default function CreatePropertyForm() {
	const property = useProperty();
	const data = useData<Data>();

	const propertyTypes = data.propertyTypes.map((type) => ({
		value: type.id,
		label: type.name,
		disabled: false,
	}));

	return (
		<Form callback={property.create}>
			<TextField
				label="Nom"
				name="name"
				onInput={property.handleCreateInput("name")}
				required
			/>
			{property.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(property.formError()!.error).properties?.name
							?.errors[0]
					}
				</span>
			)}
			<div class="flex gap-3">
				<TextField
					label="Prix d'acquisition"
					name="purshacePrice"
					onInput={property.handleCreateInput("purchasePrice")}
					required
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
					required
				/>
			</div>
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
				options={propertyTypes}
				onInput={property.handleCreateInput("type")}
				required
			/>
			<div class="flex justify-center p-2">
				<Button type="submit">Créer une nouvelle propriété</Button>
			</div>
		</Form>
	);
}
