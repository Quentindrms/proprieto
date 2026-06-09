import { ConflictException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type { CreateContractDto } from "@src/dto/contract.dto";
import type { Request, Response } from "express";
import { ContractController } from "./contract.controller";
import { ContractService } from "./contract.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findMany: jest.fn(),
	},
}));

const mockContractService = {
	create: jest.fn(),
	browse: jest.fn(),
};

const mockSend = jest.fn();
const mockStatus = jest.fn();
const mockRes = { status: mockStatus, send: mockSend } as unknown as Response;
const mockAuthentifiedReq = { user: { id: "user-id" } } as unknown as Request;
const mockUnauthentifiedReq = {} as unknown as Request;

describe("Contract", () => {
	let contractController: ContractController;

	const validContract: CreateContractDto = {
		clientId: "client-id",
		endDate: "01/04/2026",
		lease: 500,
		propertyId: "property-id",
		startDate: "01/01/2026",
	};

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ContractController],
			providers: [{ provide: ContractService, useValue: mockContractService }],
		}).compile();

		contractController = module.get<ContractController>(ContractController);
	});

	describe("Create", () => {
		it("Doit retourner une erreur 401", async () => {
			mockContractService.create.mockResolvedValue(new ConflictException());
			await contractController.createContract(
				mockUnauthentifiedReq,
				mockRes,
				validContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockContractService.browse).not.toHaveBeenCalled();
		});

		it("Doit retourner une erreur 409 si le contrat est en conflit", async () => {
			mockContractService.create.mockResolvedValue(new ConflictException());
			await contractController.createContract(
				mockAuthentifiedReq,
				mockRes,
				validContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(409);
			expect(mockSend).toHaveBeenCalledWith({ message: "Conflict" });
			expect(mockContractService.create).toHaveBeenCalledWith(validContract);
		});
	});

	describe("Browse", () => {
		it("Doit retourner un statut 200 et une liste de contrats", async () => {
			mockContractService.browse.mockResolvedValue(["contract"]);
			await contractController.browseContract(mockAuthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["contract"]);
			expect(mockContractService.browse).toHaveBeenCalledWith("user-id");
		});
	});
});
