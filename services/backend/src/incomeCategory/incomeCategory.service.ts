import { prisma } from "@libs/DatabaseClient";
import { Injectable } from "@nestjs/common";

@Injectable()
export class IncomeCategoryService {
	async browseCategories() {
		return await prisma.incomeCategory.findMany();
	}
}
