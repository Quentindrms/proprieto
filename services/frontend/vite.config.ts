import tailwindcss from "@tailwindcss/vite";
import { telefunc } from "telefunc/vite";
import { fileURLToPath } from "url";
import vike from "vike/plugin";
import vikeSolid from "vike-solid/vite";
import { defineConfig } from "vite";

export default defineConfig({
	plugins: [vike(), vikeSolid(), tailwindcss(), telefunc()],
	resolve: {
		alias: {
			"@components": fileURLToPath(new URL("components", import.meta.url)),
			"@app/types": fileURLToPath(new URL("types", import.meta.url)),
			"@assets": fileURLToPath(new URL("assets", import.meta.url)),
			"@hooks": fileURLToPath(new URL("hooks", import.meta.url)),
			"@services": fileURLToPath(new URL("services", import.meta.url)),
			"@utils": fileURLToPath(new URL("utils", import.meta.url)),
			"@schemas": fileURLToPath(new URL("schemas", import.meta.url)),
		},
	},
});
