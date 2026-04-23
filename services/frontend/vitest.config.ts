import { fileURLToPath } from "url";
import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		environment: "node",
		globals: true,
		include: ["test/**/*.test.{ts,tsx}"],
		coverage: {
			provider: "v8",
			include: ["hooks/**", "services/**", "utils/**", "schemas/**"],
			exclude: ["**/*.telefunc.ts", "node_modules/**"],
		},
	},
	resolve: {
		alias: {
			"@components": fileURLToPath(new URL("components/", import.meta.url)),
			"@app/types": fileURLToPath(new URL("types/", import.meta.url)),
			"@assets": fileURLToPath(new URL("assets/", import.meta.url)),
			"@hooks": fileURLToPath(new URL("hooks/", import.meta.url)),
			"@services": fileURLToPath(new URL("services/", import.meta.url)),
			"@utils": fileURLToPath(new URL("utils/", import.meta.url)),
			"@schemas": fileURLToPath(new URL("schemas/", import.meta.url)),
		},
	},
});
