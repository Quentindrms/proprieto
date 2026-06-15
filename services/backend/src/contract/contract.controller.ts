import {
	Body,
	ConflictException,
	Controller,
	Delete,
	Get,
	NotFoundException,
	Param,
	Post,
	Put,
	Req,
	Res,
	UnauthorizedException,
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateContractDto, UpdateContractDto } from "@src/dto/contract.dto";
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

	@Put("")
	@UsePipes(validationPipe)
	async updateContract(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: UpdateContractDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = await this.contractService.update(body, user.id);
		if (!contract) return response.status(404).send({ message: "Not found" });
		response.status(200).send({ message: "success" });
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
		@Param("id") id: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = await this.contractService.readDetails(id);
		if (contract instanceof NotFoundException) {
			return response
				.status(contract.getStatus())
				.send({ message: contract.message });
		}
		return response.status(200).send(contract);
	}

	@Delete(":id")
	async deleteContract(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") contractId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = await this.contractService.deleteContract(
			contractId,
			user.id,
		);
		if (contract instanceof NotFoundException) {
			return response.status(contract.getStatus()).send(contract.message);
		}
		return response.status(200).send({ success: true });
	}

	@Get("renew/:id")
	async renewal(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") contractId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send();
		const contract = this.contractService.renewal(contractId, user.id);
		if (contract instanceof NotFoundException) {
			return response.status(contract.getStatus()).send(contract.message);
		}
		return response.status(200).send({ success: true });
	}
}
