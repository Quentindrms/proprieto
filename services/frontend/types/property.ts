export interface Property {
	id: string;
	name: string;
	purchasePrice?: string;
	purchaseDate?: Date;
	sellPrice?: string;
	sellDate?: Date;
	isDeleted: boolean;
	isActive: boolean;
	type: string;
}
