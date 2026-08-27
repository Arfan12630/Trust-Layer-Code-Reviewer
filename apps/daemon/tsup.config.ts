import { baseConfig } from "@trust-layer/tsup-config";
import { defineConfig } from "tsup";

export default defineConfig({
	...baseConfig,
	entry: ["src/index.ts", "src/bin.ts"],
});
