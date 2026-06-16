import { prisma } from "@libs/DatabaseClient";
import { Injectable, Logger } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";

@Injectable()
export class TaskService {
	private readonly logger = new Logger(TaskService.name);

	@Cron("0 0 * * *")
	async handleCron() {
		const today = new Date();
		today.setHours(0, 0, 0, 0);
		const tomorrow = new Date(today);
		tomorrow.setDate(tomorrow.getDate() + 1);

		const result = await prisma.contracts.updateMany({
			where: {
				isEnded: false,
				isDeleted: false,
				endDate: {
					lte: today,
				},
			},
			data: {
				isEnded: true,
			},
		});

		this.logger.log(
			TaskService.name,
			`${result.count} contrat(s) marqué(s) comme terminé(s)`,
		);
	}
}
