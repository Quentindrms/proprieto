import { Controller } from "@nestjs/common";
import type { OutcomeService } from "./outcome.service";

@Controller("outcome")
export class OutcomeController {
	constructor(private readonly outcomeService: OutcomeService) {}
}
