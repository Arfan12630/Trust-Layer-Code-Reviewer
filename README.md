# Trust Layer

Pre-accept code reviewer for AI coding agents. This repo is currently a
scaffold — package structure and TypeScript toolchain are set up; no review
logic is implemented yet.

## Layout

```
trust-layer/
├── apps/                   # runnable artifacts (bundled with tsup, have a bin)
│   ├── daemon/              # long-lived server, warm session state over a unix socket
│   └── hook-claude-code/    # the Claude Code plugin (PreToolUse hook client)
├── packages/                # internal libraries — source-exported, never built
│   ├── schema/               # zod types shared by everything
│   ├── core/                 # orchestrator seam
│   ├── detectors/            # pluggable static detectors
│   ├── reviewer/             # ModelProvider interface + Anthropic implementation
│   ├── adapter/               # agent-agnostic contract (Claude Code, Cursor, ... )
│   ├── context-store/        # v0 interface stub
│   ├── github-connector/     # v0 interface stub
│   └── standards/            # v0 interface stub
├── tooling/
│   ├── tsconfig/             # shared tsconfig bases (base / lib / app)
│   └── tsup-config/          # shared bundling defaults for apps
└── fixtures/                 # seeded-defect corpus for detector evals
```

## Why packages have no `dist`

Everything under `packages/*` is **source-exported** — `package.json` points
`exports["."]` straight at `./src/index.ts`. There is no per-package build step
and no build-ordering problem; TypeScript project references resolve straight
to source, and only the two apps under `apps/*` actually bundle (via `tsup`),
inlining every `@trust-layer/*` package they depend on.

## Commands

```bash
pnpm install     # install workspace dependencies
pnpm lint        # biome check
pnpm typecheck   # tsc --noEmit across every package, no build required first
pnpm test        # vitest across every package
pnpm build       # tsup for apps/daemon and apps/hook-claude-code only
```
