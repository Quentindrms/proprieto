import { Body, Controller, Get, Post, Put, Req, Res } from "@nestjs/common";
import type { Request, Response, response } from "express";
import type { CreatePropertyDto, UpdatePropertyDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}

	@Post("")
	async createProperty(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreatePropertyDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const property = await this.propertyService.create(body, user.id);
		if (!property) return response.status(422).send({});
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browseProperties(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const properties = await this.propertyService.browseProperties(user.id);
		console.log(properties);
		return response.status(200).send(properties);
	}

	@Put("")
	async updateProperty(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: UpdatePropertyDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const update = await this.propertyService.updateProperty(body);
		if (!update) return response.status(404).send({});
		return response.status(200).send({ message: "success" });
	}
}
