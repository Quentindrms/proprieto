import { z } from "zod";

export const nameSchema = z
	.string()
	.min(10, "Le nom d'une propriété doit contenir au moins 10 caractères")
	.max(150, "Le nom d'une propriété ne peut exécéder 150 caractères");
export const purchasePriceSchema = z.coerce.number(
	"Le prix doit être un nombre",
);
export const purchaseDateSchema = z.coerce.date(
	"Le format de la date est invalide",
);
export const sellpriceSchema = z.int("Le prix doit être un nombre").optional();
export const sellDateSchema = z
	.date("Le format de la date est invalide")
	.optional();

export const PropertyCreationSchema = z.object({
	name: nameSchema,
	purchasePrice: purchasePriceSchema,
	purchaseDate: purchaseDateSchema,
	sellPrice: sellpriceSchema,
	sellDate: sellDateSchema,
});

export type PropertyCreationType = z.infer<typeof PropertyCreationSchema>;
