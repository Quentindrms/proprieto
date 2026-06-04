import type { TitleBoardHeader } from "@app/types/board";

export const lastOutcomeBoardTitle: TitleBoardHeader[] = [
	{
		label: "Intitulé",
		slug: "title",
	},
	{
		label: "Date",
		slug: "date",
	},
	{
		label: "Montant",
		slug: "amount",
	},
	{
		label: "Catégorie",
		slug: "category",
	},
	{
		label: "Statut",
		slug: "status",
	},
];

export const contractorsBoardTitle: TitleBoardHeader[] = [
	{
		label: "Prestataire",
		slug: "contractor",
	},
	{
		label: "Spécialité",
		slug: "speciality",
	},
	{
		label: "Contact",
		slug: "contact",
	},
];

export const contractsBoardTitle: TitleBoardHeader[] = [
	{
		label: "Client",
		slug: "client",
	},
	{
		label: "Propriété",
		slug: "property",
	},
	{
		label: "Période",
		slug: "duration",
	},
	{
		label: "Loyer",
		slug: "loan",
	},
	{
		label: "Statut",
		slug: "statut",
	},
];

export const fluxBoardTitle: TitleBoardHeader[] = [
	{
		label: "Nom",
		slug: "name",
	},
	{
		label: "Catégorie",
		slug: "category",
	},
	{
		label: "Date d'échéance",
		slug: "issueDate",
	},
	{
		label: "Montant",
		slug: "amount",
	},
	{
		label: "Statut",
		slug: "statut",
	},
];

export const PropertyFluxBoardTitle: TitleBoardHeader[] = [
	{
		label: "Nom",
		slug: "name",
	},
	{
		label: "Date",
		slug: "date",
	},
	{
		label: "Montant",
		slug: "amount",
	},
	{
		label: "Statut",
		slug: "isPaid",
	},
];

export const PropertyClientBoardTitle: TitleBoardHeader[] = [
	{
		label: "Nom",
		slug: "name",
	},
	{
		label: "Période",
		slug: "period",
	},
	{
		label: "Montant total",
		slug: "totalAmount",
	},
];
