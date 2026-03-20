import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ContractService } from "./contract.service";

@Controller("contracts")
export class ContractController {
	constructor(private readonly contractService: ContractService) {}
}
