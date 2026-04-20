import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Put,
	Req,
	Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreateProviderDto, UpdateProviderDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ProviderService } from "./provider.service";

@Controller("provider")
export class ProviderController {
	constructor(private readonly providerService: ProviderService) {}

	@Post("create")
	async createProvider(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateProviderDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const provider = await this.providerService.create(body, user.id);
		if (!provider) return response.status(422).send({ message: "error" });
		return response.status(201).send({ message: "success" });
	}

	@Get("browse")
	async browseprovider(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const providers = await this.providerService.browse(user.id);
		console.log(providers);
		return response.status(200).send(providers);
	}

	@Put("")
	async edit(
		@Req() request: Request,
		response: Response,
		body: UpdateProviderDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const provider = this.providerService.edit(user.id, body);
		if (!provider) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Delete("/:id")
	async remove(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") providerId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		console.log(providerId);
		const provider = this.providerService.remove(user.id, providerId);
		if (!provider) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}
}
