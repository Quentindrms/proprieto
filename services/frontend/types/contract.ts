import type { Property } from "./property";

export interface Contract {
	startDate: Date;
	endDate: Date;
	lease: number;
	propertyId: string;
	clientId: string;
	property: Property;
}
