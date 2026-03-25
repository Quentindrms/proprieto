import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useProperty } from "@hooks/useProperty";

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
			<TextField
				label="Prix d'acquisition"
				type="text"
				name="purshacePrice"
				onInput={property.handleCreateInput("purchasePrice")}
			/>
			<TextField
				label="Date d'acquisition"
				type="date"
				name="purshaceDate"
				onInput={property.handleCreateInput("purchaseDate")}
			/>
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
