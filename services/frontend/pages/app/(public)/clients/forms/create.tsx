import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import Text from "@components/text";
import { useClient } from "@hooks/useClient";
import { z } from "zod";

export default function CreateForm() {
	const client = useClient();

	return (
		<Form callback={client.create}>
			<TextField label="Nom" onInput={client.handleCreate("name")} />

			{client.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(client.formError()!.error).properties?.name
							?.errors[0]
					}
				</Text>
			)}

			<TextField label="Prénom" onInput={client.handleCreate("firstName")} />

			{client.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(client.formError()!.error).properties?.firstName
							?.errors[0]
					}
				</Text>
			)}

			<TextField
				label="Adresse mail"
				type="email"
				onInput={client.handleCreate("email")}
			/>

			{client.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(client.formError()!.error).properties?.email
							?.errors[0]
					}
				</Text>
			)}

			<TextField label="Adresse" onInput={client.handleCreate("address")} />

			{client.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(client.formError()!.error).properties?.phone
							?.errors[0]
					}
				</Text>
			)}

			<TextField
				label="Téléphone"
				type="tel"
				onInput={client.handleCreate("phone")}
			/>

			{client.formError() && (
				<Text class="text-red-500">
					{
						z.treeifyError(client.formError()!.error).properties?.phone
							?.errors[0]
					}
				</Text>
			)}

			<div class="flex justify-center p-4">
				<Button type="submit">Créer</Button>
			</div>
		</Form>
	);
}
