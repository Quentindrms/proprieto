import { prisma } from "@libs/DatabaseClient";
import type { CreateUserDto } from "@src/dto/create-user.dto";
import argon2 from "argon2";
import { AuthService } from "./auth.service";

jest.mock("@prisma/internal/prismaNamespace", () => ({
	PrismaClientKnownRequestError: class PrismaClientKnownRequestError extends Error {
		code: string;
		constructor(message: string, { code }: { code: string }) {
			super(message);
			this.code = code;
		}
	},
}));

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

jest.mock("../../services/jwt.service", () => ({
	JwtService: class {
		protected createJWT = jest.fn().mockResolvedValue("mock_token");
		protected verifyJWT = jest.fn().mockResolvedValue({ userId: "user-123" });
	},
}));

describe("Auth service", () => {
	let authService: AuthService;

	beforeEach(async () => {
		authService = new AuthService();
		jest.clearAllMocks();
	});

	describe("Register", () => {
		const fakeRegistration: CreateUserDto = {
			name: "Smith",
			firstName: "John",
			address: "10 Rue de la paix, 75016 PARIS",
			email: "john.smith@mail.com",
			phone: "0680341827",
			password: "password123!",
		};

		it("Doit retourner success:true avec un message", async () => {
			(prisma.users.create as jest.Mock).mockResolvedValue({});
			const result = await authService.register(fakeRegistration);
			expect(result).toEqual({ success: true, message: "Utilisateur crée" });
		});

		it("Doit retourner success:false avec un message d'erreur", async () => {
			(prisma.users.create as jest.Mock).mockRejectedValue(
				new Error("Database error"),
			);
			const result = await authService.register(fakeRegistration);
			expect(result).toEqual({
				success: false,
				message: "Une erreur est survenue",
			});
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

		it("Doit retourner success:false", async () => {
			(prisma.users.findFirst as jest.Mock).mockResolvedValue(null);
			(argon2.verify as jest.Mock).mockResolvedValue(true);
			const result = await authService.login(fakeLogin);
			expect(result).toEqual({ success: false });
		});
	});

	describe("Verify", () => {
		it("Doit retourner un utilisateur", async () => {
			(prisma.users.findFirst as jest.Mock).mockResolvedValue({
				id: "123",
				role: "user",
				status: "active",
				password: "password",
			});
			const result = await authService.verify("token");
			expect(result).toEqual({
				user: {
					id: "123",
					role: "user",
					status: "active",
					password: "password",
				},
			});
		});
	});
});
