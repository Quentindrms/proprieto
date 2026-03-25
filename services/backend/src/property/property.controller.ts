import { Controller } from "@nestjs/common";
//biome-ignore lint/style/useImportType: required for NestJS DI
import { PropertyService } from "./property.service";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyService: PropertyService) {}
}
