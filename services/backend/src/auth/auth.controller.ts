import {
	Body,
	Controller,
	Get,
	Param,
	Post,
	Res,
	UsePipes,
} from "@nestjs/common";
// biome-ignore lint/style/useImportType: required for class-validator metadata
import { CreateUserDto, RecoverPasswordDto } from "@src/dto/auth.dto";
import { validationPipe } from "@src/pipes/validationPipes";
import type { Response } from "express";
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
		const registeredUser = await this.authService.register(body);
		if (!registeredUser.success)
			return response
				.status(400)
				.send({ success: false, message: registeredUser.message });
		return response
			.status(200)
			.send({ success: true, message: registeredUser.message });
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

	@Post("/forget-password")
	async forgetPassword(
		@Res() response: Response,
		@Body() body: { email: string },
	) {
		await this.authService.recoverPassword(body.email);
		return response.status(200).send({ message: "success" });
	}

	@Get("/verify-recover-token/:token")
	async verifyRecoverToken(
		@Res() response: Response,
		@Param("token") token: string,
	) {
		const isUsed = await this.authService.verifyRecoverPasswordToken(token);
		return response.status(200).send({ isUsed });
	}

	@Post("/recover-password")
	async recoverPassword(
		@Res() response: Response,
		@Body() body: RecoverPasswordDto,
	) {
		const updatedPassword = await this.authService.updatePassword(
			body.password,
			body.token,
		);
		if (updatedPassword.success === false) {
			return response.status(500).send({
				success: false,
				message:
					"Une erreur est survenue lors de la modification du mot de passe",
			});
		}
		return response
			.status(200)
			.send({ success: true, message: "Mot de passe réinitialisé" });
	}
}
