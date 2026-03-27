import { Button } from "@components/button";
import { Form, Select, TextField } from "@components/form";
import { useContract } from "@hooks/useContract";

export default function CreateForm() {
	const contract = useContract();

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
				options={[]}
			/>

			<Select
				label="Client concerné"
				labelOptions="Sélectionner un client"
				options={[]}
			/>

			<div class="flex justify-center p-4">
				<Button type="submit">Créer le contrat</Button>
			</div>
		</Form>
	);
}
