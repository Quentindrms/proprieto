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
			"@components": fileURLToPath(new URL("components/", import.meta.url)),
			"@types": fileURLToPath(new URL("types/", import.meta.url)),
			"@assets": fileURLToPath(new URL("assets/", import.meta.url)),
		},
	},
});
