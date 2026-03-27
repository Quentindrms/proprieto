import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import type { Request, Response } from "express";
import type { CreateOutcomeDto } from "types/DtoType";
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
}
