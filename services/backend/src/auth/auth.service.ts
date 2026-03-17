import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";
import type { CreateAccountDto } from "types/DtoType";

@Injectable()
export class AuthService {
	async register(account: CreateAccountDto) {
		const argon2 = require("argon2");
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
	}
}
