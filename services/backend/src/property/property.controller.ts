import { Controller } from "@nestjs/common";

@Controller("property")
export class PropertyController {
	constructor(private readonly propertyController: PropertyController) {}
}
