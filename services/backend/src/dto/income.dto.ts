import {
	IsBoolean,
	IsDateString,
	IsEnum,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreateIncomeDto {
	@IsString()
	name: string;

	@IsNumberString()
	amount: number;

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
	categoryId: string;

	@IsUUID()
	contractId: string;
}

export class UpdateIncomeDto {
	@IsUUID()
	id: string;

	@IsString()
	name: string;

	@IsNumber()
	amount: number;

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
	categoryId: string;

	@IsUUID()
	contractId: string;
}
