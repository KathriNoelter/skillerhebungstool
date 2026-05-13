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

## Database

- Never modify the database schema directly — always use migrations
- Never run destructive queries (DROP, TRUNCATE) without explicit user confirmation

## Git

- Never force-push to `main` or `develop`
- Never commit secrets, `.env` files, or credentials
- Run linting and type-checking before committing
- Commit messages follow conventional commits: `<type>(<scope>): <summary>` (see `.claude/skills/commit/skill.md`)

## Testing

- Every new feature must include tests
- Run the existing test suite before submitting changes

## Architecture

- Keep business logic out of API route handlers — use service layers
- Prefer composition over inheritance

## Claude Code Configuration

This repo contains a `.claude/` directory with shared team configuration:

- **Skills** (`skills/commit`, `skills/deploy`, `skills/pr-review`) — invoke via `/commit`, `/deploy`, `/pr-review`
- **Agents** (`agents/code-reviewer.md`, `agents/researcher.md`) — specialized subagents for code review and research
- **Hooks** (`settings.json`) — PreToolUse hook blocks destructive shell commands; PostToolUse hook auto-formats written files with Prettier
- **MCP setup** (`mcp-setup.sh`) — optional MCP server connections (GitHub, Postgres, Sentry, Slack, Figma)
