import { IsAuthenticatedMiddleware } from "@middleware/is-authenticated.middleware";
import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { ClientController } from "./client.controller";
import { ClientService } from "./client.service";

@Module({
	imports: [],
	controllers: [ClientController],
	providers: [ClientService],
})
export class ClientModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(ClientController);
	}
}
