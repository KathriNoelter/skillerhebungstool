---
description: Review pull requests using the team's checklist. Activates when the user asks to review a PR, check code changes, or provide feedback on a diff.
user_invocable: true
---

# PR Review Skill

## Review Process

1. **Read the full diff** — understand every changed file before commenting
2. **Check the PR description** — does it explain the why, not just the what?
3. **Run through the checklist below** for each changed file

## Review Checklist

### Correctness
- [ ] Logic is correct and handles edge cases
- [ ] No off-by-one errors, null pointer risks, or race conditions
- [ ] Error handling is present and appropriate
- [ ] No regressions to existing functionality

### Security
- [ ] No secrets, tokens, or credentials in the code
- [ ] User input is validated and sanitized
- [ ] No SQL injection, XSS, or command injection vectors
- [ ] Authentication/authorization checks are in place where needed

### Code Quality
- [ ] Follows existing project patterns and conventions
- [ ] No dead code, commented-out blocks, or TODOs without tickets
- [ ] Functions are focused — single responsibility
- [ ] Naming is clear and consistent

### Testing
- [ ] New code has corresponding tests
- [ ] Edge cases are covered
- [ ] Existing tests still pass

### Performance
- [ ] No N+1 queries or unnecessary database calls
- [ ] No blocking operations in hot paths
- [ ] Large data sets are paginated or streamed

## Output Format

Structure your review as:

```
## Summary
[1-2 sentence overview of the changes]

## Verdict: APPROVE | REQUEST_CHANGES | COMMENT

## Issues Found
### Critical (must fix)
- ...

### Suggestions (nice to have)
- ...

## What Looks Good
- ...
```
