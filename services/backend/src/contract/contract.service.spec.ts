import { prisma } from "@libs/DatabaseClient";
import { ConflictException, NotFoundException } from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateContractDto } from "@src/dto/contract.dto";
import { ContractService } from "./contract.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		$transaction: jest.fn(),
		contracts: {
			create: jest.fn(),
			findMany: jest.fn(),
			findFirst: jest.fn(),
			findFirstOrThrow: jest.fn(),
			update: jest.fn(),
		},
		incomes: {
			findMany: jest.fn(),
			updateMany: jest.fn(),
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

		const invalidContract: CreateContractDto = {
			clientId: "user-id",
			endDate: "01/01/2026",
			lease: 100,
			propertyId: "property-id",
			startDate: "01/01/2027",
		};

		it("Doit retourner une ConflictException", async () => {
			const overLapping = {
				startDate: new Date("2026-06-01"),
				endDate: new Date("2026-12-31"),
			};
			(prisma.contracts.findFirst as jest.Mock).mockResolvedValue(overLapping);
			const result = await contractService.create(invalidContract);
			expect(result).toEqual(
				new ConflictException(
					`Un contrat existe déjà pour la période du ${overLapping.startDate.toLocaleDateString("fr-FR")} au ${overLapping.endDate.toLocaleDateString("fr-FR")}`,
				),
			);
			expect(prisma.contracts.create).not.toHaveBeenCalled();
		});

		it("Doit retourner le contrat crée", async () => {
			(prisma.contracts.findFirst as jest.Mock).mockResolvedValue(null);
			(prisma.contracts.create as jest.Mock).mockResolvedValue("client");
			await contractService.create(validContract);
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

	describe("Browse contract", () => {
		it("Doit retourner une liste de contrats", async () => {
			(prisma.contracts.findMany as jest.Mock).mockResolvedValue(["contract"]);
			await contractService.browse("user-id");
			expect(prisma.contracts.findMany).toHaveBeenCalledWith({
				where: {
					isDeleted: false,
					property: {
						userId: "user-id",
					},
				},
				select: {
					id: true,
					startDate: true,
					endDate: true,
					lease: true,
					property: true,
					client: {
						select: {
							directory: {
								select: {
									name: true,
									firstName: true,
								},
							},
						},
					},
				},
			});
		});
	});

	describe("Read details by property slug", () => {
		it("Doit retourner les contrats d'une propriété", async () => {
			(prisma.contracts.findMany as jest.Mock).mockResolvedValue([
				{
					client: {
						directory: {
							name: "Doe",
							firstName: "John",
						},
					},
					incomes: [{ amount: 100, isPaid: true }],
				},
			]);
			await contractService.readDetailsByPropertySlug("slug", "userId");
			expect(prisma.contracts.findMany).toHaveBeenCalledWith({
				where: {
					property: {
						slug: "slug",
						userId: "userId",
						isDeleted: false,
					},
				},
				include: {
					client: {
						select: {
							directory: {
								select: {
									name: true,
									firstName: true,
								},
							},
						},
					},
					incomes: {
						where: {
							isDeleted: false,
							isPaid: true,
							category: {
								slug: "loan",
							},
						},
						select: {
							amount: true,
							isPaid: true,
						},
					},
				},
			});
		});
	});

	describe("Read details", () => {
		it("Doit retourner une NotFoundException", async () => {
			(prisma.contracts.findFirstOrThrow as jest.Mock).mockResolvedValue(
				new NotFoundException(),
			);
			await contractService.readDetails("id");
			expect(prisma.contracts.findFirstOrThrow).toHaveBeenCalledWith({
				where: {
					id: "id",
					isDeleted: false,
				},
				include: {
					client: {
						include: {
							directory: {
								omit: {
									userId: true,
								},
							},
						},
					},
					property: {},
				},
			});
		});

		it("Doit retourner un contract", async () => {
			(prisma.contracts.findFirstOrThrow as jest.Mock).mockResolvedValue(
				"contract",
			);
			await contractService.readDetails("id");
			expect(prisma.contracts.findFirstOrThrow).toHaveBeenCalledWith({
				where: {
					id: "id",
					isDeleted: false,
				},
				include: {
					client: {
						include: {
							directory: {
								omit: {
									userId: true,
								},
							},
						},
					},
					property: {},
				},
			});
		});
	});

	describe("Delete", () => {
		it("Doit supprimer le contrat et ses revenus associés", async () => {
			(prisma.incomes.findMany as jest.Mock).mockResolvedValue([
				{ id: "income-1" },
				{ id: "income-2" },
			]);
			(prisma.incomes.updateMany as jest.Mock).mockResolvedValue({ count: 2 });
			(prisma.contracts.update as jest.Mock).mockResolvedValue({});
			(prisma.$transaction as jest.Mock).mockImplementation((callback) =>
				callback(prisma),
			);

			await contractService.deleteContract("contract-id", "user-id");

			expect(prisma.incomes.findMany).toHaveBeenCalledWith({
				where: {
					contractId: "contract-id",
				},
			});
			expect(prisma.incomes.updateMany).toHaveBeenCalledWith({
				where: {
					id: { in: ["income-1", "income-2"] },
					isDeleted: false,
				},
				data: {
					isDeleted: true,
				},
			});
			expect(prisma.contracts.update).toHaveBeenCalledWith({
				where: {
					id: "contract-id",
					property: {
						userId: "user-id",
					},
				},
				data: {
					isDeleted: true,
				},
			});
		});

		it("Doit retourner une NotFoundException si la transaction échoue", async () => {
			(prisma.$transaction as jest.Mock).mockRejectedValue(
				new NotFoundException(),
			);

			const result = await contractService.deleteContract(
				"contract-id",
				"user-id",
			);

			expect(result).toBeInstanceOf(NotFoundException);
		});
	});
});
