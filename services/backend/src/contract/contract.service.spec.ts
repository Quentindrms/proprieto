import { prisma } from "@libs/DatabaseClient";
import { ClientService } from "@src/client/client.service";
import type { CreateContractDto } from "types/DtoType";
import { ContractService } from "./contract.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		contracts: {
			create: jest.fn(),
			findMany: jest.fn(),
		},
	},
}));

describe("Contract service", () => {
	let contractService: ContractService;

	beforeEach(async () => {
		contractService = new ContractService();
		jest.clearAllMocks();
	});

	describe("Create contract", () => {
		const validContract: CreateContractDto = {
			clientId: "user-id",
			endDate: "01/01/2026",
			lease: 100,
			propertyId: "property-id",
			startDate: "01/01/2027",
		};

		it("Doit retourner le contrat crée", async () => {
			(prisma.contracts.create as jest.Mock).mockResolvedValue("client");
			await contractService.create(validContract, "user-id");
			const { endDate, startDate, ...rest } = validContract;
			expect(prisma.contracts.create).toHaveBeenCalledWith({
				data: {
					...rest,
					endDate: new Date(endDate),
					startDate: new Date(startDate),
				},
			});
		});
	});
});
