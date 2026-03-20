import type { User } from "@app/types/user";
import { CoreService } from "./core.service";

export class AuthService extends CoreService {
	async login(email: string, password: string) {
		try {
			this.post("/auth/login", { email, password });
		} catch (error) {
			console.trace(error);
		}
	}

	async verify(token: string) {
		return this.post<{ user: User; token: string }>("/auth/verify", { token });
	}
}
