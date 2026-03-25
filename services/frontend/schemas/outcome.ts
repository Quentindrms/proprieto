import { z } from "zod";

const idSchema = z.string();

const nameSchema = z
	.string()
	.min(5, "Le nom doit contenir au moins 5 caractères")
	.max(150, "Le nom ne peut pas contenir plus de 150 caractères");

const amountSchema = z.coerce.number("Le montant doit être un nombre");

const isRecuringSchema = z.boolean(
	"La récurrence doit être un de type vrai ou faux",
);

const isPaidSchema = z.boolean("Le statut payé doit être de type vrai ou faux");

const issueDateSchema = z.coerce
	.date("Le format de la date est invalide")
	.optional();

const paidOnSchema = z.coerce
	.date("La format de la date est invalide")
	.optional();

const frequencySchema = z.enum(["none", "week", "month", "year"]).optional();

export const OutcomeCreationSchema = z.object({
	name: nameSchema,
	amount: amountSchema,
	isRecuring: isRecuringSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
});

export const OutcomeUpdateSchema = z.object({
	id: idSchema,
	name: nameSchema,
	amount: amountSchema,
	isRecuring: isRecuringSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
});

export type OutcomeCreationType = z.infer<typeof OutcomeCreationSchema>;
export type OutcomeUpdateType = z.infer<typeof OutcomeUpdateSchema>;
