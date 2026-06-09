import {
	Body,
	ConflictException,
	Controller,
	Get,
	NotFoundException,
	Param,
	Post,
	Req,
	Res,
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateContractDto } from "@src/dto/contract.dto";
import { validationPipe } from "@src/pipes/validationPipes";
import type { Request, Response } from "express";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ContractService } from "./contract.service";

@Controller("contracts")
export class ContractController {
	constructor(private readonly contractService: ContractService) {}

	@Post("")
	@UsePipes(validationPipe)
	async createContract(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateContractDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const contract = await this.contractService.create(body);
		if (contract instanceof ConflictException) {
			return response
				.status(contract.getStatus())
				.send({ message: contract.message });
		}
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browseContract(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const contracts = await this.contractService.browse(user.id);
		return response.status(200).send(contracts);
	}

	@Get("read/:slug")
	async getContractByPropertySlug(
		@Req() request: Request,
		@Res() response: Response,
		@Param("slug") slug: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = await this.contractService.readDetailsByPropertySlug(
			slug,
			user.id,
		);
		return response.status(200).send(contract);
	}

	@Get("details/:id")
	async contractDetails(
		@Req() request: Request,
		@Res() response: Response,
		@Param("slug") slug: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = await this.contractService.readDetails(slug);
		if (contract instanceof NotFoundException) {
			console.log(contract);
			return response
				.status(contract.getStatus())
				.send({ message: contract.message });
		}
		console.log(contract);
		return response.status(200).send(contract);
	}
}
