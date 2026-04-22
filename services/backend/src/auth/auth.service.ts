import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { Users } from "@prisma/client";
import argon2 from "argon2";
import { JwtService } from "services/jwt.service";
import type { CreateAccountDto } from "types/DtoType";

@Injectable()
export class AuthService extends JwtService {
	async register(account: CreateAccountDto) {
		try {
			await prisma.users.create({
				data: {
					password: await argon2.hash(account.password),
					role: "user",
					status: "active",
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
			return true;
		} catch (error) {
			console.trace(error);
			return false;
		}
	}

	async login(loginDetails: { email: string; password: string }) {
		const user = await prisma.users.findFirst({
			where: {
				directory: {
					some: {
						email: loginDetails.email,
					},
				},
			},
		});

		try {
			if (!user) throw Error("Utilisateur inexistant");
			if (!(await argon2.verify(user.password, loginDetails.password)))
				throw Error("Identifiants invalides");
			return { token: await this.generateNewToken(user.id), success: true };
		} catch (error) {
			console.trace(error);
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
