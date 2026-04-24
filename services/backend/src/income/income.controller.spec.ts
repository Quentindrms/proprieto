import { Test, type TestingModule } from "@nestjs/testing";
import type { Incomes } from "generated/prisma/client";
import type { CreateIncomeDto, UpdateIncomeDto } from "types/DtoType";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { IncomeController } from "./income.controller";
import { IncomeService } from "./income.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findMany: jest.fn(),
		findFirst: jest.fn(),
		update: jest.fn(),
	},
}));

const mockIncomeService = {
	create: jest.fn(),
	browse: jest.fn(),
	get: jest.fn(),
	delete: jest.fn(),
	update: jest.fn(),
	monthlyProfit: jest.fn(),
	previousMonth: jest.fn(),
};

describe("Income", () => {
	let incomeController: IncomeController;

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
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [IncomeController],
			providers: [{ provide: IncomeService, useValue: mockIncomeService }],
		}).compile();

		incomeController = module.get<IncomeController>(IncomeController);
	});

	describe("Income controller", () => {
		describe("Create", () => {
			it("Doit retourner une erreur 401", async () => {
				mockIncomeService.create.mockResolvedValue(validIncome);
				await incomeController.create(
					mockUnauthentifiedReq,
					mockRes,
					validCreateIncome,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockIncomeService.create).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404 et un message d'erreur", async () => {
				mockIncomeService.create.mockResolvedValue(null);
				await incomeController.create(
					mockAuthentifiedReq,
					mockRes,
					validCreateIncome,
				);
				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({ message: "error" });
				expect(mockIncomeService.create).toHaveBeenCalledWith(
					validCreateIncome,
				);
			});

			it("Doit retourner un statut 200 et un message de succès", async () => {
				mockIncomeService.create.mockResolvedValue(validIncome);
				await incomeController.create(
					mockAuthentifiedReq,
					mockRes,
					validCreateIncome,
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockIncomeService.create).toHaveBeenCalledWith(
					validCreateIncome,
				);
			});
		});

		describe("Browse", () => {
			it("Doit retourner un statut 401", async () => {
				await incomeController.browseIncomes(mockUnauthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenLastCalledWith(401);
				expect(mockSend).toHaveBeenLastCalledWith({});
				expect(mockIncomeService.browse).not.toHaveBeenCalled();
			});
			it("Doit retourner un statut 200 et une liste de contrats", async () => {
				mockIncomeService.browse.mockResolvedValue(["income"]);
				await incomeController.browseIncomes(mockAuthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith(["income"]);
				expect(mockIncomeService.browse).toHaveBeenCalledWith("user-id");
			});
		});

		describe("Monthly", () => {
			it("Doit retourner un statut 401", async () => {
				await incomeController.getMonthlyProfit(mockUnauthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockIncomeService.monthlyProfit).not.toHaveBeenCalled();
			});

			it("Doit retourner un statut 200 et une liste de revenus", async () => {
				mockIncomeService.monthlyProfit.mockResolvedValue(["income"]);
				await incomeController.getMonthlyProfit(mockAuthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith(["income"]);
				expect(mockIncomeService.monthlyProfit).toHaveBeenCalledWith("user-id");
			});
		});

		describe("Get income by id", () => {
			it("Doit retourner un statut 401", async () => {
				await incomeController.get(mockUnauthentifiedReq, mockRes, "income-id");
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenLastCalledWith({});
				expect(mockIncomeService.get).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404", async () => {
				mockIncomeService.get.mockResolvedValue(null);
				await incomeController.get(mockAuthentifiedReq, mockRes, "income-id");
				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockIncomeService.get).toHaveBeenCalledWith("income-id");
			});

			it("Doit retourner un statut 200 et une dépense", async () => {
				mockIncomeService.get.mockResolvedValue(validIncome);
				await incomeController.get(mockAuthentifiedReq, mockRes, "income-id");
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenLastCalledWith(validIncome);
				expect(mockIncomeService.get).toHaveBeenCalledWith("income-id");
			});
		});

		describe("Delete", () => {
			it("Doit retourner une erreur 401", async () => {
				await incomeController.delete(
					mockUnauthentifiedReq,
					mockRes,
					"income-id",
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockIncomeService.delete).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404 et un message d'erreur", async () => {
				mockIncomeService.delete.mockResolvedValue(null);
				await incomeController.delete(
					mockAuthentifiedReq,
					mockRes,
					"income-id",
				);
				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({ message: "error" });
				expect(mockIncomeService.delete).toHaveBeenLastCalledWith("income-id");
			});

			it("Doit retourner un statut 200 et un message de succès", async () => {
				mockIncomeService.delete.mockResolvedValue("income");
				await incomeController.delete(
					mockAuthentifiedReq,
					mockRes,
					"income-id",
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockIncomeService.delete).toHaveBeenCalledWith("income-id");
			});
		});

		describe("Update", () => {
			it("Doit retourner une erreur 401", async () => {
				await incomeController.update(
					mockUnauthentifiedReq,
					mockRes,
					validUpdateIncome,
				);
				expect(mockStatus).toHaveBeenLastCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockIncomeService.update).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404 et un message d'erreur", async () => {
				mockIncomeService.update.mockResolvedValue(undefined);
				const response = await incomeController.update(
					mockAuthentifiedReq,
					mockRes,
					validUpdateIncome,
				);
				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({ message: "error" });
				expect(mockIncomeService.update).toHaveBeenCalledWith(
					validUpdateIncome,
				);
				expect(response).toBe(undefined);
			});

			it("Doit retourner un statut 200 et un message de succès", async () => {
				mockIncomeService.update.mockResolvedValue(validIncome);
				await incomeController.update(
					mockAuthentifiedReq,
					mockRes,
					validUpdateIncome,
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockIncomeService.update).toHaveBeenCalledWith(
					validUpdateIncome,
				);
			});
		});
	});
});
