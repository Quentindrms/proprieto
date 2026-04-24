import { IsEmail, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreateClientDto {
	@IsString()
	name: string;

	@IsString()
	firstName: string;

	@IsEmail()
	email: string;

	@IsString()
	address: string;

	@IsPhoneNumber("FR")
	phone: string;
}

export class UpdateClientDto {
	@IsUUID()
	id: string;

	@IsString()
	name: string;

	@IsString()
	firstName: string;

	@IsEmail()
	email: string;

	@IsString()
	address: string;

	@IsPhoneNumber("FR")
	phone: string;
}
