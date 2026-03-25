import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import { useOutcome } from "@hooks/useOutcome";
import { createSignal, Show } from "solid-js";

export default function CreateOutcomeForm() {
	const outcome = useOutcome();

	const [isRecuring, setIsRecuring] = createSignal<boolean>(false);
	const [isPaid, setIsPaid] = createSignal<boolean>(false);

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
				onInput={() => {
					outcome.handleCreateInput("isRecuring");
					setIsRecuring(!isRecuring());
				}}
			/>

			<Show when={isRecuring()}>
				<Select
					label="Fréquence de paiement"
					labelOptions={"Indiquer une fréquence de paiement"}
					options={[]}
					onInput={outcome.handleCreateInput("frequency")}
				></Select>
			</Show>

			<CheckBox
				label="Payé"
				name="isPaid"
				onInput={() => {
					outcome.handleCreateInput("isPaid");
					setIsPaid(!isPaid());
				}}
			/>

			<Show when={isPaid()}>
				<TextField
					label="Date de paiement"
					type="date"
					name="paidOn"
					onInput={outcome.handleCreateInput("issueDate")}
				/>
			</Show>

			<div class="flex justify-center p-2">
				<Button type="submit">Créer une nouveau revenu</Button>
			</div>
		</Form>
	);
}
