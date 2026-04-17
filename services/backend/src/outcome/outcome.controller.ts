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
import type { CreateOutcomeDto, UpdateOutcomeDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { OutcomeService } from "./outcome.service";

@Controller("outcome")
export class OutcomeController {
	constructor(private readonly outcomeService: OutcomeService) {}

	@Post("")
	async create(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: CreateOutcomeDto,
	) {
		console.log(body);
		const user = request.user;
		if (!user) return response.status(401).send({});
		const outcome = this.outcomeService.createOutcome(body);
		if (!outcome) return response.status(403).send({});
		return response.status(200).send({ message: "success" });
	}

	@Get("browse")
	async browse(@Req() request: Request, @Res() response: Response) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const outcomes = await this.outcomeService.browseOutcome(user.id);
		console.log(outcomes);
		return response.status(200).send(outcomes);
	}

	@Get("/monthly")
	async getMonthlyLoss(@Req() request: Request, @Res() response: Response) {
		console.log("ping");
		const user = request.user;
		if (!user) return response.status(401).send({});
		const outcomes = await this.outcomeService.monthlyLoss(user.id);
		return response.status(200).send(outcomes);
	}

	@Get("/:id")
	async get(
		@Param("id") outcomeId: string,
		@Req() request: Request,
		@Res() response: Response,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const outcome = await this.outcomeService.getOutcome(outcomeId, user.id);
		if (!outcome) return response.status(404).send({});
		console.log(`Outcome : ${outcome}`);
		return response.status(200).send(outcome);
	}

	@Delete("/:id")
	async delete(
		@Param("id") outcomeId: string,
		@Req() request: Request,
		@Res() response: Response,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const deletedOutcome = await this.outcomeService.delete(outcomeId);
		if (!deletedOutcome) return response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}

	@Put("")
	async update(
		@Req() request: Request,
		@Res() response: Response,
		@Body() body: UpdateOutcomeDto,
	) {
		const user = request.user;
		if (!user) return response.status(401).send({});
		const outcome = this.outcomeService.update(body);
		if (!outcome) response.status(404).send({ message: "error" });
		return response.status(200).send({ message: "success" });
	}
}
