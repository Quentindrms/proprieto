import { ActionButton, Button } from "@components/button";
import { TextField } from "@components/form";
import Text from "@components/text";
import { useAuth } from "@hooks/useAuth";
import { navigate } from "vike/client/router";

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
			class="flex flex-col gap-3 p-2 w-lg bg-background-base border border-slate-strong rounded-xl shadow-lg shadow-slate-strong"
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
			<a href="/" class="text-muted-text font-base-regular text-sm">J'ai oublié mon mot de passe</a>
			<div class="flex justify-center">
				<Button type="submit" onClick={onClick}>
					Connexion
				</Button>
			</div>
			<div class="flex justify-center p-2">
				<ActionButton color="outline" onClick={() => navigate("/auth/register")}>Vous n'avez pas de compte ? Inscrivez-vous</ActionButton>
			</div>
		</form>
	);
}
