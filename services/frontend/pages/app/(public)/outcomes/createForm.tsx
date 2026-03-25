import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import Text from "@components/text";
import { useOutcome } from "@hooks/useOutcome";
import { createSignal, Show } from "solid-js";
import { z } from "zod";

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

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.name
							?.errors[0]
					}
				</Text>
			)}

			<TextField
				label="Montant"
				type="number"
				name="amount"
				onInput={outcome.handleCreateInput("amount")}
			/>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.amount
							?.errors[0]
					}
				</Text>
			)}

			<CheckBox
				label="Réccurence"
				name="isRecuring"
				onInput={() => {
					outcome.handleCreateInput("isRecuring");
					setIsRecuring(!isRecuring());
				}}
			/>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.isRecuring
							?.errors[0]
					}
				</Text>
			)}

			<Show when={isRecuring()}>
				<Select
					label="Fréquence de paiement"
					labelOptions={"Indiquer une fréquence de paiement"}
					options={[]}
					onInput={outcome.handleCreateInput("frequency")}
				></Select>

				{outcome.formError() && (
					<Text class="text-red-500">
						{
							z.treeifyError(outcome.formError()!.error).properties?.frequency
								?.errors[0]
						}
					</Text>
				)}
			</Show>

			<CheckBox
				label="Payé"
				name="isPaid"
				onInput={() => {
					outcome.handleCreateInput("isPaid");
					setIsPaid(!isPaid());
				}}
			/>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.isPaid
							?.errors[0]
					}
				</Text>
			)}

			<Show when={isPaid()}>
				<TextField
					label="Date de paiement"
					type="date"
					name="paidOn"
					onInput={outcome.handleCreateInput("issueDate")}
				/>
			</Show>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.issueDate
							?.errors[0]
					}
				</Text>
			)}

			<div class="flex justify-center p-2">
				<Button type="submit">Créer une nouveau revenu</Button>
			</div>
		</Form>
	);
}
