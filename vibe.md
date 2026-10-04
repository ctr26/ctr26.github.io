---
title: How I Work
layout: default
permalink: /vibe/
description: How Craig Russell writes code and runs a repository; commits, worktrees, typing, and what collaborators can expect.
---

# How I Work

I'm an ML scientist who codes. This page is the working style I bring to a repository, and what you can expect if we share one. For the practical side of coding with an AI assistant, see [Vibe Coding for Scientists](/vibe-coding/).

[Fundamentals](#fundamentals) • [Advanced](#advanced) • [Anti-patterns](#anti-patterns) • [Working with me](#working-with-me)

---

## Fundamentals {#fundamentals}

The practices that shape everything else.

### Commits
- One commit does one thing.
- The first line says what changed, and the body says why.
- Read your own commits from last month; if you can't follow them, nobody else can.

### Readable code
- Write code that doesn't announce itself as AI-generated.
- Keep indentation shallow (four levels at most), and extract a function when nesting gets deep.

### Files
- Resist creating new files unless you have to; new files are expensive.
- Flat structures beat deeply nested ones, and each file has one clear job.

### Standards over invention
- Follow the style guide that exists (Google Python, PEP 8).
- Use conventional commit and branch formats rather than inventing your own.

### Git
- Small, focused commits are easier to review and to revert.
- Never bundle unrelated changes; commit messages are for future you and your team.

---

## Advanced {#advanced}

### Worktrees
- I don't `git checkout` between branches; every branch gets its own worktree.
- Several features move in parallel without stepping on each other's working tree (merge conflicts are still yours to resolve), and one workspace means one concern.

### Agents
- Independent work runs in the background by default, so the main session stays free for steering rather than waiting.
- Planning and execution are separate jobs, whether the worker is a person or an agent.

### Typed everything
- Pydantic schemas for configs, validated at runtime.
- Type hints everywhere, so tools catch errors before the code runs.
- Invalid states shouldn't be representable.

### Minimal diffs
- Extract shared abstractions to cut duplication.
- Prefer additive changes to rewrites.
- Delete dead code completely; no commented-out safety blankets.

### Privacy and security
- Never reference private repositories in public spaces.
- Review what goes into a commit (no secrets, no `.env` files).
- Treat branch names and repository references as potentially sensitive.

---

## Anti-patterns I avoid {#anti-patterns}

### LLM-looking code
Code that is overly verbose, with abstractions nobody needs and generic variable names. Creating a `DataProcessor` base class when there is one processor.

### File clutter
Splitting every function into its own file. Extend the module that exists.

### Blocking workflows
Running git operations one after another when worktrees would let them run side by side. Never wait when you can parallelise.

### Messy git history
Bundling unrelated changes, vague messages, bypassed hooks, force-pushes to main. One commit that says "fix tests, update docs, add feature".

### Private repository leakage
Mentioning private work in public issues, PRs, or commits, or linking to internal repositories.

---

## Working with me {#working-with-me}

### What I value
- Atomic commits and a clean history.
- Conventional formats for commits, branches, and review comments.
- Type safety and validation over runtime errors.
- Minimal diffs and focused PRs.
- Documentation that lives with the code.

### How I work
- Worktrees for everything, so expect several workspaces per repository.
- Background agents for parallel tasks; the main session stays responsive.
- Python first, with Pydantic, Hydra, uv, and ruff.
- Google Python Style Guide unless the repository has its own conventions.
- PRs go up when CI passes; no "fix in review" cycles.

### Communication
- Conventional comments in code review.
- Draft PRs for work in progress, ready PRs for merge-ready code.
- Direct feedback over indirect suggestions.
- Context in commit messages; explain the why.

### Expectations
- Don't reference private repositories on public or organisation repositories.
- Follow the repository's conventions if it has them, and standards if not.
- Ask before force-pushing or any destructive git operation.
- Keep file clutter minimal; prefer extending to creating.

One caveat, since the other page says code can be disposable. Disposable does not mean sloppy. A plotting script you will regenerate tomorrow still gets a clear name and a clean commit; it just doesn't get an afternoon of polish.
