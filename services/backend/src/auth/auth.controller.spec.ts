import { Test, type TestingModule } from "@nestjs/testing";
import type { Response } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		create: jest.fn(),
		findFirst: jest.fn(),
	},
}));

const mockAuthService = {
	register: jest.fn(),
	login: jest.fn(),
	generateNewToken: jest.fn(),
	verify: jest.fn(),
};

const mockSend = jest.fn();
const mockStatus = jest.fn();
const mockRes = { status: mockStatus, send: mockSend } as unknown as Response;

describe("Auth controller", () => {
	let authController: AuthController;

	beforeEach(async () => {
		jest.clearAllMocks();
		mockStatus.mockReturnValue(mockRes);
		const module: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [{ provide: AuthService, useValue: mockAuthService }],
		}).compile();

		authController = module.get<AuthController>(AuthController);
	});

	describe("Login", () => {
		it("Doit retourner un token et un boolean", async () => {
			mockAuthService.login.mockResolvedValue({
				token: "test-token",
				success: true,
			});

			await authController.login(
				{ email: "test@test.fr", password: "test" },
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({
				success: true,
				token: "test-token",
			});
		});

		it("Doit retourne success:false", async () => {
			mockAuthService.login.mockResolvedValue({
				token: null,
				success: false,
			});

			await authController.login(
				{ email: "test@test.fr", password: "test" },
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(401);
			expect(mockSend).toHaveBeenCalledWith({ success: false });
		});
	});
});
