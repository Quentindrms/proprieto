import { z } from "zod";

const idSchema = z.string("Identifiant contract invalide");

const startDateSchema = z.coerce.date("Le format de date est invalide");

const endDateSchema = z.coerce.date("Le format de date est invalide");

const leaseSchema = z.coerce
	.number("Le loyer doit être un nombre")
	.min(1, "Le loyer ne peut pas être inférieur à 1");

const propertyIdSchema = z.string();

const clientIdSchema = z.uuid();

export const CreateContractSchema = z.object({
	startDate: startDateSchema,
	endDate: endDateSchema,
	lease: leaseSchema,
	propertyId: propertyIdSchema,
	clientId: clientIdSchema,
});

export const UpdateContractSchema = z.object({
	id: idSchema,
	startDate: startDateSchema,
	endDate: endDateSchema,
	lease: leaseSchema,
	propertyId: propertyIdSchema,
	clientId: clientIdSchema,
});

export type CreateContractType = z.infer<typeof CreateContractSchema>;
export type UpdateContractType = z.infer<typeof UpdateContractSchema>;
