import { NestFactory } from "@nestjs/core";
import type { Users } from "@prisma/client";
import { seed } from "prisma/seed";
import { AppModule } from "./app.module";

declare global {
	namespace Express {
		interface Request {
			user?: Users;
		}
	}
}

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	await seed();
	await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
