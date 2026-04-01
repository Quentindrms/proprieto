import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { IncomeCategoryController } from "./incomeCategory.controller";
import { IncomeCategoryService } from "./incomeCategory.service";

@Module({
	imports: [],
	controllers: [IncomeCategoryController],
	providers: [IncomeCategoryService],
})
export class IncomeCategoryModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IsAuthenticatedMiddleware)
			.forRoutes(IncomeCategoryController);
	}
}
