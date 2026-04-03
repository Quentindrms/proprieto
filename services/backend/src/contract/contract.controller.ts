import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreateContractDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ContractService } from "./contract.service";

@Controller("contracts")
export class ContractController {
	constructor(private readonly contractService: ContractService) {}

	@Post("")
	createContract(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateContractDto,
	) {
		console.log(body);
		const user = request.user;
		if (!user) return response.status(401).send({});
		const contract = this.contractService.create(body, user.id);
		if (!contract) return response.status(400).send({});
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browseContract(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const contracts = await this.contractService.browse(user.id);
		console.log(contracts);
		return response.status(200).send(contracts);
	}
}
