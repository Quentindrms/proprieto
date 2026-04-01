import { Controller, Get, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { IncomeCategoryService } from "./incomeCategory.service";

@Controller("income-category")
export class IncomeCategoryController {
	constructor(private readonly incomeCategoryService: IncomeCategoryService) {}

	@Get("browse")
	async browse(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const categories = await this.incomeCategoryService.browseCategories();
		console.log(categories);
		return response.status(200).send(categories);
	}
}
