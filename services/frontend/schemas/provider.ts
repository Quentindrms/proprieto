import { z } from "zod";

const idSchema = z.string("Identifiant créancier invalide");

const nameSchema = z
	.string()
	.min(5, "Le nom doit contenir au moins 5 caractères")
	.max(120, "Le nom ne peut pas contenir plus de 120 caractères");

const firstNameSchema = z
	.string()
	.min(2, "Le prénom doit contenir au moins 2 caractères")
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
	.max(20, "Le téléphone ne peut pas contenir plus de 20 caractères");

const userIdSchema = z.string("Identifiant utilisateur invalide");

export const CreateProviderSchema = z.object({
	name: nameSchema,
	firstName: firstNameSchema,
	email: emailSchema,
	address: adressSchema,
	phone: phoneSchema,
	userId: userIdSchema,
});

export const UpdateProviderSchema = z.object({
	id: idSchema,
	name: nameSchema,
	firstName: firstNameSchema,
	email: emailSchema,
	address: adressSchema,
	phone: phoneSchema,
	userId: userIdSchema,
});

export type CreateProviderType = z.infer<typeof CreateProviderSchema>;
export type UpdateProviderType = z.infer<typeof UpdateProviderSchema>;
