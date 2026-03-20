import { createSignal } from "solid-js";
import toast from "solid-toast";
import { navigate } from "vike/client/router";
import { onLogin } from "./useAuth.telefunc";

export function useAuth() {
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [passwordValidation, setPasswordValidation] = createSignal<string>("");
	const [name, setName] = createSignal<string>("");
	const [firstName, setFirstName] = createSignal<string>("");
	const [phone, setPhone] = createSignal<string>("");

	async function handleLogin(event: SubmitEvent) {
		try {
			event.preventDefault();
			const response = await onLogin(email(), password());
			if (response?.success) {
				toast.success("Connexion réussie");
				navigate("/app/");
			} else {
				toast.error("Une erreur est survenue lors de la connexion");
			}
		} catch (error) {
			console.trace(error);
		}
	}

	async function handleRegister(event: SubmitEvent) {
		event.preventDefault();
	}

	return {
		setEmail,
		email,
		setPassword,
		password,
		setFirstName,
		firstName,
		setName,
		name,
		setPhone,
		phone,
		setPasswordValidation,
		passwordValidation,
		handleLogin,
		handleRegister,
	};
}
