import { Test, type TestingModule } from "@nestjs/testing";
import type { Request, Response } from "express";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findFirst: jest.fn(),
	},
}));

const mockClientService = {
	createClient: jest.fn(),
	browseClient: jest.fn(),
	editClient: jest.fn(),
	deleteClient: jest.fn(),
};

const mockSend = jest.fn();
const mockStatus = jest.fn();
const mockRes = { status: mockStatus, send: mockSend } as unknown as Response;
const mockAuthentifiedReq = { user: { id: "user-id" } } as unknown as Request;
const mockUnauthentifiedReq = {} as unknown as Request;

describe("Client", () => {
	let clientController: ClientController;

	const validClient = {
		name: "Smith",
		firstName: "John",
		address: "10 rue de la paix, 75016 Paris",
		email: "john.smith@mail.com",
		phone: "0684529961",
	};

	const validEditClient = {
		id: "utilisateur",
		name: "Smith",
		firstName: "John",
		address: "10 rue de la paix, 75016 Paris",
		email: "john.smith@mail.com",
		phone: "0684529961",
	};

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ClientController],
			providers: [{ provide: ClientService, useValue: mockClientService }],
		}).compile();

		clientController = module.get<ClientController>(ClientController);
	});

	describe("Create", () => {
		it("Doit retourner un status 200 et success:true", async () => {
			mockClientService.createClient.mockResolvedValue({
				id: "identifiant",
				name: "Smith",
				firstName: "John",
				email: "john.smith@mail.com",
				address: "10 Rue de la Paix, 74016 Paris",
				phone: "0690204671",
				type: "client",
				userId: "identifiantClient",
			});

			await clientController.create(mockAuthentifiedReq, mockRes, {
				name: "Smith",
				firstName: "John",
				address: "10 rue de la paix, 75016 Paris",
				email: "john.smith@mail.com",
				phone: "0684529961",
			});
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({
				message: "success",
			});
		});

		it("Doit retourner un status 400 avec un message d'erreur", async () => {
			mockClientService.createClient.mockResolvedValue(null);
			await clientController.create(mockAuthentifiedReq, mockRes, validClient);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ message: "error" });
			expect(mockClientService.createClient).toHaveBeenCalledWith(
				validClient,
				"user-id",
			);
		});

		it("Doit retourner un status 401 sans appeler createClient", async () => {
			mockClientService.createClient.mockResolvedValue({});
			await clientController.create(
				mockUnauthentifiedReq,
				mockRes,
				validClient,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockClientService.createClient).not.toHaveBeenCalled();
		});
	});

	describe("Browse", () => {
		it("Doit retourner une erreur 401", async () => {
			await clientController.browse(mockUnauthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockClientService.browseClient).not.toHaveBeenCalled();
		});

		it("Doit retourner un status 200", async () => {
			mockClientService.browseClient.mockResolvedValue(["user"]);
			await clientController.browse(mockAuthentifiedReq, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith(["user"]);
			expect(mockClientService.browseClient).toHaveBeenCalled();
		});
	});

	describe("Edit", () => {
		it("Doit retourner une erreur 401", async () => {
			await clientController.edit(
				mockUnauthentifiedReq,
				mockRes,
				validEditClient,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({});
			expect(mockClientService.editClient).not.toHaveBeenCalledWith();
		});

		it("Doit retourner un statut 404 et un message d'erreur", async () => {
			mockClientService.editClient.mockResolvedValue(null);
			await clientController.edit(
				mockAuthentifiedReq,
				mockRes,
				validEditClient,
			);
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ message: "error" });
			expect(mockClientService.editClient).toHaveBeenCalledWith(
				"user-id",
				validEditClient,
			);
		});

		it("Doit retourner un statut 200 et un message de succès", async () => {
			mockClientService.editClient.mockResolvedValue(["user"]);
			await clientController.edit(
				mockAuthentifiedReq,
				mockRes,
				validEditClient,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ message: "success" });
			expect(mockClientService.editClient).toHaveBeenCalledWith(
				"user-id",
				validEditClient,
			);
		});
	});

	describe("Remove", () => {
		it("Doit retourner une erreur 401", async () => {
			await clientController.remove(
				mockUnauthentifiedReq,
				mockRes,
				"client-id",
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenLastCalledWith({});
			expect(mockClientService.deleteClient).not.toHaveBeenCalled();
		});

		it("Doit retourner une erreur 404 et un message d'erreur", async () => {
			mockClientService.deleteClient.mockResolvedValue(null);
			await clientController.remove(mockAuthentifiedReq, mockRes, "client-id");
			expect(mockStatus).toHaveBeenCalledWith(404);
			expect(mockSend).toHaveBeenCalledWith({ message: "error" });
			expect(mockClientService.deleteClient).toHaveBeenLastCalledWith(
				"user-id",
				"client-id",
			);
		});
	});
});
