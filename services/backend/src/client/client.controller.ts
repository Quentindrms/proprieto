import { Controller } from "@nestjs/common";
import type { ClientService } from "./client.service";

@Controller("client")
export class ClientController {
	constructor(private readonly clientService: ClientService) {}
}
