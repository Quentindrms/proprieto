import { prisma } from "@libs/DatabaseClient";
import type { CreateProviderDto, UpdateProviderDto } from "types/DtoType";
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

describe("Provider service", () => {
	let providerService: ProviderService;

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

	beforeEach(() => {
		providerService = new ProviderService();
		jest.clearAllMocks();
	});

	describe("Create provider", () => {
		it("Doit créer un provider avec les bonnes données", async () => {
			(prisma.directories.create as jest.Mock).mockResolvedValue("provider");
			const result = await providerService.create(validCreateProvider, "user-id");
			expect(prisma.directories.create).toHaveBeenCalledWith({
				data: {
					address: validCreateProvider.address,
					email: validCreateProvider.email,
					firstName: validCreateProvider.firstName,
					name: validCreateProvider.name,
					phone: validCreateProvider.phone,
					type: "provider",
					userId: "user-id",
					providers: {
						create: {
							status: "active",
						},
					},
				},
			});
			expect(result).toBe("provider");
		});
	});

	describe("Browse providers", () => {
		it("Doit retourner la liste des providers actifs de l'utilisateur", async () => {
			(prisma.providers.findMany as jest.Mock).mockResolvedValue(["provider"]);
			const result = await providerService.browse("user-id");
			expect(prisma.providers.findMany).toHaveBeenCalledWith({
				where: {
					status: "active",
					directories: {
						userId: "user-id",
						isDeleted: false,
					},
				},
				include: {
					directories: true,
				},
			});
			expect(result).toEqual(["provider"]);
		});
	});

	describe("Edit provider", () => {
		it("Doit mettre à jour un provider avec les bonnes données", async () => {
			(prisma.directories.update as jest.Mock).mockResolvedValue("updated");
			const result = await providerService.edit("user-id", validUpdateProvider);
			const { id, ...data } = validUpdateProvider;
			expect(prisma.directories.update).toHaveBeenCalledWith({
				where: {
					userId: "user-id",
					id,
				},
				data,
			});
			expect(result).toBe("updated");
		});
	});

	describe("Remove provider", () => {
		it("Doit marquer le provider comme supprimé", async () => {
			(prisma.providers.update as jest.Mock).mockResolvedValue("deleted");
			const result = await providerService.remove("user-id", "provider-id");
			expect(prisma.providers.update).toHaveBeenCalledWith({
				where: {
					id: "provider-id",
					directories: {
						userId: "user-id",
					},
				},
				data: {
					directories: {
						update: {
							isDeleted: true,
						},
					},
				},
			});
			expect(result).toBe("deleted");
		});
	});
});
