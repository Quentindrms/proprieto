import { z } from "zod";

const idSchema = z.uuid("Identifiant dépense invalide");

const nameSchema = z
	.string()
	.min(5, "Le nom ne peut pas comporter moins de cinq caractères")
	.max(150, "Le nom ne peut pas dépasser 150 caractères");

const amountSchema = z.coerce.number("Le montant doit être un nombre");

const isRecurringSchema = z.string(
	"Une réccurence valide doit être sélectionnée",
);

const isPaidSchema = z.boolean(
	"Le statut payé doit être de type true ou false",
);

const issueDateSchema = z.coerce.date(
	"La date d'émission doit être une date valide",
);

const paidOnSchema = z.coerce.date(
	"La date de paiement doit être une date valide",
);

const frequencySchema = z.string("");

const propertyIdSchema = z.uuid("Identifiant propriété invalide");

const incomeCategoryIdSchema = z.uuid("Identifiant catégorie invalide");

const clientIdSchema = z.uuid("Identifiant client invalide");

export const IncomeCreationSchema = z.object({
	name: nameSchema,
	amount: amountSchema,
	isRecurring: isRecurringSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
	propertyId: propertyIdSchema,
	incomeCategoryId: incomeCategoryIdSchema,
	clientId: clientIdSchema,
});

export const IncomeUpdateSchema = z.object({
	id: idSchema,
	name: nameSchema,
	amount: amountSchema,
	isRecurring: isRecurringSchema,
	isPaid: isPaidSchema,
	issueDate: issueDateSchema,
	paidOn: paidOnSchema,
	frequency: frequencySchema,
	propertyId: propertyIdSchema,
	incomeCategoryId: incomeCategoryIdSchema,
	clientId: clientIdSchema,
});

export type IncomeCreationType = z.infer<typeof IncomeCreationSchema>;
export type IncomeUpdateType = z.infer<typeof IncomeUpdateSchema>;
