import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useContract } from "@hooks/useContract";
import { useData } from "vike-solid/useData";
import type { Data } from "../+data";

export default function CreateForm() {
	const contract = useContract();
	const data = useData<Data>();

	const propertiesList = data.properties.map((property) => ({
		value: property.id,
		label: property.name,
		disabled: false,
	}));

	const clientsList = data.clients.map((client) => ({
		value: client.id,
		label: `${client.firstName} ${client.name}`,
		disabled: false,
	}));

	return (
		<Form callback={contract.create}>
			<TextField
				type="date"
				label="Date de début du contrat"
				onInput={contract.handleCreateInput("startDate")}
			/>

			<TextField
				type="date"
				label="Date de fin du contrat"
				onInput={contract.handleCreateInput("endDate")}
			/>

			<TextField
				type="number"
				label="Loyer mensuel"
				onInput={contract.handleCreateInput("lease")}
			/>

			<Select
				label="Propriété louée"
				labelOptions="Sélectionner une propriété"
				options={propertiesList}
				onInput={contract.handleCreateInput("propertyId")}
			/>

			<Select
				label="Client concerné"
				labelOptions="Sélectionner un client"
				options={clientsList}
				onInput={contract.handleCreateInput("clientId")}
			/>

			<div class="flex justify-center p-4">
				<Button type="submit">Créer le contrat</Button>
			</div>
		</Form>
	);
}
