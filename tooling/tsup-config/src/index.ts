import type { Options } from "tsup";

/**
 * Shared bundling defaults for the two runnable apps (daemon, hook-claude-code).
 *
 * `noExternal` is load-bearing: tsup treats everything in `dependencies` as
 * external by default. `@trust-layer/*` packages are source-exported and never
 * built (see the monorepo's "source exports, bundle at leaves" strategy), so an
 * app that left them external would ship a binary with an unresolvable import
 * at startup. This bundles every `@trust-layer/*` package into the app's output
 * instead of leaving it as a dangling require/import.
 */
export const baseConfig = {
	format: ["esm"],
	target: "es2022",
	platform: "node",
	noExternal: [/^@trust-layer\//],
	clean: true,
	dts: false,
} satisfies Options;
