import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import { useClient } from "@hooks/useClient";

export default function CreateForm() {
	const client = useClient();

	return (
		<Form callback={client.create}>
			<TextField label="Nom" onInput={client.handleCreate("name")} />

			<TextField label="Prénom" onInput={client.handleCreate("firstName")} />

			<TextField
				label="Adresse mail"
				type="email"
				onInput={client.handleCreate("email")}
			/>

			<TextField label="Adresse" onInput={client.handleCreate("address")} />

			<TextField
				label="Téléphone"
				type="tel"
				onInput={client.handleCreate("phone")}
			/>

			<div class="flex justify-center p-4">
				<Button type="submit">Créer</Button>
			</div>
		</Form>
	);
}
