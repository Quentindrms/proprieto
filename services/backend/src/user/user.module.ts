import { Module } from "@nestjs/common";
import { ClientController } from "src/client/client.controller";
import { ClientService } from "src/client/client.service";

@Module({
	imports: [],
	controllers: [ClientController],
	providers: [ClientService],
})
export class UserModule {}
