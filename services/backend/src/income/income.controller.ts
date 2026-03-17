import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { IncomeService } from "./income.service";

@Controller("income")
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}
}
