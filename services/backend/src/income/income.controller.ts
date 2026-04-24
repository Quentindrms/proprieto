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
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateIncomeDto, UpdateIncomeDto } from "@src/dto/income.dto";
import { validationPipe } from "@src/pipes/validationPipes";
import type { Request, Response } from "express";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { IncomeService } from "./income.service";

@Controller("income")
export class IncomeController {
	constructor(private readonly incomeService: IncomeService) {}

	@Post("")
	@UsePipes(validationPipe)
	async create(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateIncomeDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const income = await this.incomeService.create(body);
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

	@Get("/monthly")
	async getMonthlyProfit(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const incomes = await this.incomeService.monthlyProfit(user.id);
		return response.status(200).send(incomes);
	}

	@Get("/:id")
	async get(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") incomeId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const income = await this.incomeService.get(incomeId);
		if (!income) return response.status(404).send({});
		return response.status(200).send(income);
	}

	@Delete("/:id")
	async delete(
		@Req() request: Request,
		@Res() response: Response,
		@Param("id") incomeId: string,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const deletedIncome = await this.incomeService.delete(incomeId);
		if (!deletedIncome) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Put("")
	async update(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: UpdateIncomeDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const update = await this.incomeService.update(body);
		if (!update) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}
}
