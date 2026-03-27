import { z } from "zod";

const idSchema = z.string("Identifiant contract invalide");

const startDateSchema = z.coerce.date("Le format de date est invalide");

const endDateSchema = z.coerce.date("Le format de date est invalide");

const leaseSchema = z.coerce.number("Le loyer doit être un nombre");

const propertyIdSchema = z.string("Identifiant de propriété invalide");

const clientIdSchema = z.string("Identifiant client invalide");

export const CreateContractSchema = z.object({
	startDate: startDateSchema,
	endDate: endDateSchema,
	lease: leaseSchema,
	property: propertyIdSchema,
	clientId: clientIdSchema,
});

export const UpdateContractSchema = z.object({
	id: idSchema,
	startDate: startDateSchema,
	endDate: endDateSchema,
	lease: leaseSchema,
	property: propertyIdSchema,
	clientId: clientIdSchema,
});

export type CreateContractType = z.infer<typeof CreateContractSchema>;
export type UpdateContractType = z.infer<typeof UpdateContractSchema>;
