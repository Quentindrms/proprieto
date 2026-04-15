import { z } from "zod";

const idSchema = z.uuid("Identifiant dépense invalide");

const nameSchema = z
	.string()
	.min(5, "Le nom ne peut pas comporter moins de cinq caractères")
	.max(150, "Le nom ne peut pas dépasser 150 caractères");

const amountSchema = z.coerce.number("Le montant doit être un nombre");

const isRecurringSchema = z.boolean(
	"Une réccurence valide doit être sélectionnée",
);

const isPaidSchema = z.boolean(
	"Le statut payé doit être de type true ou false",
);

const issueDateSchema = z.coerce.date(
	"La date d'émission doit être une date valide",
);

const paidOnSchema = z.coerce
	.date("La date de paiement doit être une date valide")
	.optional();

const frequencySchema = z.string("").optional();

const incomeCategoryIdSchema = z.uuid("Identifiant catégorie invalide");

const contractIdSchema = z.uuid("Identifiant contrat invalide");

export const IncomeCreationSchema = z.object({
	name: nameSchema,
	amount: amountSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
	categoryId: incomeCategoryIdSchema,
	contractId: contractIdSchema,
	isRecurring: isRecurringSchema,
});

export const IncomeUpdateSchema = z.object({
	id: idSchema,
	name: nameSchema,
	amount: amountSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
	categoryId: incomeCategoryIdSchema,
	contractId: contractIdSchema,
	isRecurring: isRecurringSchema,
});

export type IncomeCreationType = z.infer<typeof IncomeCreationSchema>;
export type IncomeUpdateType = z.infer<typeof IncomeUpdateSchema>;
