import type { UserCreation } from "@app/types/user";
import { AuthService } from "@services/auth.service";
import { setAuthCookie } from "@utils/cookie";
import { getAuthTokenFromContext, getContext } from "@utils/telefunc";

export async function onLogin(email: string, password: string) {
	const context = getContext();

	try {
		const authService = new AuthService();
		const response = await authService.login(email, password);
		if (response?.token) {
			setAuthCookie(context.fastify.reply, response.token);
			return { success: true };
		}
		return { success: false };
	} catch (error) {
		console.trace(error);
	}
}

export async function onRegister(user: UserCreation) {
	try {
		const authService = new AuthService();
		return await authService.register(user);
	} catch (error) {
		console.trace(error);
	}
}

export async function onLogout() {
	const context = getContext();
	context.fastify.reply.clearCookie("auth", { path: "/" });
	return { success: true };
}
