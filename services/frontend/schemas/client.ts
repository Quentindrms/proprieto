import { z } from "zod";

const idSchema = z.string();

const nameSchema = z
	.string()
	.min(5, "Le nom doit comporter au moins 5 caractères")
	.max(120, "Le nom ne peut pas comporter plus de 120 caractères");

const firstNameSchema = z
	.string()
	.min(5, "Le prénom doit comporter au moins 5 caractères")
	.max(120, "Le prénom ne peut pas comporter plus de 120 caractères");

const emailSchema = z
	.email("Format de l'email invalide")
	.max(254, "L'adresse email ne peut pas comporter plus de 254 caractères");

const addressSchema = z
	.string()
	.min(15, "L'adresse doit contenir au moins 15 caractères")
	.max(250, "L'adresse ne peut pas comporter plus de 250 caractères");

const phoneSchema = z
	.string()
	.min(10, "Le téléphone doit contenir au moins 10 caractères")
	.max(20, "Le téléphone ne peut pas contenir plus de 20 caractères");

export const CreateClientSchema = z.object({
	name: nameSchema,
	firstName: firstNameSchema,
	email: emailSchema,
	address: addressSchema,
	phone: phoneSchema,
});

export const UpdateClientSchema = z.object({
	name: nameSchema,
	firstName: firstNameSchema,
	email: emailSchema,
	address: addressSchema,
	phone: phoneSchema,
});

export type CreateClientType = z.infer<typeof CreateClientSchema>;
export type UpdateClientType = z.infer<typeof UpdateClientSchema>;
