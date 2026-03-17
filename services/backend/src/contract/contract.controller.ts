import { Controller } from "@nestjs/common";
import type { ContractService } from "./contract.service";

@Controller("contracts")
export class ContractController {
	constructor(private readonly contractService: ContractService) {}
}
