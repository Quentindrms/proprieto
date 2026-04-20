import { z } from "zod";

const nameSchema = z
	.string("Le nom doit être une chaîne de caractères")
	.min(5, "Le nom doit contenir au moins 5 caractères");
const firstNameSchema = z
	.string("Le prénom doit être une chaîne de caractères")
	.min(2, "Le prénom doit contenir au moins deux caractères")
	.max(120, "Le prénom ne peut pas contenir plus de 120 caractères");

const emailSchema = z
	.email("Le format de l'adresse email est invalide")
	.max(254, "L'adresse email ne peut pas contenir plus de 120 caractères");

const adressSchema = z
	.string()
	.min(5, "L'adresse doit contenir au moins 5 caracères")
	.max(250, "L'adresse ne peut pas contenir plus de 250 caractères");

const phoneSchema = z
	.string()
	.min(10, "Le téléphone doit contenir au moins 10 caractères")
	.max(20, "Le téléphone ne peut pas contenir plus de 20 caractères");

const passwordSchema = z
	.string("Le mot de passe doit être une chaîne de caractères")
	.min(12, "Le mot de passe doit contenir au moins 12 caractères")
	.max(150, "Le mot de passe ne doit pas contenir plus de 150 caractères");

const passwordValidationSchema = z
	.string("Le mot de passe doit être une chaîne de caractères")
	.min(12, "Le mot de passe doit contenir au moins 12 caractères")
	.max(150, "Le mot de passe ne doit pas contenir plus de 150 caractères");

export const CreateUserSchema = z
	.object({
		name: nameSchema,
		firstName: firstNameSchema,
		email: emailSchema,
		address: adressSchema,
		phone: phoneSchema,
		password: passwordSchema,
		passwordValidation: passwordValidationSchema,
	})
	.refine((data) => data.password === data.passwordValidation, {
		message: "Les mots de passe ne correspondent pas",
		path: ["passwordValidation"],
	});

export type CreateUserType = z.infer<typeof CreateUserSchema>;
