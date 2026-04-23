import { prisma } from "@libs/DatabaseClient";
import type { Outcomes } from "@prisma/client";
import type { CreateOutcomeDto, UpdateOutcomeDto } from "types/DtoType";
import { OutcomeService } from "./outcome.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		outcomes: {
			create: jest.fn(),
			findMany: jest.fn(),
			findFirst: jest.fn(),
			update: jest.fn(),
		},
	},
}));

jest.mock("@libs/calculation", () => ({
	calculateTotalAmount: jest.fn().mockReturnValue(100),
	calculateTotalUnpaid: jest.fn().mockReturnValue(50),
	previousMonthGrowth: jest.fn().mockReturnValue(10),
}));

describe("Outcome service", () => {
	let outcomeService: OutcomeService;

	const validOutcome: Outcomes = {
		amount: 100,
		categoryId: "category-id",
		frequency: "none",
		id: "outcome-id",
		isDeleted: false,
		isPaid: false,
		isRecurring: false,
		issueDate: new Date("01/01/2026"),
		name: "Outcome",
		paidOn: new Date("01/01/2026"),
		propertyId: "property-id",
		providerId: "provider-id",
	};

	const validCreateOutcome: CreateOutcomeDto = {
		amount: 100,
		categoryId: "category-id",
		frequency: "none",
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		name: "Outcome",
		paidOn: new Date("01/01/2026"),
		isRecurring: false,
		propertyId: "property-id",
		providerId: "provider-id",
		isDeleted: false,
	};

	const validUpdateOutcome: UpdateOutcomeDto = {
		amount: 100,
		categoryId: "category-id",
		frequency: "none",
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		paidOn: new Date("01/01/2026"),
		id: "outcome-id",
		isRecurring: false,
		name: "Outcome",
		propertyId: "property-id",
		providerId: "provider-id",
		isDeleted: false,
	};

	beforeEach(() => {
		outcomeService = new OutcomeService();
		jest.clearAllMocks();
	});

	describe("Create outcome", () => {
		it("Doit créer une dépense valide", async () => {
			(prisma.outcomes.create as jest.Mock).mockResolvedValue(validOutcome);
			await outcomeService.createOutcome(validCreateOutcome);
			expect(prisma.outcomes.create).toHaveBeenCalledWith({
				data: {
					name: validCreateOutcome.name,
					amount: Number(validCreateOutcome.amount),
					isRecurring: validCreateOutcome.isRecurring,
					isPaid: validCreateOutcome.isPaid,
					issueDate: new Date(validCreateOutcome.issueDate),
					paidOn: new Date(validCreateOutcome.paidOn as Date),
					frequency: validCreateOutcome.frequency,
					propertyId: validCreateOutcome.propertyId,
					categoryId: validCreateOutcome.categoryId,
					providerId: validCreateOutcome.providerId,
				},
			});
		});

		it("Doit passer paidOn à null si absent", async () => {
			const outcomeWithoutPaidOn: CreateOutcomeDto = {
				...validCreateOutcome,
				paidOn: undefined,
			};
			(prisma.outcomes.create as jest.Mock).mockResolvedValue(validOutcome);
			await outcomeService.createOutcome(outcomeWithoutPaidOn);
			expect(prisma.outcomes.create).toHaveBeenCalledWith(
				expect.objectContaining({
					data: expect.objectContaining({ paidOn: null }),
				}),
			);
		});
	});

	describe("Browse outcome", () => {
		it("Doit retourner une liste de dépenses", async () => {
			(prisma.outcomes.findMany as jest.Mock).mockResolvedValue([validOutcome]);
			const result = await outcomeService.browseOutcome("user-id");
			expect(prisma.outcomes.findMany).toHaveBeenCalledWith({
				where: {
					isDeleted: false,
					property: {
						userId: "user-id",
					},
				},
				select: {
					id: true,
					name: true,
					amount: true,
					isRecurring: true,
					isPaid: true,
					issueDate: true,
					paidOn: true,
					frequency: true,
					isDeleted: true,
					property: {
						select: {
							id: true,
							name: true,
						},
					},
					provider: {
						select: {
							id: true,
							directories: true,
						},
					},
				},
			});
			expect(result).toEqual([validOutcome]);
		});
	});

	describe("Get outcome", () => {
		it("Doit retourner une dépense par id", async () => {
			(prisma.outcomes.findFirst as jest.Mock).mockResolvedValue(validOutcome);
			const result = await outcomeService.getOutcome("outcome-id", "user-id");
			expect(prisma.outcomes.findFirst).toHaveBeenCalledWith({
				where: {
					id: "outcome-id",
					property: {
						userId: "user-id",
					},
				},
			});
			expect(result).toEqual(validOutcome);
		});

		it("Doit retourner null si la dépense n'existe pas", async () => {
			(prisma.outcomes.findFirst as jest.Mock).mockResolvedValue(null);
			const result = await outcomeService.getOutcome("unknown-id", "user-id");
			expect(result).toBeNull();
		});
	});

	describe("Delete outcome", () => {
		it("Doit marquer la dépense comme supprimée", async () => {
			(prisma.outcomes.update as jest.Mock).mockResolvedValue({
				...validOutcome,
				isDeleted: true,
			});
			const result = await outcomeService.delete("outcome-id");
			expect(prisma.outcomes.update).toHaveBeenCalledWith({
				where: {
					id: "outcome-id",
				},
				data: {
					isDeleted: true,
				},
			});
			expect(result).toEqual({ ...validOutcome, isDeleted: true });
		});
	});

	describe("Update outcome", () => {
		it("Doit retourner la dépense modifiée", async () => {
			(prisma.outcomes.update as jest.Mock).mockResolvedValue(validOutcome);
			const result = await outcomeService.update(validUpdateOutcome);
			const { id, amount, ...data } = validUpdateOutcome;
			expect(prisma.outcomes.update).toHaveBeenCalledWith({
				where: {
					id,
				},
				data: {
					...data,
					amount: Number(amount),
				},
			});
			expect(result).toEqual(validOutcome);
		});
	});

	describe("Monthly loss", () => {
		it("Doit retourner les dépenses du mois courant", async () => {
			(prisma.outcomes.findMany as jest.Mock)
				.mockResolvedValueOnce([validOutcome])
				.mockResolvedValueOnce([]);
			const result = await outcomeService.monthlyLoss("user-id");
			expect(result.outcomes).toEqual([validOutcome]);
			expect(result.outcomesValue).toBe(1);
		});

		it("Doit appeler findMany avec les bons filtres pour le mois courant et le mois précédent", async () => {
			const now = new Date();
			const start = new Date(Date.UTC(now.getFullYear(), now.getMonth(), 1));
			const end = new Date(Date.UTC(now.getFullYear(), now.getMonth() + 1, 1));
			const startPreviousMonth = new Date(
				Date.UTC(now.getFullYear(), now.getMonth() - 1, 1),
			);
			const endPreviousMonth = new Date(
				Date.UTC(now.getFullYear(), now.getMonth(), 1),
			);

			(prisma.outcomes.findMany as jest.Mock)
				.mockResolvedValueOnce([validOutcome])
				.mockResolvedValueOnce([]);
			await outcomeService.monthlyLoss("user-id");

			expect(prisma.outcomes.findMany).toHaveBeenNthCalledWith(1, {
				orderBy: [{ issueDate: "desc" }],
				where: {
					issueDate: { gte: start, lt: end },
					property: { userId: "user-id" },
				},
			});
			expect(prisma.outcomes.findMany).toHaveBeenNthCalledWith(2, {
				orderBy: [{ issueDate: "desc" }],
				where: {
					issueDate: { gte: startPreviousMonth, lt: endPreviousMonth },
					property: { userId: "user-id" },
				},
			});
		});

		it("Doit retourner sum, growth et unpaidOutcomes calculés", async () => {
			(prisma.outcomes.findMany as jest.Mock)
				.mockResolvedValueOnce([validOutcome])
				.mockResolvedValueOnce([]);
			const result = await outcomeService.monthlyLoss("user-id");
			expect(result.sum).toBe(100);
			expect(result.growth).toBe(10);
			expect(result.unpaidOutcomes).toBe(50);
		});
	});
});
