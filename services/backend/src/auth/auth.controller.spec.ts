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

	describe("Register", () => {
		it("Doit retourner un status 200 succes:true", async () => {
			mockAuthService.register.mockResolvedValue(true);
			await authController.register(
				{
					address: "Test",
					email: "test",
					firstName: "test",
					name: "test",
					password: "test",
					phone: "test",
				},
				mockRes,
			);
			expect(mockStatus).toHaveBeenLastCalledWith(200);
			expect(mockSend).toHaveBeenCalledWith({ success: true });
		});

		it("Doit retourner un status 400, success:false", async () => {
			mockAuthService.register.mockResolvedValue(false);
			await authController.register(
				{
					address: "Test",
					email: "test",
					firstName: "test",
					name: "test",
					password: "test",
					phone: "test",
				},
				mockRes,
			);
			expect(mockStatus).toHaveBeenCalledWith(400);
			expect(mockSend).toHaveBeenCalledWith({ success: false });
		});
	});

	describe("Verify", () => {
		it("Doit retourner un status 201 avec un objet", async () => {
			mockAuthService.verify.mockResolvedValue({
				user: {
					id: "id",
					role: "user",
					status: "active",
					password: "password",
				},
				token: "token",
			});
			mockAuthService.generateNewToken.mockResolvedValue("token");
			await authController.verify({ token: "token" }, mockRes);
			expect(mockStatus).toHaveBeenCalledWith(201);
			expect(mockSend).toHaveBeenCalledWith({
				user: { userId: "id" },
				token: "token",
			});
		});
	});
});
