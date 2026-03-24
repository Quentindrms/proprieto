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
	purshacePrice?: number;
	purshaceDate?: Date;
	isActive: boolean;
	type: string;
}
