---
description: Guide deployment to staging or production environments. Activates when the user asks to deploy, release, ship, or push to production/staging.
user_invocable: true
---

# Deployment Skill

## Pre-Deployment Checklist

1. **Verify branch** — confirm you're on the correct release branch
2. **Run the full test suite** — `pnpm test` must pass with zero failures
3. **Run type checking** — `pnpm typecheck` must pass cleanly
4. **Run linting** — `pnpm lint` must show no errors
5. **Check for uncommitted changes** — working directory must be clean
6. **Review recent commits** — summarize what's being deployed

## Deployment Steps

### Staging
1. Ensure all checks above pass
2. Push to the staging branch: `git push origin HEAD:staging`
3. Monitor the CI/CD pipeline for successful build
4. Verify the deployment at the staging URL
5. Run smoke tests against staging

### Production
1. Complete staging deployment and verification first
2. Create a release tag: `git tag -a v<version> -m "Release v<version>"`
3. Push the tag: `git push origin v<version>`
4. Monitor the CI/CD pipeline
5. Verify the deployment at the production URL
6. Run smoke tests against production
7. Monitor error tracking (Sentry) for 15 minutes post-deploy

## Rollback Procedure

If issues are detected post-deploy:
1. Revert to the previous release tag
2. Push the revert immediately
3. Notify the team with details of the issue

## Output Format

Always confirm each checklist item before proceeding. If any check fails, stop and report the issue — never deploy with failing checks.
