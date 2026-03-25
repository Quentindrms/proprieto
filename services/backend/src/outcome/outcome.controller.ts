import { Body, Controller, Post, Req, Res } from "@nestjs/common";
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
		const user = request.user;
		if (!user) return response.status(401).send({});
		console.log(body);
		return response.status(200).send({ message: "success" });
	}
}
