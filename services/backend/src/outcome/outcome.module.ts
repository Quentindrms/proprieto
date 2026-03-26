import {
	type MiddlewareConsumer,
	Module,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { OutcomeController } from "./outcome.controller";
import { OutcomeService } from "./outcome.service";

@Module({
	imports: [],
	controllers: [OutcomeController],
	providers: [OutcomeService],
})
export class OutcomeModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(OutcomeController);
	}
}
