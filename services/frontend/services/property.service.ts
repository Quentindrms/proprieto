import type { Property } from "@app/types/property";
import type {
	PropertyCreationType,
	PropertyUpdateType,
} from "@schemas/property";
import { CoreService } from "./core.service";

export class PropertyService extends CoreService {
	async createProperty(data: PropertyCreationType) {
		return this.post<{ message: string }>("/property/", data);
	}

	async browseProperties() {
		return this.get<Property[]>("/property/browse");
	}

	async updateProperty(data: PropertyUpdateType) {
		return this.put<{ message: string }>("/property/", data);
	}

	async deleteProperty(propertyId: string) {
		return this.delete<{ message: string }>(`/property/delete/${propertyId}`);
	}
}
