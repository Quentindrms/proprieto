import { prisma } from "@libs/DatabaseClient";
import type { CreateClientDto, UpdateClientDto } from "types/DtoType";
import { ClientService } from "./client.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		directories: {
			create: jest.fn(),
			findMany: jest.fn(),
			update: jest.fn(),
		},
	},
}));

describe("Client service", () => {
	let clientService: ClientService;

	beforeEach(async () => {
		clientService = new ClientService();
		jest.clearAllMocks();
	});

	describe("Create client", () => {
		const validClient: CreateClientDto = {
			name: "Smith",
			firstName: "John",
			address: "10 rue de la Paix, 75016 Paris",
			email: "john.smith@mail.com",
			phone: "0680501273",
		};

		it("Doit retourner un client valide", async () => {
			(prisma.directories.create as jest.Mock).mockResolvedValue("client");
			await clientService.createClient(validClient, "user-id");
			expect(prisma.directories.create).toHaveBeenCalledWith({
				data: {
					name: validClient.name,
					firstName: validClient.firstName,
					email: validClient.email,
					address: validClient.address,
					phone: validClient.phone,
					type: "client",
					userId: "user-id",
					clients: {
						create: {
							status: "active",
						},
					},
				},
			});
		});
	});

	describe("Browse client", () => {
		it("Doit retourner une liste de client", async () => {
			(prisma.directories.findMany as jest.Mock).mockResolvedValue(["client"]);
			const result = await clientService.browseClient("user-id");
			expect(prisma.directories.findMany).toHaveBeenCalledWith({
				where: {
					userId: "user-id",
					type: "client",
					isDeleted: false,
				},
				include: {
					clients: true,
				},
			});
			expect(result).toEqual(["client"]);
		});
	});

	describe("Edit client", () => {
		const validUpdateClient: UpdateClientDto = {
			id: "client-id",
			name: "Smith",
			firstName: "John",
			address: "10 rue de la Paix, 75016 Paris",
			email: "john.smith@mail.com",
			phone: "0680501273",
		};

		it("Doit retourner l'utilisateur modifié", async () => {
			const { id, ...data } = validUpdateClient;
			(prisma.directories.update as jest.Mock).mockResolvedValue("client");
			const result = await clientService.editClient(
				"user-id",
				validUpdateClient,
			);
			expect(prisma.directories.update).toHaveBeenCalledWith({
				where: {
					userId: "user-id",
					id: "client-id",
				},
				data,
			});
			expect(result).toEqual("client");
		});
	});

	describe("Delete client", () => {
		it("Doit supprimer l'utilisateur", async () => {
			(prisma.directories.update as jest.Mock).mockResolvedValue("client");
			const result = await clientService.deleteClient("user-id", "client-id");
			expect(prisma.directories.update).toHaveBeenCalledWith({
				where: {
					userId: "user-id",
					id: "client-id",
				},
				data: {
					isDeleted: true,
				},
			});
			expect(result).toEqual("client");
		});
	});
});
