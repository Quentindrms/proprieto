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
			<TextField label="Nom" onInput={auth.handleRegisterInputChange("name")} />
			<TextField
				label="Prénom"
				onInput={auth.handleRegisterInputChange("firstName")}
			/>
			<TextField
				label="Adresse email"
				type="email"
				onInput={auth.handleRegisterInputChange("email")}
			/>
			<TextField
				label="Téléphone"
				type="tel"
				onInput={auth.handleRegisterInputChange("phone")}
			/>
			<TextField
				label="Mot de passe"
				type="password"
				onInput={auth.handleRegisterInputChange("password")}
			/>
			<TextField
				label="Confirmation du mot de passe"
				type="password"
				onInput={auth.handleRegisterInputChange("passwordValidation")}
			/>
			<div class="flex justify-center">
				<Button type="submit">S'inscrire</Button>
			</div>
		</form>
	);
}
