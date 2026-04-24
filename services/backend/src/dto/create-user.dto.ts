import {
	IsEmail,
	IsPhoneNumber,
	IsString,
	IsStrongPassword,
	min,
} from "class-validator";

export class CreateUserDto {
	@IsString()
	name: string;

	@IsString()
	firstName: string;

	@IsString()
	address: string;

	@IsEmail()
	email: string;

	@IsPhoneNumber("FR")
	phone: string;

	@IsStrongPassword({
		minLength: 12,
		minLowercase: 0,
		minNumbers: 0,
		minSymbols: 0,
		minUppercase: 0,
	})
	password: string;
}
