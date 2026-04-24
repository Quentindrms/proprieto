import {
	IsBoolean,
	IsDateString,
	IsNumber,
	IsNumberString,
	IsOptional,
	IsString,
	IsUUID,
} from "class-validator";

export class CreatePropertyDto {
	@IsString()
	name: string;

	@IsNumberString()
	purchasePrice: number;

	@IsDateString()
	purchaseDate: string;

	@IsUUID()
	type: string;
}

export class UpdatePropertyDto {
	@IsUUID()
	id: string;

	@IsString()
	name: string;

	@IsNumber()
	purchasePrice: number;

	@IsOptional()
	@IsDateString()
	purchaseDate?: string;

	@IsOptional()
	@IsDateString()
	sellDate: Date;

	@IsOptional()
	@IsNumber()
	sellPrice?: number;

	@IsUUID()
	type: string;
}
