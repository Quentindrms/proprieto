import { createSignal } from "solid-js";
import { Button } from "../../../../../components/button";
import { TextField } from "../../../../../components/form";

interface LoginFormField {
	email: string;
	password: string;
}

export default function LoginForm() {
	const [formData, setFormData] = createSignal<LoginFormField>({
		email: "",
		password: "",
	});

	function handleInputChange(field: keyof LoginFormField) {
		return (event: InputEvent) => {
			const target = event.target as HTMLInputElement;
			setFormData((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	return (
		<div class="flex flex-col gap-3 p-2 w-lg bg-background-surface border border-background-border rounded-xl shadow-md shadow-background-border">
			<TextField
				label="Adrese email"
				type="email"
				name="mail"
				onInput={handleInputChange("email")}
			/>
			<TextField
				label="Mot de passe"
				type="password"
				name="password"
				onInput={handleInputChange("password")}
			/>
			<div class="flex justify-center">
				<Button type="submit">Connexion</Button>
			</div>
		</div>
	);
}
