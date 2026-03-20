import { AuthService } from "@services/auth.service";

export async function onLogin(email: string, password: string) {
	try {
		const authService = new AuthService();
		console.log("==== USE AUTH TELEFUNC ====");
	} catch (error) {}
}
