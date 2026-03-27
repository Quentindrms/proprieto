import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { ProviderController } from "./provider.controller";
import { ProviderService } from "./provider.service";

@Module({
	imports: [],
	controllers: [ProviderController],
	providers: [ProviderService],
})
export class ProviderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(ProviderController);
	}
}
