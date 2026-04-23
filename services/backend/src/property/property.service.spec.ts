import { prisma } from "@libs/DatabaseClient";
import type { CreatePropertyDto, UpdatePropertyDto } from "types/DtoType";
import { PropertyService } from "./property.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		properties: {
			create: jest.fn(),
			findMany: jest.fn(),
			update: jest.fn(),
			count: jest.fn(),
		},
		propertyTypes: {
			findMany: jest.fn(),
		},
	},
}));

describe("Property service", () => {
	let propertyService: PropertyService;

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

	beforeEach(() => {
		propertyService = new PropertyService();
		jest.clearAllMocks();
	});

	describe("Create property", () => {
		it("Doit créer une propriété avec les bonnes données", async () => {
			(prisma.properties.create as jest.Mock).mockResolvedValue("property");
			const result = await propertyService.create(validCreateProperty, "user-id");
			expect(prisma.properties.create).toHaveBeenCalledWith({
				data: {
					name: validCreateProperty.name,
					purchasePrice: Number(validCreateProperty.purchasePrice),
					purchaseDate: new Date(validCreateProperty.purchaseDate),
					userId: "user-id",
					isDeleted: false,
					typeId: validCreateProperty.type,
				},
			});
			expect(result).toBe("property");
		});
	});

	describe("Browse properties", () => {
		it("Doit retourner la liste des propriétés non supprimées de l'utilisateur", async () => {
			(prisma.properties.findMany as jest.Mock).mockResolvedValue(["property"]);
			const result = await propertyService.browseProperties("user-id");
			expect(prisma.properties.findMany).toHaveBeenCalledWith({
				where: {
					userId: "user-id",
					isDeleted: false,
				},
				include: {
					propertyType: true,
				},
			});
			expect(result).toEqual(["property"]);
		});
	});

	describe("Update property", () => {
		it("Doit mettre à jour une propriété avec les bonnes données", async () => {
			(prisma.properties.update as jest.Mock).mockResolvedValue("updated");
			const result = await propertyService.updateProperty(validUpdateProperty);
			const { id, type, ...data } = validUpdateProperty;
			expect(prisma.properties.update).toHaveBeenCalledWith({
				where: { id },
				data: {
					...data,
					typeId: type,
				},
			});
			expect(result).toBe("updated");
		});
	});

	describe("Delete property", () => {
		it("Doit marquer la propriété comme supprimée", async () => {
			(prisma.properties.update as jest.Mock).mockResolvedValue("deleted");
			const result = await propertyService.deleteProperty("property-id");
			expect(prisma.properties.update).toHaveBeenCalledWith({
				where: { id: "property-id" },
				data: { isDeleted: true },
			});
			expect(result).toBe("deleted");
		});
	});

	describe("Browse types", () => {
		it("Doit retourner la liste des types de propriétés", async () => {
			(prisma.propertyTypes.findMany as jest.Mock).mockResolvedValue([
				"house",
				"apartment",
			]);
			const result = await propertyService.browseType();
			expect(prisma.propertyTypes.findMany).toHaveBeenCalledWith({});
			expect(result).toEqual(["house", "apartment"]);
		});
	});

	describe("Count properties", () => {
		it("Doit retourner le nombre de propriétés de l'utilisateur", async () => {
			(prisma.properties.count as jest.Mock).mockResolvedValue(5);
			const result = await propertyService.countProperties("user-id");
			expect(prisma.properties.count).toHaveBeenCalledWith({
				where: { userId: "user-id" },
			});
			expect(result).toBe(5);
		});
	});
});
