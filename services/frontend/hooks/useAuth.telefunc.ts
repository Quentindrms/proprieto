import { AuthService } from "@services/auth.service";
import { setAuthCookie, setCookie } from "@utils/cookie";
import { getContext } from "@utils/telefunc";

export async function onLogin(email: string, password: string) {
	const context = getContext();

	try {
		const authService = new AuthService();
		const response = await authService.login(email, password);
		if (response?.token) {
			setAuthCookie(context.fastify.reply, response.token);
		}
	} catch (error) {
		console.trace(error);
	}
}
