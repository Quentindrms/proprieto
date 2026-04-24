import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNumberString,
	IsOptional,
	IsString,
	IsUUID,
	isUUID,
} from "class-validator";

export class CreateOutcomeDto {
	@IsString()
	name: string;

	@IsNumberString()
	amount: number;

	@IsBoolean()
	isRecurring: boolean;

	@IsBoolean()
	isPaid: boolean;

	@IsDateString()
	issueDate: string;

	@IsOptional()
	@IsDateString()
	paidOn?: string;

	@IsEnum({ week: "week", month: "month", year: "year", none: "none" })
	frequency: string;

	@IsUUID()
	providerId: string;

	@IsUUID()
	propertyId: string;

	@IsUUID()
	categoryId: string;
}

export class UpdateOutcomeDto {
	@IsUUID()
	id: string;

	@IsString()
	name: string;

	@IsNumberString()
	amount: number;

	@IsBoolean()
	isRecurring: boolean;

	@IsBoolean()
	isPaid: boolean;

	@IsDateString()
	issueDate: string;

	@IsOptional()
	@IsDateString()
	paidOn?: string;

	@IsEnum({ week: "week", month: "month", year: "year", none: "none" })
	frequency: string;

	@IsUUID()
	providerId: string;

	@IsUUID()
	propertyId: string;

	@IsUUID()
	categoryId: string;

	@IsBoolean()
	isDeleted: boolean;
}
