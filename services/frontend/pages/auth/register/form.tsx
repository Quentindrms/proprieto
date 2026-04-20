import { UserCreation } from "@app/types/user";
import { Button } from "@components/button";
import { Form, TextField } from "@components/form";
import { useAuth } from "@hooks/useAuth";
import { z } from "zod";

export default function RegisterForm() {
	const auth = useAuth();

	return (
		<Form callback={auth.handleRegister}
			class="flex flex-col gap-3 p-2 w-lg bg-background-surface rounded-xl shadow-md shadow-background-border"
			onSubmit={auth.handleRegister}
		>
			<TextField label="Nom" onInput={auth.handleRegisterInputChange("name")} />
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.name
							?.errors[0]
					}
				</span>
			)}

			<TextField
				label="Prénom"
				onInput={auth.handleRegisterInputChange("firstName")}
			/>
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.firstName
							?.errors[0]
					}
				</span>
			)}
			<TextField
				label="Adresse email"
				type="email"
				onInput={auth.handleRegisterInputChange("email")}
			/>
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.email
							?.errors[0]
					}
				</span>
			)}
			<TextField
				label="Téléphone"
				type="tel"
				onInput={auth.handleRegisterInputChange("phone")}
			/>
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.phone
							?.errors[0]
					}
				</span>
			)}
			<TextField
				label="Mot de passe"
				type="password"
				onInput={auth.handleRegisterInputChange("password")}
			/>
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.password
							?.errors[0]
					}
				</span>
			)}
			<TextField
				label="Confirmation du mot de passe"
				type="password"
				onInput={auth.handleRegisterInputChange("passwordValidation")}
			/>
			{auth.formError() && (
				<span class="text-red-500">
					{
						z.treeifyError(auth.formError()!.error).properties?.passwordValidation
							?.errors[0]
					}
				</span>
			)}
			<div class="flex justify-center p-4">
				<Button type="submit">S'inscrire</Button>
			</div>
		</Form>
	);
}
