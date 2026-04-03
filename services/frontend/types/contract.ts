import type { Property } from "./property";

export interface Contract {
	id: string;
	startDate: Date;
	endDate: Date;
	lease: number;
	propertyId: string;
	clientId: string;
	property: Property;
}
