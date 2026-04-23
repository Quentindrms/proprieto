import { prisma } from "@libs/DatabaseClient";
import { OutcomeCategoryService } from "./outcomeCategory.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: { categories: { findMany: jest.fn() } },
}));

describe("Outcome category service", () => {
	let outcomeCategoryService: OutcomeCategoryService;

	beforeEach(async () => {
		outcomeCategoryService = new OutcomeCategoryService();
		jest.clearAllMocks();
	});

	describe("Browse categories", () => {
		it("Doit retourner une liste de catégories", async () => {
			(prisma.categories.findMany as jest.Mock).mockResolvedValue(["category"]);
			await outcomeCategoryService.browseCategory();
			expect(prisma.categories.findMany).toHaveBeenCalledWith({
				where: {
					type: "outcome",
				},
			});
		});
	});
});
