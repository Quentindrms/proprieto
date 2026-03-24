import type { CreateProperty } from "@app/types/property";
import { PropertyService } from "@services/property.service";
import { getAuthTokenFromContext } from "@utils/telefunc";
import toast from "solid-toast";

export async function onCreate(data: CreateProperty) {
	const authToken = getAuthTokenFromContext();

	try {
		const propertyService = new PropertyService(authToken);
		return await propertyService.createProperty(data);
	} catch (error) {
		console.trace(error);
	}
}

export async function onBrowse() {
	const authToken = getAuthTokenFromContext();
	try {
		const propertyService = new PropertyService(authToken);
		return await propertyService.browseProperties();
	} catch (error) {
		console.trace(error);
	}
}
