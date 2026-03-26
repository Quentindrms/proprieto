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

export async function seed() {
	await outcomeCategory();
}
