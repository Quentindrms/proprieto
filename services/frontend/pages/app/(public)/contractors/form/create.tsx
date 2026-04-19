import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import { useProvider } from "@hooks/useProvider";
import { z } from "zod";

export default function CreateForm() {
	const provider = useProvider();

	return (
		<Form callback={provider.create}>
			<TextField label="Nom" onInput={provider.handleCreateInput("name")} />

			<TextField
				label="Prénom"
				onInput={provider.handleCreateInput("firstName")}
			/>

			{provider.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(provider.formError()!.error).properties?.firstName
							?.errors[0]
					}
				</span>
			)}

			<TextField
				type="email"
				label="Email"
				onInput={provider.handleCreateInput("email")}
			/>

			{provider.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(provider.formError()!.error).properties?.email
							?.errors[0]
					}
				</span>
			)}

			<TextField
				label="Addresse"
				onInput={provider.handleCreateInput("address")}
			/>

			{provider.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(provider.formError()!.error).properties?.address
							?.errors[0]
					}
				</span>
			)}

			<TextField
				type="tel"
				label="Téléphone"
				onInput={provider.handleCreateInput("phone")}
			/>

			{provider.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(provider.formError()!.error).properties?.phone
							?.errors[0]
					}
				</span>
			)}

			<div class="flex justify-center p-4">
				<Button type="submit">Créer un créancier</Button>
			</div>
		</Form>
	);
}
