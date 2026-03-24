import { Body, Controller, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreatePropertyDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}

	@Post("")
	createProperty(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreatePropertyDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const property = this.propertyService.create(body, user.id);
	}
}
