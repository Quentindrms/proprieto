import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { OutcomeCategoryController } from "./outcomeCategory.controller";
import { OutcomeCategoryService } from "./outcomeCategory.service";

@Module({
	imports: [],
	controllers: [OutcomeCategoryController],
	providers: [OutcomeCategoryService],
})
export class PropertyModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer
			.apply(IsAuthenticatedMiddleware)
			.forRoutes(OutcomeCategoryController);
	}
}
