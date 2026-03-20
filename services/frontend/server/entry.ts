import type { User } from "@app/types/user";
import { apply, serve } from "@photonjs/fastify";
import type { FastifyReply, FastifyRequest } from "fastify";
import fastify from "fastify";
import rawBody from "fastify-raw-body";
import { telefuncHandler } from "./telefunc-handler";

const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

export default (await startApp()) as unknown;

declare global {
	namespace Vike {
		interface PageContext {
			//Authentification
			user?: User;

			//Server data
			fastify: {
				request: FastifyRequest;
				reply: FastifyReply;
			};
		}
	}
}

async function startApp() {
	const app = fastify({
		// Ensures proper HMR support
		forceCloseConnections: true,
	});

	// /!\ Mandatory if you need to access the request body in any Universal Middleware or Handler
	await app.register(rawBody);

	await apply(app, [
		// Telefunc route. See https://telefunc.com
		telefuncHandler,
	]);

	return serve(app, {
		port,
	});
}
