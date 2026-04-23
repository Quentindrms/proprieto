import { prisma } from "@libs/DatabaseClient";
import { Test, type TestingModule } from "@nestjs/testing";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { IncomeCategoryController } from "./incomeCategory.controller";
import { IncomeCategoryService } from "./incomeCategory.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		categories: {
			findMany: jest.fn(),
		},
	},
}));

const mockIncomeCategoryService = {
	browseCategories: jest.fn(),
};

describe("Income category", () => {
	let incomeCategoryController: IncomeCategoryController;

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [IncomeCategoryController],
			providers: [
				{ provide: IncomeCategoryService, useValue: mockIncomeCategoryService },
			],
		}).compile();

		incomeCategoryController = module.get<IncomeCategoryController>(
			IncomeCategoryController,
		);
	});

	describe("Browse", () => {
		it("Doit retourner une erreur 401", async () => {
			await incomeCategoryController.browse(mockUnauthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockIncomeCategoryService.browseCategories).not.toHaveBeenCalled();
		});

		it("Doit retourner une liste de catégories", async () => {
			mockIncomeCategoryService.browseCategories.mockResolvedValue(["category"]);
			await incomeCategoryController.browse(mockAuthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["category"]);
			expect(mockIncomeCategoryService.browseCategories).toHaveBeenCalled();
		});
	});
});
