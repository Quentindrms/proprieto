import { useAuth } from "@hooks/useAuth";
import { createSignal } from "solid-js";
import { Button } from "../../../../../components/button";
import { TextField } from "../../../../../components/form";

interface LoginFormField {
	email: string;
	password: string;
}

export default function LoginForm() {
	const auth = useAuth();

	function onClick() {
		console.log(auth.email());
		console.log(auth.password());
	}

	function handleInput(event: InputEvent) {
		const target = event.target as HTMLInputElement;
		if (target.name === "mail") {
			auth.setEmail(target.value);
		} else if (target.name === "password") {
			auth.setPassword(target.value);
		}
	}

	return (
		<form
			class="flex flex-col gap-3 p-2 w-lg bg-background-surface border border-background-border rounded-xl shadow-md shadow-background-border"
			onSubmit={auth.handleLogin}
		>
			<TextField
				label="Adrese email"
				type="email"
				name="mail"
				onInput={handleInput}
			/>
			<TextField
				label="Mot de passe"
				type="password"
				name="password"
				onInput={handleInput}
			/>
			<div class="flex justify-center">
				<Button type="submit" onClick={onClick}>
					Connexion
				</Button>
			</div>
		</form>
	);
}
