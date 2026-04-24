import {
	IsDate,
	IsDateString,
	IsNumber,
	IsNumberString,
	IsUUID,
} from "class-validator";

export class CreateContractDto {
	@IsDateString()
	startDate: string;

	@IsDateString()
	endDate: string;

	@IsNumberString()
	lease: number;

	@IsUUID()
	propertyId: string;

	@IsUUID()
	clientId: string;
}

export class UpdateContractDto {}
