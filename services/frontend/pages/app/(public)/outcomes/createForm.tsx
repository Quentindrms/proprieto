import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import { useOutcome } from "@hooks/useOutcome";

export default function CreateOutcomeForm() {
	const outcome = useOutcome();

	return (
		<Form callback={outcome.create}>
			<TextField
				label="Nom"
				type="text"
				name="name"
				onInput={outcome.handleCreateInput("name")}
			/>

			<TextField
				label="Montant"
				type="number"
				name="amount"
				onInput={outcome.handleCreateInput("amount")}
			/>

			<CheckBox
				label="Réccurence"
				name="isRecuring"
				onInput={outcome.handleCreateInput("isRecuring")}
			/>

			<CheckBox
				label="Payé"
				name="isPaid"
				onInput={outcome.handleCreateInput("isPaid")}
			/>

			<TextField
				label="Date de paiement"
				type="date"
				name="paidOn"
				onInput={outcome.handleCreateInput("issueDate")}
			/>

			<Select
				label="Fréquence de paiement"
				labelOptions={"Indiquer une fréquence de paiement"}
				options={[]}
				onInput={outcome.handleCreateInput("frequency")}
			></Select>

			<div class="flex justify-center p-2">
				<Button type="submit">Créer une nouveau revenu</Button>
			</div>
		</Form>
	);
}
