import { Test, type TestingModule } from "@nestjs/testing";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { OutcomeCategoryController } from "./outcomeCategory.controller";
import { OutcomeCategoryService } from "./outcomeCategory.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		categories: {
			findMany: jest.fn(),
		},
	},
}));

const mockOutcomeCategoryService = {
	browseCategory: jest.fn(),
};

describe("Outcome category", () => {
	let outcomeCategoryController: OutcomeCategoryController;

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OutcomeCategoryController],
			providers: [
				{
					provide: OutcomeCategoryService,
					useValue: mockOutcomeCategoryService,
				},
			],
		}).compile();

		outcomeCategoryController = module.get<OutcomeCategoryController>(
			OutcomeCategoryController,
		);
	});

	describe("Browse", () => {
		it("Doit retourner une erreur 401", async () => {
			await outcomeCategoryController.browseCategory(
				mockUnauthentifiedReq,
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockOutcomeCategoryService.browseCategory).not.toHaveBeenCalled();
		});

		it("Doit retourner une liste de catégories", async () => {
			mockOutcomeCategoryService.browseCategory.mockResolvedValue(["category"]);
			await outcomeCategoryController.browseCategory(
				mockAuthentifiedReq,
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["category"]);
			expect(mockOutcomeCategoryService.browseCategory).toHaveBeenCalled();
		});
	});
});
