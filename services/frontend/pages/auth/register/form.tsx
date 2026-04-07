import { UserCreation } from "@app/types/user";
import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import { useAuth } from "@hooks/useAuth";

export default function RegisterForm() {
	const auth = useAuth();

	return (
		<Form callback={() => auth.handleRegister}
			class="flex flex-col gap-3 p-2 w-lg bg-background-surface rounded-xl shadow-md shadow-background-border"
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
		</Form>
	);
}
