import { IsEmail, IsPhoneNumber, IsString, IsUUID } from "class-validator";

export class CreateProviderDto {
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

export class UpdateProviderDto {
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
