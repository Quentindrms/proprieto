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
	await prisma.incomeCategory.createMany({
		data: [
			{ name: "Loyer", slug: "loan" },
			{ name: "Caution", slug: "guarantee" },
			{ name: "Remboursement", slug: "repayment" },
		],
		skipDuplicates: true,
	});
}

export async function seed() {
	await outcomeCategory();
	await incomeCategory();
}
