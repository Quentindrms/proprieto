export interface Property {
	id: string;
	name: string;
	purchasePrice?: number;
	purchaseDate?: Date;
	sellPrice?: number;
	sellDate?: Date;
	isDeleted: boolean;
	isActive: boolean;
	propertyType: PropertyType;
	userId: string;
}

export interface PropertyType {
	id: string;
	slug: string;
	name: string;
}
