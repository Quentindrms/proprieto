import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { PropertyController } from "./property.controller";
import { PropertyService } from "./property.service";

@Module({
	imports: [],
	controllers: [PropertyController],
	providers: [PropertyService],
})
export class PropertyModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(PropertyController);
	}
}
