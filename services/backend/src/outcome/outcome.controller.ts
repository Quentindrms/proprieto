import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { OutcomeService } from "./outcome.service";

@Controller("outcome")
export class OutcomeController {
	constructor(private readonly outcomeService: OutcomeService) {}
}
