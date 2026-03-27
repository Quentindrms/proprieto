import { Button } from "@components/button";
import { CheckBox, Form, Select, TextField } from "@components/form";
import Text from "@components/text";
import { useOutcome } from "@hooks/useOutcome";
import { createSignal, Show } from "solid-js";
import { useData } from "vike-solid/useData";
import { z } from "zod";
import type { Data } from "./+data";

export default function CreateOutcomeForm() {
	const data = useData<Data>();

	const propertiesList = data.properties.map((property) => ({
		value: property.id,
		label: property.name,
		disabled: false,
	}));

	const categoryList = data.categories.map((category) => ({
		value: category.id,
		label: category.name,
		disabled: false,
	}));

	const providersList = data.providers.map((provider) => ({
		value: provider.id,
		label: `${provider.firstName} ${provider.name}`,
		disabled: false,
	}));

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

			<Select
				label="Propriété concernée"
				labelOptions="Sélectionner une proprieté"
				options={propertiesList}
				onInput={outcome.handleCreateInput("propertyId")}
			/>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.propertyId
							?.errors[0]
					}
				</Text>
			)}

			<Select
				label="Catégorie de dépense"
				labelOptions="Sélectionner une catégorie"
				options={categoryList}
				onInput={outcome.handleCreateInput("categoryId")}
			/>

			{outcome.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(outcome.formError()!.error).properties?.categoryId
							?.errors[0]
					}
				</Text>
			)}

			<Select
				label="Créancier"
				labelOptions="Sélectionner un créancier"
				options={providersList}
				onInput={outcome.handleCreateInput("providerId")}
			/>

			<TextField
				label="Date d'émission"
				type="date"
				name="issueDate"
				onInput={outcome.handleCreateInput("issueDate")}
			/>

			<CheckBox
				label="Réccurence"
				name="isRecuring"
				onInput={(event: InputEvent) => {
					outcome.handleCreateInput("isRecuring")(event);
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
				onInput={(event: InputEvent) => {
					outcome.handleCreateInput("isPaid")(event);
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
					onInput={outcome.handleCreateInput("paidOn")}
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
