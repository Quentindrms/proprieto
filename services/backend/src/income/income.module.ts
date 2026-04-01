import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { IncomeController } from "./income.controller";
import { IncomeService } from "./income.service";

@Module({
	imports: [],
	controllers: [IncomeController],
	providers: [IncomeService],
})
export class IncomeModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(IncomeController);
	}
}
