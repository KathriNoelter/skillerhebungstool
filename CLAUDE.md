# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> Only non-negotiable rules belong here. This file loads into EVERY session.
> Task-specific expertise belongs in `.claude/skills/` instead.

## Language & Runtime

- Use TypeScript with strict mode enabled
- Use PNPM as the package manager — never npm or yarn
- Target Node.js 20+ / ES2022+

## Code Standards

- Follow existing patterns in the codebase before introducing new ones
- No `any` types — use `unknown` and narrow with type guards
- Prefer named exports over default exports
- Use absolute imports via path aliases (e.g., `@/lib`, `@/components`)

## Git

- Never force-push to `main` or `develop`
- Never commit secrets, `.env` files, or credentials
- Run linting and type-checking before committing
- Commit messages follow conventional commits: `<type>(<scope>): <summary>` (see `.claude/skills/commit/skill.md`)

## Testing

- No test framework is currently configured — do not add test infrastructure unless explicitly requested
- `pnpm typecheck` and TypeScript strict mode are the primary quality gates before committing

## Architecture

- This is a Vite + React + Electron app — no backend, no API routes, no database
- Separate Electron main process (`electron/`) from React renderer (`src/`)
- Keep business logic in `src/lib/` — components are for rendering only
- Prefer composition over inheritance

## Claude Code Configuration

This repo contains a `.claude/` directory with shared team configuration:

- **Skills** (`skills/commit`, `skills/deploy`, `skills/pr-review`) — invoke via `/commit`, `/deploy`, `/pr-review`
- **Agents** (`agents/code-reviewer.md`, `agents/researcher.md`) — specialized subagents for code review and research
- **Hooks** (`settings.json`) — PreToolUse hook blocks destructive shell commands
- **MCP setup** (`mcp-setup.sh`) — optional MCP server connections (GitHub, Figma, Sentry)
