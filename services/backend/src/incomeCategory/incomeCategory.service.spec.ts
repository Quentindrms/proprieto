import { prisma } from "@libs/DatabaseClient";
import { IncomeCategoryService } from "./incomeCategory.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: { categories: { findMany: jest.fn() } },
}));

describe("Income category service", () => {
	let incomeCategoryService: IncomeCategoryService;

	beforeEach(async () => {
		incomeCategoryService = new IncomeCategoryService();
		jest.clearAllMocks();
	});

	describe("Doit retourner une liste de catégories", () => {
		it("Doit retourner une liste de catégories", async () => {
			(prisma.categories.findMany as jest.Mock).mockResolvedValue(["category"]);
			await incomeCategoryService.browseCategories();
			expect(prisma.categories.findMany).toHaveBeenCalledWith({
				where: {
					type: "income",
				},
			});
		});
	});
});
