import { createSignal } from "solid-js";
import toast from "solid-toast";
import { onLogin } from "./useAuth.telefunc";

export function useAuth() {
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");

	async function handleLogin(event: SubmitEvent) {
		try {
			event.preventDefault();
			const response = await onLogin(email(), password());
			if (response?.success) {
				toast.success("Connexion réussie");
			} else {
				toast.error("Une erreur est survenue lors de la connexion");
			}
		} catch (error) {
			console.trace(error);
		}
	}

	return {
		setEmail,
		email,
		setPassword,
		password,
		handleLogin,
	};
}
