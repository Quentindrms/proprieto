import { CoreService } from "./core.service";

export class AuthService extends CoreService {
	async login(email: string, password: string) {
		try {
			this.post("/auth/login", { email, password });
		} catch (error) {
			console.trace(error);
		}
	}
}
