import { Module } from "@nestjs/common";
import { OutcomeController } from "./outcome.controller";
import { OutcomeService } from "./outcome.service";

@Module({
	imports: [],
	controllers: [OutcomeController],
	providers: [OutcomeService],
})
export class OutcomeModule {}
