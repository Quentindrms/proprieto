import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Post,
	Put,
	Req,
	Res,
} from "@nestjs/common";
import type { Request, Response } from "express";
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
		console.log(body);
		const user = request.user;
		if (!user) return response.status(401).send({});
		const update = await this.propertyService.updateProperty(body);
		if (!update) return response.status(404).send({});
		return response.status(200).send({ message: "success" });
	}

	@Delete("/delete/:propertyId")
	async deleteProperty(
		@Req() request: Request,
		@Res() response: Response,
		@Param("propertyId") propertyId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const deleted = await this.propertyService.deleteProperty(propertyId);
		if (!deleted) return response.status(404).send({});
		return response.status(200).send({ message: "success" });
	}

	@Get("types")
	async browsePropertyTypes(
		@Req() request: Request,
		@Res() response: Response,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const property = await this.propertyService.browseType();
		return response.status(200).send(property);
	}

	@Get("count")
	async countProperties(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const properties = await this.propertyService.countProperties(user.id);
		return response.status(200).send(properties);
	}
}
