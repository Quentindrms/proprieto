import { createSignal } from "solid-js";
import { onLogin } from "./useAuth.telefunc";

export function useAuth() {
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");

	async function handleLogin(event: SubmitEvent) {
		try {
			event.preventDefault();
			onLogin(email(), password());
		} catch (error) {}
	}

	return {
		setEmail,
		email,
		setPassword,
		password,
		handleLogin,
	};
}
