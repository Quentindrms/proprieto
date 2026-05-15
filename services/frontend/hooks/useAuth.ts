import type { UserCreation } from "@app/types/user";
import {
	CreateUserSchema,
	type CreateUserType,
	RecoverPasswordSchema,
	type RecoverPasswordType,
} from "@schemas/auth";
import { createSignal } from "solid-js";
import toast from "solid-toast";
import { navigate } from "vike/client/router";
import type { ZodSafeParseError } from "zod";
import {
	onForgetPassword,
	onLogin,
	onRecoverPassword,
	onRegister,
} from "./useAuth.telefunc";

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
	const [recoverPassword, setRecoverPassword] =
		createSignal<RecoverPasswordType>({
			password: "",
			passwordValidation: "",
		});

	const [formError, setFormError] =
		createSignal<ZodSafeParseError<CreateUserType | RecoverPasswordType>>();

	function handleRegisterInputChange(field: keyof UserCreation) {
		return (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			setFormData((prev: UserCreation) => ({
				...prev,
				[field]: target.value,
			}));
		};
	}

	function handleEmailInputChange(e: InputEvent) {
		const target = e.target as HTMLInputElement;
		setEmail(target.value);
	}

	function handleRecoverPasswordInputChange(field: keyof RecoverPasswordType) {
		return (e: InputEvent) => {
			const target = e.target as HTMLInputElement;
			setRecoverPassword((prev: RecoverPasswordType) => ({
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
		formData();
		const validate = CreateUserSchema.safeParse(formData());
		`Validate : ${validate.success}`;
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
			toast.error(response?.message);
		}
	}

	async function handleForgetPassword() {
		const response = await onForgetPassword(email());
		if (response.message !== "success") {
			toast.error(
				"Une erreur est survenue lors de la réinitialisation du mot de passe",
			);
			return;
		}
		toast.success(
			"Un email vous sera envoyé si un compte existe avec cette adresse email",
		);
	}

	async function handleRecoverPassword() {
		console.log(recoverPassword());
		const validate = RecoverPasswordSchema.safeParse(recoverPassword());
		if (!validate.success) {
			setFormError(validate);
			return;
		}
		setFormError(undefined);
		const response = onRecoverPassword(validate.data!.password);
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
		handleForgetPassword,
		handleEmailInputChange,
		handleRecoverPassword,
		handleRecoverPasswordInputChange,
	};
}
