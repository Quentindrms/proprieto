import { Controller } from "@nestjs/common";
import type { IncomeService } from "./income.service";

@Controller("income")
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}
}
