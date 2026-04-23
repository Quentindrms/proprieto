import { Test, type TestingModule } from "@nestjs/testing";
import type { CreateProviderDto, UpdateProviderDto } from "types/DtoType";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		directories: {
			create: jest.fn(),
			update: jest.fn(),
		},
		providers: {
			findMany: jest.fn(),
			update: jest.fn(),
		},
	},
}));

const mockProviderService = {
	create: jest.fn(),
	browse: jest.fn(),
	edit: jest.fn(),
	remove: jest.fn(),
};

describe("Provider", () => {
	let providerController: ProviderController;

	const validCreateProvider: CreateProviderDto = {
		name: "Dupont",
		firstName: "Jean",
		email: "jean.dupont@example.com",
		address: "12 rue de la Paix",
		phone: "0600000000",
	};

	const validUpdateProvider: UpdateProviderDto = {
		id: "provider-id",
		name: "Dupont",
		firstName: "Jean",
		email: "jean.dupont@example.com",
		address: "12 rue de la Paix",
		phone: "0600000000",
	};

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [ProviderController],
			providers: [{ provide: ProviderService, useValue: mockProviderService }],
		}).compile();

		providerController = module.get<ProviderController>(ProviderController);
	});

	describe("Provider controller", () => {
		describe("Create", () => {
			it("Doit retourner une erreur 401", async () => {
				await providerController.createProvider(
					mockUnauthentifiedReq,
					mockRes,
					validCreateProvider,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockProviderService.create).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 422", async () => {
				mockProviderService.create.mockResolvedValue(null);
				await providerController.createProvider(
					mockAuthentifiedReq,
					mockRes,
					validCreateProvider,
				);
				expect(mockStatus).toHaveBeenCalledWith(422);
				expect(mockSend).toHaveBeenCalledWith({ message: "error" });
				expect(mockProviderService.create).toHaveBeenCalledWith(
					validCreateProvider,
					"user-id",
				);
			});

			it("Doit retourner un statut 201 avec un message de succès", async () => {
				mockProviderService.create.mockResolvedValue("provider");
				await providerController.createProvider(
					mockAuthentifiedReq,
					mockRes,
					validCreateProvider,
				);
				expect(mockStatus).toHaveBeenCalledWith(201);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockProviderService.create).toHaveBeenCalledWith(
					validCreateProvider,
					"user-id",
				);
			});
		});

		describe("Browse", () => {
			it("Doit retourner une erreur 401", async () => {
				await providerController.browseprovider(
					mockUnauthentifiedReq,
					mockRes,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockProviderService.browse).not.toHaveBeenCalled();
			});

			it("Doit retourner un statut 200 avec une liste de providers", async () => {
				mockProviderService.browse.mockResolvedValue(["provider"]);
				await providerController.browseprovider(mockAuthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith(["provider"]);
				expect(mockProviderService.browse).toHaveBeenCalledWith("user-id");
			});
		});
	});
});
