import {
	Body,
	Controller,
	Get,
	Post,
	Req,
	Res,
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateUserDto } from "@src/dto/create-user.dto";
import { validationPipe } from "@src/pipes/validationPipes";
import type { Request, Response } from "express";
import type { CreateAccountDto } from "types/DtoType";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post("login")
	async login(
		@Body() body: { email: string; password: string },
		@Res() response: Response,
	) {
		const logged = await this.authService.login(body);
		if (!logged.success) {
			return response.status(401).send({ success: false });
		}
		return response
			.status(200)
			.send({ success: logged.success, token: logged.token });
	}

	@Post("register")
	@UsePipes(validationPipe)
	async register(@Body() body: CreateUserDto, @Res() response: Response) {
		console.log(body);
		const registeredUser = await this.authService.register(body);
		if (!registeredUser) return response.status(400).send({ success: false });
		return response.status(200).send({ success: true });
	}

	@Post("/verify")
	async verify(@Body() body: { token: string }, @Res() res: Response) {
		const { user } = await this.authService.verify(body.token);
		const newToken = await this.authService.generateNewToken(user.id);

		res.status(201).send({
			user: { userId: user.id },
			token: newToken,
		});
	}
}
