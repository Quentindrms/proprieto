export interface Property {
	id: string;
	name: string;
	purchasePrice?: string;
	purshaseDate?: Date;
	sellPrice?: string;
	sellDate?: Date;
	isDeleted: boolean;
	isActive: boolean;
	type: string;
}

export interface CreateProperty {
	name: string;
	purshacePrice?: string;
	purshaceDate?: Date;
	isActive: boolean;
	type: string;
}
