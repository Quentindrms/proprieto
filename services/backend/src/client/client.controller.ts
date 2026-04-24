import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateClientDto, UpdateClientDto } from "@src/dto/client.dto";
import { validationPipe } from "@src/pipes/validationPipes";
import type { Request, Response } from "express";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ClientService } from "./client.service";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}

	@Post("")
	@UsePipes(validationPipe)
	async create(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateClientDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const client = await this.clientService.createClient(body, user.id);
		if (!client) return response.status(400).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browse(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const client = await this.clientService.browseClient(user.id);
		return response.status(200).send(client);
	}

	@Patch("")
	async edit(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: UpdateClientDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const client = await this.clientService.editClient(user.id, body);
		if (!client) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Delete("/:id")
	async remove(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") clientId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const client = await this.clientService.deleteClient(user.id, clientId);
		if (!client) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}
}
