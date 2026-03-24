import type { CreateProperty } from "@app/types/property";
import { CoreService } from "./core.service";

export class PropertyService extends CoreService {
	async createProperty(data: CreateProperty) {
		return this.post<{ message: "success" }>("/property/", data);
	}

	async browseProperties() {
		return this.get<{}>("/property/browse");
	}
}
