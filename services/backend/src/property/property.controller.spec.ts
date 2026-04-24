import { Test, type TestingModule } from "@nestjs/testing";
import type { PropertyTypes } from "generated/prisma/client";
import type { CreatePropertyDto, UpdatePropertyDto } from "types/DtoType";
import {
	mockAuthentifiedReq,
	mockRes,
	mockSend,
	mockStatus,
	mockUnauthentifiedReq,
} from "../../test/libs";
import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findMany: jest.fn(),
		update: jest.fn(),
		count: jest.fn(),
	},
}));

const mockPropertyService = {
	create: jest.fn(),
	browseProperties: jest.fn(),
	updateProperty: jest.fn(),
	deleteProperty: jest.fn(),
	browseType: jest.fn(),
	countProperties: jest.fn(),
};

describe("Property", () => {
	let propertyController: PropertyController;

	const validProperty: PropertyTypes = {
		id: "property-id",
		name: "property",
		slug: "",
	};

	const validCreateProperty: CreatePropertyDto = {
		isActive: true,
		name: "property",
		type: "house",
		purchaseDate: new Date("01/01/2026"),
		purchasePrice: 1000,
	};

	const validUpdateProperty: UpdatePropertyDto = {
		name: "property",
		type: "house",
		purchaseDate: new Date("01/01/2026"),
		purchasePrice: 1000,
		id: "property-id",
		sellDate: new Date("01/01/2026"),
		sellPrice: 1001,
	};

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [PropertyController],
			providers: [{ provide: PropertyService, useValue: mockPropertyService }],
		}).compile();

		propertyController = module.get<PropertyController>(PropertyController);
	});

	describe("Property controller", () => {
		describe("Create", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.createProperty(
					mockUnauthentifiedReq,
					mockRes,
					validCreateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.create).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 422", async () => {
				mockPropertyService.create.mockResolvedValue(null);
				const response = await propertyController.createProperty(
					mockAuthentifiedReq,
					mockRes,
					validCreateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(422);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.create).toHaveBeenCalledWith(
					validCreateProperty,
					"user-id",
				);
				expect(response).toBeUndefined();
			});
		});

		describe("Browse", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.browseProperties(
					mockUnauthentifiedReq,
					mockRes,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.browseProperties).not.toHaveBeenCalled();
			});

			it("Doit retourner un statut 200 avec une liste de propriétés", async () => {
				mockPropertyService.browseProperties.mockResolvedValue(["property"]);
				await propertyController.browseProperties(mockAuthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith(["property"]);
				expect(mockPropertyService.browseProperties).toHaveBeenCalledWith(
					"user-id",
				);
			});
		});

		describe("Update", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.updateProperty(
					mockUnauthentifiedReq,
					mockRes,
					validUpdateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.updateProperty).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404", async () => {
				mockPropertyService.updateProperty.mockResolvedValue(null);
				const result = await propertyController.updateProperty(
					mockAuthentifiedReq,
					mockRes,
					validUpdateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(
					validUpdateProperty,
				);
				expect(result).toBeUndefined();
			});

			it("Doit rertourner un statut 200 avec un message de succès", async () => {
				mockPropertyService.updateProperty.mockResolvedValue("property");
				await propertyController.updateProperty(
					mockAuthentifiedReq,
					mockRes,
					validUpdateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockPropertyService.updateProperty).toHaveBeenCalledWith(
					validUpdateProperty,
				);
			});
		});

		describe("Delete", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.deleteProperty(
					mockUnauthentifiedReq,
					mockRes,
					"property-id",
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.deleteProperty).not.toHaveBeenCalled();
			});

			it("Doit retourner une erreur 404", async () => {
				mockPropertyService.deleteProperty.mockResolvedValue(null);
				await propertyController.deleteProperty(
					mockAuthentifiedReq,
					mockRes,
					"property-id",
				);

				expect(mockStatus).toHaveBeenCalledWith(404);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(
					"property-id",
				);
			});

			it("Doit retourner un statut 200 avec un message de succès", async () => {
				mockPropertyService.deleteProperty.mockResolvedValue("property");
				await propertyController.deleteProperty(
					mockAuthentifiedReq,
					mockRes,
					"property-id",
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockPropertyService.deleteProperty).toHaveBeenCalledWith(
					"property-id",
				);
			});
		});

		describe("Browse types", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.browsePropertyTypes(
					mockUnauthentifiedReq,
					mockRes,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.browseType).not.toHaveBeenCalled();
			});

			it("Doit retourner un statut 200 avec la liste des types", async () => {
				mockPropertyService.browseType.mockResolvedValue([validProperty]);
				await propertyController.browsePropertyTypes(
					mockAuthentifiedReq,
					mockRes,
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith([validProperty]);
				expect(mockPropertyService.browseType).toHaveBeenCalled();
			});
		});

		describe("Count", () => {
			it("Doit retourner une erreur 401", async () => {
				await propertyController.countProperties(
					mockUnauthentifiedReq,
					mockRes,
				);
				expect(mockStatus).toHaveBeenCalledWith(401);
				expect(mockSend).toHaveBeenCalledWith({});
				expect(mockPropertyService.countProperties).not.toHaveBeenCalled();
			});

			it("Doit retourner un statut 200 avec le nombre de propriétés", async () => {
				mockPropertyService.countProperties.mockResolvedValue(3);
				await propertyController.countProperties(mockAuthentifiedReq, mockRes);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith(3);
				expect(mockPropertyService.countProperties).toHaveBeenCalledWith(
					"user-id",
				);
			});
		});

		describe("Create success", () => {
			it("Doit retourner un statut 200 avec un message de succès", async () => {
				mockPropertyService.create.mockResolvedValue("property");
				await propertyController.createProperty(
					mockAuthentifiedReq,
					mockRes,
					validCreateProperty,
				);
				expect(mockStatus).toHaveBeenCalledWith(200);
				expect(mockSend).toHaveBeenCalledWith({ message: "success" });
				expect(mockPropertyService.create).toHaveBeenCalledWith(
					validCreateProperty,
					"user-id",
				);
			});
		});
	});
});
