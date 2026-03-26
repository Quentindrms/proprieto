export interface CreateAccountDto {
	name: string;
	firstName: string;
	address: string;
	email: string;
	phone: string;
	password: string;
}

export interface CreatePropertyDto {
	name: string;
	purchasePrice?: number;
	purchaseDate?: Date;
	isActive: boolean;
	type: string;
}

export interface UpdatePropertyDto {
	id: string;
	name: string;
	purchasePrice?: number;
	purchaseDate?: Date;
	sellPrice?: number;
	sellDate?: Date;
	type: string;
}

export interface CreateOutcomeDto {
	name: string;
	amount: number;
	isRecuring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn?: Date;
	frequency: string;
	propertyId: string;
	categoryId: string;
}

export interface CreateProviderDto {
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
}
