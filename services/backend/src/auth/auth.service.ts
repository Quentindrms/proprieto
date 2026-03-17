import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { CreateAccountDto } from "types/DtoType";

@Injectable()
export class AuthService {
	async register(account: CreateAccountDto) {
		try {
			const user = await prisma.user.create({
				data: {
					name: account.name,
					firstName: account.firstName,
					address: account.address,
					email: account.email,
					phone: account.phone,
					password: await argon2.hash(account.password),
				},
			});
			return true;
		} catch (error) {
			console.trace(error);
			return false;
		}
	}

	async login(loginDetails: { email: string; password: string }) {
		const user = await prisma.user.findFirst({
			where: {
				email: loginDetails.email,
			},
		});
		if (!user) throw Error("Identifiants invalides");
		try {
			if (!(await argon2.verify(user.password, loginDetails.password)))
				throw Error("Identifiants invalides");
			return { token: this.generateToken(user.id), sucess: true };
		} catch (error) {
			console.trace(error);
			return { success: false };
		}
	}

	private generateToken(userUuid: string) {
		return jwt.sign({ userUuid }, process.env.JWT_SECRET);
	}
}
