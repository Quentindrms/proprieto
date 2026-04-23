import { prisma } from "@libs/DatabaseClient";
import type { Incomes } from "@prisma/browser";
import type { CreateIncomeDto, UpdateIncomeDto } from "types/DtoType";
import { IncomeService } from "./income.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		incomes: {
			create: jest.fn(),
			findMany: jest.fn(),
			findFirst: jest.fn(),
			update: jest.fn(),
		},
	},
}));

describe("Income service", () => {
	let incomeService: IncomeService;

	const validIncome: Incomes = {
		amount: 0,
		categoryId: "category-id",
		contractId: "contract-id",
		frequency: "none",
		id: "income-id",
		isDeleted: false,
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		name: "Income",
		paidOn: new Date("01/01/2026"),
	};

	const validCreateIncome: CreateIncomeDto = {
		amount: 0,
		categoryId: "category-id",
		contractId: "contract-id",
		frequency: "none",
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		name: "Income",
		paidOn: new Date("01/01/2026"),
	};

	const validUpdateIncome: UpdateIncomeDto = {
		amount: 0,
		contractId: "contract-id",
		frequency: "none",
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		paidOn: new Date("01/01/2026"),
		id: "income-id",
		categoryId: "category-id",
	};

	beforeEach(async () => {
		incomeService = new IncomeService();
		jest.clearAllMocks();
	});

	describe("Create income", () => {
		it("Doit retourner un revenu valide", async () => {
			(prisma.incomes.create as jest.Mock).mockResolvedValue(validIncome);
			await incomeService.create(validCreateIncome);
			expect(prisma.incomes.create).toHaveBeenCalledWith({
				data: {
					...validCreateIncome,
				},
			});
		});
	});

	describe("Browse income", () => {
		it("Doit retourner une liste de revenus", async () => {
			(prisma.incomes.findMany as jest.Mock).mockResolvedValue(["income"]);
			await incomeService.browse("user-id");
			expect(prisma.incomes.findMany).toHaveBeenCalledWith({
				where: {
					isDeleted: false,
					contract: {
						property: {
							userId: "user-id",
						},
					},
				},
			});
		});
	});

	describe("Get income", () => {
		it("Doit retourner un revenu", async () => {
			(prisma.incomes.findFirst as jest.Mock).mockResolvedValue("income");
			await incomeService.get("income-id");
			expect(prisma.incomes.findFirst).toHaveBeenCalledWith({
				where: {
					id: "income-id",
				},
			});
		});
	});

	describe("Delete income", () => {
		it("Doit retourner le revenu avec isDeleted:true", async () => {
			(prisma.incomes.update as jest.Mock).mockResolvedValue("isDeleted:true");
			const result = await incomeService.delete("income-id");
			expect(prisma.incomes.update).toHaveBeenCalledWith({
				where: {
					id: "income-id",
				},
				data: {
					isDeleted: true,
				},
			});
			expect(result).toBe("isDeleted:true");
		});
	});

	describe("Update income", () => {
		it("Doit retourner le revenu modifié", async () => {
			(prisma.incomes.update as jest.Mock).mockResolvedValue("isUpdated:true");
			const result = await incomeService.update(validUpdateIncome);
			const { id, amount, ...data } = validUpdateIncome;
			expect(prisma.incomes.update).toHaveBeenCalledWith({
				where: {
					id,
				},
				data: {
					amount: Number(amount),
					...data,
				},
			});
			expect(result).toBe("isUpdated:true");
		});
	});

	describe("Monthly profit", () => {
		it("Doit retourner les revenus du mois courant", async () => {
			(prisma.incomes.findMany as jest.Mock)
				.mockResolvedValueOnce([validIncome])
				.mockResolvedValueOnce([]);
			const result = await incomeService.monthlyProfit("user-id");
			expect(result.incomes).toEqual([validIncome]);
			expect(result.incomesValue).toBe(1);
		});

		it("Doit appeler findMany avec les bons filtres pour le mois courant et le mois précédent", async () => {
			const now = new Date();
			const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
			const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));
			const startPreviousMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth() - 1, 1));
			const endPreviousMonth = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));

			(prisma.incomes.findMany as jest.Mock)
				.mockResolvedValueOnce([validIncome])
				.mockResolvedValueOnce([]);
			await incomeService.monthlyProfit("user-id");

			expect(prisma.incomes.findMany).toHaveBeenNthCalledWith(1, {
				orderBy: [{ issueDate: "asc" }],
				where: {
					issueDate: { gte: start, lt: end },
					contract: { property: { userId: "user-id" } },
				},
			});
			expect(prisma.incomes.findMany).toHaveBeenNthCalledWith(2, {
				orderBy: [{ issueDate: "asc" }],
				where: {
					issueDate: { gte: startPreviousMonth, lt: endPreviousMonth },
					contract: { property: { userId: "user-id" } },
				},
			});
		});
	});
});
