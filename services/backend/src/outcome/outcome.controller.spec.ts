import { Test, type TestingModule } from "@nestjs/testing";
import type { Outcomes } from "@prisma/client";
import { IncomeController } from "@src/income/income.controller";
import type {
	CreateIncomeDto,
	CreateOutcomeDto,
	UpdateIncomeDto,
	UpdateOutcomeDto,
} from "types/DtoType";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { OutcomeController } from "./outcome.controller";
import { OutcomeService } from "./outcome.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findMany: jest.fn(),
		findFirst: jest.fn(),
		update: jest.fn(),
	},
}));

const mockOutcomeService = {
	createOutcome: jest.fn(),
	browseOutcome: jest.fn(),
	getOutcome: jest.fn(),
	delete: jest.fn(),
	update: jest.fn(),
	monthlyLoss: jest.fn(),
};

describe("Outcome", () => {
	let outcomeController: OutcomeController;

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
		providerId: "",
		isDeleted: false,
	};

	const validUpdateOutcome: UpdateOutcomeDto = {
		amount: 100,
		categoryId: "category-id",
		frequency: "none",
		isPaid: false,
		issueDate: new Date("01/01/2026"),
		paidOn: new Date("01/01/2026"),
		id: "",
		isRecurring: false,
		name: "outcome",
		propertyId: "property-id",
		providerId: "provider-id",
		isDeleted: true,
	};

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [OutcomeController],
			providers: [{ provide: OutcomeService, useValue: mockOutcomeService }],
		}).compile();
		outcomeController = module.get<OutcomeController>(OutcomeController);
	});

	describe("Create income", () => {
		it("Doit retourner une erreur 401", async () => {
			await outcomeController.create(
				mockUnauthentifiedReq,
				mockRes,
				validCreateOutcome,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockOutcomeService.createOutcome).not.toHaveBeenCalled();
		});

		it("Doit retourner une erreur 403", async () => {
			mockOutcomeService.createOutcome.mockResolvedValue(null);
			const response = await outcomeController.create(
				mockAuthentifiedReq,
				mockRes,
				validCreateOutcome,
			);
			expect(mockStatus).toHaveBeenCalledWith(403);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockOutcomeService.createOutcome).toHaveBeenCalledWith(
				validCreateOutcome,
			);
			expect(response).toBeUndefined();
		});

		it("Doit retourner un statut 200 et un message de succès", async () => {
			mockOutcomeService.createOutcome.mockResolvedValue(validOutcome);
			const response = await outcomeController.create(
				mockAuthentifiedReq,
				mockRes,
				validCreateOutcome,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ message: "success" });
			expect(mockOutcomeService.createOutcome).toHaveBeenCalledWith(
				validCreateOutcome,
			);
			expect(response).toEqual(validOutcome);
		});
	});

	describe("Browse", () => {
		it("Doit retourner une erreur 401", async () => {
			await outcomeController.browse(mockUnauthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockOutcomeService.browseOutcome).not.toHaveBeenCalled();
		});

		it("Doit retourner un statut 200 avec une liste de dépense", async () => {
			mockOutcomeService.browseOutcome.mockResolvedValue(["outcome"]);
			const response = await outcomeController.browse(
				mockAuthentifiedReq,
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["outcome"]);
			expect(mockOutcomeService.browseOutcome).toHaveBeenCalledWith("user-id");
		});
	});

	describe("Get monthly loss", () => {
		it("Doit retourner une erreur 401", async () => {
			await outcomeController.browse(mockUnauthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockOutcomeService.monthlyLoss).not.toHaveBeenCalled();
		});

		it("Doit retourner un statut 200 et une liste de dépenses", async () => {
			mockOutcomeService.monthlyLoss.mockResolvedValue(["outcome"]);
			const response = await outcomeController.getMonthlyLoss(
				mockAuthentifiedReq,
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["outcome"]);
			expect(mockOutcomeService.monthlyLoss).toHaveBeenCalledWith("user-id");
			expect(response).toEqual(["outcome"]);
		});
	});
});
