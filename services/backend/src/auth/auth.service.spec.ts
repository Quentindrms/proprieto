import { prisma } from "@libs/DatabaseClient";
import { Test, TestingModule } from "@nestjs/testing";
import argon2 from "argon2";
import type { CreateAccountDto } from "types/DtoType";
import { AuthService } from "./auth.service";

jest.mock("@libs/DatabaseClient", () => ({
	prisma: {
		users: {
			create: jest.fn(),
			findFirst: jest.fn(),
		},
	},
}));

jest.mock("argon2", () => ({
	hash: jest.fn().mockResolvedValue("hashed_password"),
	verify: jest.fn(),
}));

jest.mock("services/jwt.service", () => ({
	JwtService: class {
		protected createJWT = jest.fn().mockResolvedValue("mock_token");
		protected verifyJWT = jest.fn().mockResolvedValue({ userId: "user-123" });
	},
}));

const mockSend = jest.fn();
const mockStatus = jest.fn();
const mockRes = { status: mockStatus, send: mockSend } as unknown as Response;

describe("Auth service", () => {
	let authService: AuthService;

	beforeEach(async () => {
		authService = new AuthService();
		jest.clearAllMocks();
	});

	describe("Register", () => {
		const fakeRegistration: CreateAccountDto = {
			name: "Smith",
			firstName: "John",
			address: "10 Rue de la paix, 75016 PARIS",
			email: "john.smith@mail.com",
			phone: "0680341827",
			password: "password123!",
		};

		it("Doit retourner true", async () => {
			(prisma.users.create as jest.Mock).mockResolvedValue({});
			const result = await authService.register(fakeRegistration);
			expect(result).toBe(true);
		});

		it("Doit retourner false", async () => {
			jest.spyOn(console, "trace").mockImplementation(() => {});
			(prisma.users.create as jest.Mock).mockRejectedValue(
				new Error("Database error"),
			);
			const result = await authService.register(fakeRegistration);
			expect(result).toBe(false);
		});
	});

	describe("Login", () => {
		const fakeLogin = {
			email: "john.smith@mail.fr",
			password: "password123!",
		};

		it("Doit retourner un token et success:true", async () => {
			(prisma.users.findFirst as jest.Mock).mockResolvedValue({
				id: "123",
				password: "hashed_password",
			});
			(argon2.verify as jest.Mock).mockResolvedValue(true);
			const result = await authService.login(fakeLogin);
			expect(result).toEqual({ token: "mock_token", success: true });
		});
	});
});
