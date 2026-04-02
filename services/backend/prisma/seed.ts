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
			{ label: "Loyer", slug: "loan", type: "incpme" },
			{ label: "Caution", slug: "guarantee", type: "income" },
			{ label: "Remboursement", slug: "repayment", type: "income" },
		],
		skipDuplicates: true,
	});
}

export async function seed() {
	await outcomeCategory();
	await incomeCategory();
}
