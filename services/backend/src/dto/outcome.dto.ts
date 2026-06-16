import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateOutcomeDto {
	@IsString()
	name!: string;

	@IsNumber()
	amount!: number;

	@IsBoolean()
	isRecurring!: boolean;

	@IsBoolean()
	isPaid!: boolean;

	@IsDateString()
	issueDate!: string;

	@IsOptional()
	@IsDateString()
	paidOn?: string;

	@IsEnum({ week: "week", month: "month", year: "year", none: "none" })
	frequency!: string;

	@IsUUID()
	providerId!: string;

	@IsUUID()
	propertyId!: string;

	@IsUUID()
	categoryId!: string;
}

export class UpdateOutcomeDto {
	@IsUUID()
	id!: string;

	@IsString()
	name!: string;

	@IsNumber()
	amount!: number;

	@IsBoolean()
	isRecurring!: boolean;

	@IsBoolean()
	isPaid!: boolean;

	@IsDateString()
	issueDate!: string;

	@IsOptional()
	@IsDateString()
	paidOn?: string;

	@IsEnum({ week: "week", month: "month", year: "year", none: "none" })
	frequency!: string;

	@IsUUID()
	providerId!: string;

	@IsUUID()
	propertyId!: string;

	@IsUUID()
	categoryId!: string;
}
