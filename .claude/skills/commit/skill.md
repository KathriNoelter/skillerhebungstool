---
description: Create well-formatted git commits following the team's conventions. Activates when the user asks to commit, save changes, or create a commit message.
user_invocable: true
---

# Commit Message Skill

## Format

```
<type>(<scope>): <short summary>

<body — explain WHY, not what>

<footer>
```

## Types

| Type       | When to use                                    |
|------------|------------------------------------------------|
| `feat`     | New feature or capability                      |
| `fix`      | Bug fix                                        |
| `refactor` | Code change that neither fixes nor adds        |
| `docs`     | Documentation only                             |
| `test`     | Adding or updating tests                       |
| `chore`    | Build, CI, tooling, dependencies               |
| `perf`     | Performance improvement                        |
| `style`    | Formatting, whitespace (no logic change)       |

## Rules

- **Summary**: imperative mood, lowercase, no period, max 50 chars
- **Scope**: the module or area affected (e.g., `auth`, `api`, `ui`)
- **Body**: wrap at 72 chars, explain the motivation for the change
- **Footer**: reference issues (e.g., `Closes #123`) or note breaking changes

## Process

1. Run `git status` and `git diff --staged` to understand all changes
2. Group related changes logically — one commit per logical change
3. Write the message following the format above
4. Stage only the relevant files — avoid `git add .` unless all changes are related

## Examples

```
feat(auth): add OAuth2 login with Google provider

Users can now sign in with their Google accounts. This replaces the
magic-link flow which had low conversion rates on mobile.

Closes #342
```

```
fix(api): prevent duplicate webhook deliveries

Added idempotency key check before processing webhook payloads.
Duplicate events were causing double charges for some customers.

Closes #891
```
