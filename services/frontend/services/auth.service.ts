import type { User, UserCreation } from "@app/types/user";
import type { FastifyReply } from "fastify";
import { CoreService } from "./core.service";

export class AuthService extends CoreService {
	async login(email: string, password: string) {
		try {
			return this.post<{ success: boolean; token: string }>("/auth/login", {
				email,
				password,
			});
		} catch (error) {
			console.trace(error);
		}
	}

	async register(user: UserCreation) {
		try {
			return this.post<{ success: boolean }>("/auth/register", user);
		} catch (error) {
			console.trace(error);
		}
	}

	async verify(token: string) {
		return this.post<{ user: User; token: string }>("/auth/verify", { token });
	}

	async logout(reply: FastifyReply) {
		reply.clearCookie("auth");
	}
}
