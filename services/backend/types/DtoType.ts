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
	isRecurring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn?: Date;
	frequency: string;
	providerId: string;
	propertyId: string;
	categoryId: string;
	isDeleted: boolean;
}

export interface UpdateOutcomeDto {
	id: string;
	name: string;
	amount: number;
	isRecurring: boolean;
	isPaid: boolean;
	issueDate: Date;
	paidOn?: Date;
	frequency: string;
	providerId: string;
	propertyId: string;
	categoryId: string;
	isDeleted: boolean;
}

export interface CreateProviderDto {
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
}

export interface UpdateProviderDto {
	id: string;
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
}

export interface CreateClientDto {
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
}

export interface UpdateClientDto {
	id: string;
	name: string;
	firstName: string;
	email: string;
	address: string;
	phone: string;
}

export interface CreateContractDto {
	startDate: string;
	endDate: string;
	lease: number;
	propertyId: string;
	clientId: string;
}

export interface CreateIncomeDto {
	name: string;
	amount: number;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: string;
	categoryId: string;
	contractId: string;
}

export interface UpdateIncomeDto {
	id: string;
	amount: number;
	isPaid: boolean;
	issueDate: Date;
	paidOn: Date;
	frequency: string;
	categoryId: string;
	contractId: string;
}
