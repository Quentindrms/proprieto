import { AuthService } from "@services/auth.service";

export async function onLogin(email: string, password: string) {
	try {
		const authService = new AuthService();
		const response = authService.login(email, password);
	} catch (error) {}
}
