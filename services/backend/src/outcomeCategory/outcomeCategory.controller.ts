import { Controller, Get, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { OutcomeCategoryService } from "./outcomeCategory.service";

@Controller("outcome-category")
export class OutcomeCategoryController {
	constructor(
		private readonly outcomeCategoryService: OutcomeCategoryService,
	) {}

	@Get("/")
	async browseCategory(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const categories = await this.outcomeCategoryService.browseCategory();
		return response.status(200).send(categories);
	}
}
