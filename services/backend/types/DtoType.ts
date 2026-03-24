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
	isActive: boolean;
	type: string;
}
