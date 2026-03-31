import {
	type MiddlewareConsumer,
	Module,
	NestMiddleware,
	type NestModule,
} from "@nestjs/common";
import { IsAuthenticatedMiddleware } from "middleware/is-authenticated.middleware";
import { ContractController } from "./contract.controller";
import { ContractService } from "./contract.service";

@Module({
	imports: [],
	controllers: [ContractController],
	providers: [ContractService],
})
export class ContractModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(IsAuthenticatedMiddleware).forRoutes(ContractController);
	}
}
