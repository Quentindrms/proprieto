import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";

@Injectable()
export class OutcomeCategoryService {
	async browseCategory() {
		return await prisma.categories.findMany({
			where: {
				type: "outcome",
			},
		});
	}
}
