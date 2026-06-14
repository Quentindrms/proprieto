import { IsDateString, IsNumber, IsUUID, isUUID } from "class-validator";

export class CreateContractDto {
	@IsDateString()
	startDate!: string;

	@IsDateString()
	endDate!: string;

	@IsNumber()
	lease!: number;

	@IsUUID()
	propertyId!: string;

	@IsUUID()
	clientId!: string;
}

export class UpdateContractDto {
	@IsUUID()
	id!: string;

	@IsDateString()
	startDate!: string;

	@IsDateString()
	endDate!: string;

	@IsNumber()
	lease!: number;
}
