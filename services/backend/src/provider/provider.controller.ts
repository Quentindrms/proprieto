import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { ProviderService } from "./provider.service";

@Controller("provider")
export class ProviderController {
	constructor(private readonly providerService: ProviderService) {}
}
