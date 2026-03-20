import { AuthService } from "@services/auth.service";

export async function onLogin(email: string, password: string) {
	try {
		const authService = new AuthService();
		authService.login(email, password);
	} catch (error) {
		console.trace(error);
	}
}
