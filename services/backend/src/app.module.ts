import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { ClientModule } from "./client/client.module";
import { ContractModule } from "./contract/contract.module";
import { IncomeModule } from "./income/income.module";
import { OutcomeModule } from "./outcome/outcome.module";
import { PropertyModule } from "./property/property.module";
import { ProviderModule } from "./provider/provider.module";
import { UserModule } from "./user/user.module";

@Module({
	imports: [
		AuthModule,
		ClientModule,
		ContractModule,
		IncomeModule,
		OutcomeModule,
		PropertyModule,
		ProviderModule,
		UserModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
