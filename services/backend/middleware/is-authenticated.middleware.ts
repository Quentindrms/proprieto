import { prisma } from "@libs/DatabaseClient";
import { Injectable, type NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { JwtService } from "services/jwt.service";

@Injectable()
export class IsAuthenticatedMiddleware
	extends JwtService
	implements NestMiddleware
{
	async use(request: Request, response: Response, next: NextFunction) {
		const bearerToken = request.headers.authorization?.split(" ")[1];
		if (typeof bearerToken !== "string" || bearerToken === "null") {
			return response.status(401).send();
		}

		const { userId } = await this.verifyJWT(bearerToken);
		if (typeof userId !== "string") return response.status(401).send();

		const user = await prisma.users.findFirst({
			where: { id: userId },
		});
		if (!user) return response.status(401).send();

		request.user = user;
		next();
	}
}
