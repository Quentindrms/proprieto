import { prisma } from "../libs/DatabaseClient";

async function outcomeCategory() {
	await prisma.outcomeCategory.createMany({
		data: [
			{ name: "Assurance", slug: "insurance" },
			{ name: "Travaux", slug: "work" },
			{ name: "Emprunt", slug: "loan" },
			{ name: "Eau", slug: "water" },
			{ name: "Électricité", slug: "electricity" },
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
