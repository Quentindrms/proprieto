import { UserCreation } from "@app/types/user";
import { useAuth } from "@hooks/useAuth";
import { Button } from "../../../../../components/button";
import { TextField } from "../../../../../components/form";

export default function RegisterForm() {
	const auth = useAuth();

	return (
		<form
			class="flex flex-col gap-3 p-2 w-lg bg-background-surface border border-background-border rounded-xl shadow-md shadow-background-border"
			onSubmit={auth.handleRegister}
		>
			<TextField
				label="Nom"
				onInput={(event) => auth.setName(event.target.value)}
			/>
			<TextField
				label="Prénom"
				onInput={(event) => auth.setFirstName(event.target.value)}
			/>
			<TextField
				label="Adresse email"
				type="email"
				onInput={(event) => auth.setEmail(event.target.value)}
			/>
			<TextField
				label="Téléphone"
				type="tel"
				onInput={(event) => auth.setPhone(event.target.value)}
			/>
			<TextField
				label="Mot de passe"
				type="password"
				onInput={(event) => auth.setPassword(event.target.value)}
			/>
			<TextField
				label="Confirmation du mot de passe"
				type="password"
				onInput={(event) => auth.setPasswordValidation(event.target.value)}
			/>
			<div class="flex justify-center">
				<Button type="submit">S'inscrire</Button>
			</div>
		</form>
	);
}
