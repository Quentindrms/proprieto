import { prisma } from "@libs/DatabaseClient";
import { MailerClient } from "@libs/MailerClient";
import { Injectable } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/client";
import type { CreateUserDto } from "@src/dto/create-user.dto";
import argon2 from "argon2";
import type { Users } from "../../generated/prisma/client";
import { JwtService } from "../../services/jwt.service";

@Injectable()
export class AuthService extends JwtService {
	async register(account: CreateUserDto) {
		try {
			const user = await prisma.users.create({
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
			await mailer.accountCreation(user.email);
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
}
