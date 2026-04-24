import { BadRequestException, Logger, ValidationPipe } from "@nestjs/common";

const logger = new Logger("ValidationPipe");

export const validationPipe = new ValidationPipe({
	whitelist: true,
	transform: true,
	exceptionFactory: (errors) => {
		logger.error("Validation failed", JSON.stringify(errors, null, 2));
		return new BadRequestException(errors);
	},
});
