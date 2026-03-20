import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}
}
