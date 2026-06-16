import { ConflictException, NotFoundException } from "@nestjs/common";
import { Test, type TestingModule } from "@nestjs/testing";
import type {
	CreateContractDto,
	UpdateContractDto,
} from "@src/dto/contract.dto";
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
	readDetailsByPropertySlug: jest.fn(),
	contractDetails: jest.fn(),
	readDetails: jest.fn(),
	update: jest.fn(),
	deleteContract: jest.fn(),
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

	const validUpdateContract: UpdateContractDto = {
		startDate: "01/01/2025",
		endDate: "01/01/2026",
		lease: 500,
		id: "id",
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

		it("Doit retourner un statut 200 et un message de succès", async () => {
			mockContractService.create.mockResolvedValue("contract");
			await contractController.createContract(
				mockAuthentifiedReq,
				mockRes,
				validContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ message: "success" });
		});
	});

	describe("Update", () => {
		it("Doit retourner une erreur 401", async () => {
			mockContractService.create.mockResolvedValue(new ConflictException());
			await contractController.createContract(
				mockUnauthentifiedReq,
				mockRes,
				validContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
		});

		it("Doit retourner une erreur 404", async () => {
			await contractController.updateContract(
				mockAuthentifiedReq,
				mockRes,
				validUpdateContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ message: "Not found" });
			expect(mockContractService.update).toHaveBeenCalledWith(
				validUpdateContract,
				"user-id",
			);
		});

		it("Doit retourner un statut 200 et un message de succès", async () => {
			mockContractService.update.mockResolvedValue("success");
			await contractController.updateContract(
				mockAuthentifiedReq,
				mockRes,
				validUpdateContract,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ message: "success" });
			expect(mockContractService.update).toHaveBeenCalledWith(
				validUpdateContract,
				"user-id",
			);
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

	describe("Get contract by property slug", () => {
		it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", async () => {
			await contractController.getContractByPropertySlug(
				mockUnauthentifiedReq,
				mockRes,
				"slug",
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith();
		});

		it("Doit retourner une liste de contrats", async () => {
			mockContractService.readDetailsByPropertySlug.mockResolvedValue([
				"contract",
			]);
			await contractController.getContractByPropertySlug(
				mockAuthentifiedReq,
				mockRes,
				"slug",
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["contract"]);
		});
	});

	describe("Contract details", () => {
		it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", async () => {
			await contractController.contractDetails(
				mockUnauthentifiedReq,
				mockRes,
				"id",
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith();
		});

		it("Doit retourner une NotFoundException", async () => {
			mockContractService.readDetails.mockResolvedValue(
				new NotFoundException(),
			);
			await contractController.contractDetails(
				mockAuthentifiedReq,
				mockRes,
				"id",
			);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ message: "Not Found" });
			expect(mockContractService.readDetails).toHaveBeenCalledWith("id");
		});

		it("Doit retourner un statut 200 et un contrat", async () => {
			mockContractService.readDetails.mockResolvedValue("contract");
			await contractController.contractDetails(
				mockAuthentifiedReq,
				mockRes,
				"id",
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith("contract");
			expect(mockContractService.readDetails).toHaveBeenCalledWith("id");
		});
	});

	describe("Delete contract", () => {
		it("Doit retourner une erreur 401 si l'utilisateur n'est pas authentifié", async () => {
			await contractController.deleteContract(
				mockUnauthentifiedReq,
				mockRes,
				"id",
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith();
			expect(mockContractService.deleteContract).not.toHaveBeenCalled();
		});

		it("Doit retourner une erreur 404", async () => {
			mockContractService.deleteContract.mockResolvedValue(
				new NotFoundException(),
			);
			await contractController.deleteContract(mockAuthentifiedReq, mockRes, "");
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith("Not Found");
		});

		it("Doit retourner un statut 200 et un succès", async () => {
			mockContractService.deleteContract.mockResolvedValue(true);
			await contractController.deleteContract(
				mockAuthentifiedReq,
				mockRes,
				"id",
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ success: true });
			expect(mockContractService.deleteContract).toHaveBeenCalledWith(
				"id",
				"user-id",
			);
		});
	});
});
