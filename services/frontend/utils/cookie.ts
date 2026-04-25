import type { User } from "@app/types/user";
import fastifyCookie from "@fastify/cookie";
import { AuthService } from "@services/auth.service";
import type { FastifyReply } from "fastify";
import type { PageContextServer } from "vike/types";

export type CookieOptions = {
	domain?: string;
	expires?: Date;
	httpOnly?: boolean;
	maxAge?: number;
	path?: string;
	secure?: boolean;
	sameSite: "strict" | "lax" | "none";
};

const defaultOptions: CookieOptions = {
	path: "/",
	secure: false,
	sameSite: "strict",
	httpOnly: false,
	maxAge: 1000 * 60 * 60 * 24 * 30,
};

export function setCookie(
	reply: FastifyReply,
	name: string,
	value: string,
	options?: CookieOptions,
) {
	const mergerOptions = { ...defaultOptions, ...options };
	reply.setCookie(name, value, mergerOptions);
}

export function setAuthCookie(reply: FastifyReply, value: string) {
	setCookie(reply, "auth", value, {
		httpOnly: true,
		sameSite: "lax",
		maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
	});
}

export function getCookiesFromHeaders(
	headers: Record<string, string>,
): Record<string, string> {
	return (
		headers.cookie?.split(";").reduce(
			(acc, cookie) => {
				const [name, value] = cookie.trim().split("=");
				acc[name] = value;
				return acc;
			},
			{} as Record<string, string>,
		) ?? {}
	);
}

export function getCookiesFromPageContext(
	pageContext: PageContextServer,
): Record<string, string> {
	return getCookiesFromHeaders(pageContext.headers ?? {});
}

export async function getUserFromPageContext(
	pageContext: PageContextServer,
): Promise<{ user: User; token: string }> {
	const cookies = getCookiesFromPageContext(pageContext);
	if (!cookies.auth) throw new Error("No auth cookie found");

	const { user, token } = await new AuthService(cookies.auth).verify(
		cookies.auth,
	);

	return { user, token };
}
