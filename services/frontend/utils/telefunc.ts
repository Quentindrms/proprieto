import type { FastifyReply, FastifyRequest } from "fastify";
import { getContext as getContextTelefunc } from "telefunc";

export function getContext() {
	return getContextTelefunc<{
		fastify: { request: FastifyRequest; reply: FastifyReply };
	}>();
}

export function getAuthTokenFromContext() {
	const context = getContext();
	const cookie = context.fastify.request.headers?.cookie;
	if (!cookie) return null;

	return (
		cookie
			.split(";")
			.find((cookie) => cookie.trim().startsWith("auth="))
			?.split("=")[1] ?? null
	);
}
