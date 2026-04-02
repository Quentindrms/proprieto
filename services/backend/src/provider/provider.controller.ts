import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreateProviderDto } from "types/DtoType";
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
}
