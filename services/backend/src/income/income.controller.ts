import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreateIncomeDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { IncomeService } from "./income.service";

@Controller("income")
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}

	@Post("")
	async create(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateIncomeDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const income = this.incomeService.create(body);
		if (!income) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browseIncomes(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const incomes = await this.incomeService.browse(user.id);
		return response.status(200).send(incomes);
	}
}
