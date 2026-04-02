import { prisma } from "../libs/DatabaseClient";

async function outcomeCategory() {
	await prisma.categories.createMany({
		data: [
			{ label: "Assurance", slug: "insurance", type: "outcome" },
			{ label: "Travaux", slug: "work", type: "outcome" },
			{ label: "Emprunt", slug: "loan", type: "outcome" },
			{ label: "Eau", slug: "water", type: "outcome" },
			{ label: "Électricité", slug: "electricity", type: "outcome" },
		],
		skipDuplicates: true,
	});
}

async function incomeCategory() {
	await prisma.categories.createMany({
		data: [
			{ label: "Loyer", slug: "loan", type: "income" },
			{ label: "Caution", slug: "guarantee", type: "income" },
			{ label: "Remboursement", slug: "repayment", type: "income" },
		],
		skipDuplicates: true,
	});
}

async function propertyType() {
	await prisma.propertyTypes.createMany({
		data: [
			{ name: "Appartement", slug: "apartment" },
			{ name: "Maison", slug: "house" },
			{ name: "Bureau", slug: "office" },
			{ name: "Garage", slug: "garage" },
		],
		skipDuplicates: true,
	});
}

export async function seed() {
	await outcomeCategory();
	await incomeCategory();
	await propertyType();
}
