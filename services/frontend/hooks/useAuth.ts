import { User, type UserCreation } from "@app/types/user";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { redirect } from "vike/abort";
import { navigate } from "vike/client/router";
import { onLogin, onRegister } from "./useAuth.telefunc";

export function useAuth() {
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [formData, setFormData] = createSignal<UserCreation>({
		name: "",
		firstName: "",
		address: "",
		email: "",
		password: "",
		passwordValidation: "",
		phone: "",
	});

	function handleRegisterInputChange(field: keyof UserCreation) {
		return (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			setFormData((prev) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

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
		const response = await onRegister(formData());
		if (response?.success) {
			toast.success("Inscription réussie");
			navigate("/auth/login");
		} else {
			toast.error("Une erreur est survenue lors de l'inscription");
		}
	}

	return {
		setEmail,
		email,
		setPassword,
		password,
		handleLogin,
		handleRegisterInputChange,
		handleRegister,
	};
}
