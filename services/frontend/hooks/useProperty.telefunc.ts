import type {
	PropertyCreationType,
	PropertyUpdateType,
} from "@schemas/property";
import { PropertyService } from "@services/property.service";
import { getAuthTokenFromContext } from "@utils/telefunc";

export async function onCreate(data: PropertyCreationType) {
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

export async function onUpdate(data: PropertyUpdateType) {
	const authToken = getAuthTokenFromContext();
	try {
		const propertyService = new PropertyService(authToken);
		return await propertyService.updateProperty(data);
	} catch (error) {
		console.trace(error);
	}
}

export async function onDelete(propertyId: string) {
	const authToken = getAuthTokenFromContext();
	try {
		const propertyService = new PropertyService(authToken);
		return await propertyService.deleteProperty(propertyId);
	} catch (error) {
		console.trace(error);
	}
}
