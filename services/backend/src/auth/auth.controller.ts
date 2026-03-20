import { Body, Controller, Get, Post, Res } from "@nestjs/common";
import type { Response } from "express";
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
	async register(@Body() body: CreateAccountDto, @Res() response: Response) {
		const registeredUser = await this.authService.register(body);
		if (!registeredUser)
			return response.status(400).send({ message: "An error as occured" });
		return response.status(200).send({ message: "Account created" });
	}
}
