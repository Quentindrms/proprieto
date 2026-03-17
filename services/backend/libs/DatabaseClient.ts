import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "generated/prisma/client";
import "dotenv/config";

class DatabaseClient {
	private static instance: PrismaClient;

	private constructor() {
		const connectionString = process.env.DATABASE_URL;
		if (!connectionString) throw new Error("DATABASE_URL is required");

		const adapter = new PrismaPg({ connectionString });
		DatabaseClient.instance = new PrismaClient({ adapter: adapter });
	}

	public static getInstance(): PrismaClient {
		if (!DatabaseClient.instance) new DatabaseClient();
		return DatabaseClient.instance;
	}
}

export const prisma = DatabaseClient.getInstance();
