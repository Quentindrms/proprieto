import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import argon2 from "@node-rs/argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { CreateUserDto } from "@src/dto/auth.dto";
import { randomBytes } from "crypto";
import type { Users } from "../../generated/prisma/client";
import { JwtService } from "../../services/jwt.service";
import { MailerClient } from "@libs/MailerClient";

@Injectable()
export class AuthService extends JwtService {
	async register(account: CreateUserDto) {
		try {
			await prisma.users.create({
				data: {
					password: await argon2.hash(account.password),
					role: "user",
					status: "active",
					email: account.email,
					directory: {
						create: {
							address: account.address,
							email: account.email,
							firstName: account.firstName,
							name: account.name,
							phone: account.phone,
							type: "user",
						},
					},
				},
			});
			const mailer = await MailerClient.create();
			await mailer.accountCreation(account.email);
			return { success: true, message: "Utilisateur crée" };
		} catch (error) {
			if (
				error instanceof PrismaClientKnownRequestError &&
				error.code === "P2002"
			) {
				return {
					success: false,
					message: "Un utilisateur avec cet email existe déjà",
				};
			}
			return { success: false, message: "Une erreur est survenue" };
		}
	}

	async login(loginDetails: { email: string; password: string }) {
		const user = await prisma.users.findFirst({
			where: {
				email: loginDetails.email,
			},
		});

		try {
			if (!user) throw Error("Utilisateur inexistant");
			if (!(await argon2.verify(user.password, loginDetails.password)))
				throw Error("Identifiants invalides");
			return { token: await this.generateNewToken(user.id), success: true };
		} catch {
			return { success: false };
		}
	}

	async generateNewToken(userId: string): Promise<string> {
		return await this.createJWT(userId);
	}

	async verify(token: string): Promise<{ user: Users }> {
		const { userId } = await this.verifyJWT(token);
		const user = await prisma.users.findFirst({
			where: {
				AND: [{ id: userId }],
			},
		});

		if (!user) throw new Error("Utilisateur non trouvé ou invalide");

		return { user };
	}

	async recoverPassword(email: string) {
		const user = await prisma.users.findFirst({
			where: { email },
			select: { email: true, id: true },
		});
		if (!user?.email) {
			return;
		}
		const token = randomBytes(32).toString("hex");
		try {
			await prisma.tokens.upsert({
				where: { userId: user.id },
				update: { content: token, isUsed: false },
				create: { userId: user.id, content: token },
			});
			const mailer = await MailerClient.create();
			await mailer.recoverPassword(user.email, token);
		} catch (error) {
			console.trace(error);
		}
	}

	async verifyRecoverPasswordToken(content: string) {
		const isValid = await prisma.tokens.findFirst({
			where: {
				content,
			},
		});
		if (!isValid?.isUsed) {
			return false;
		}
		return true;
	}

	async updatePassword(password: string, token: string) {
		try {
			const user = await prisma.tokens.findFirst({
				where: {
					content: token,
				},
				select: {
					userId: true,
				},
			});
			const updatePasword = await prisma.users.update({
				where: {
					id: user?.userId,
				},
				data: {
					password: await argon2.hash(password),
					token: {
						update: {
							isUsed: true,
						},
					},
				},
			});
			const mailer = await MailerClient.create();
			mailer.updatePasword(updatePasword.email);
			return { success: true };
		} catch (error) {
			console.trace(error);
			return { success: false };
		}
	}
}
