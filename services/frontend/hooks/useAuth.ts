import type { UserCreation } from "@app/types/user";
import { CreateUserSchema, type CreateUserType } from "@schemas/auth";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { navigate } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import { onLogin, onRegister } from "./useAuth.telefunc";

export function useAuth() {
	const [email, setEmail] = createSignal<string>("");
	const [password, setPassword] = createSignal<string>("");
	const [formData, setFormData] = createSignal<CreateUserType>({
		name: "",
		firstName: "",
		address: "",
		email: "",
		password: "",
		passwordValidation: "",
		phone: "",
	});
	const [formError, setFormError] =
		createSignal<ZodSafeParseError<CreateUserType>>();

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

	async function handleRegister() {
		console.log(formData());
		const validate = CreateUserSchema.safeParse(formData());
		console.log(`Validate : ${validate.success}`);
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
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
		formError,
	};
}
