---
title: Vibe Coding
layout: default
permalink: /vibe/
description: A practical guide to coding with Claude Code as a research scientist; setup, CLAUDE.md, workflows for ML and data analysis, the practices that keep it sane, and the pitfalls.
---

# Vibe Coding

You're a scientist, not a software engineer, but you write a lot of code. Data pipelines, analysis scripts, glue between tools that were never meant to talk to each other. Most of it is a means to an end; you care about the result, not the code.

Vibe coding, in the sense used here, is using an AI to write code by describing what you want in plain language, iterating conversationally, and staying in the driver's seat on the science while the AI handles implementation. Karpathy's original sense was closer to "forget the code exists"; for science it has to be more careful, and the pitfalls below say why. Think of it as pair programming with a colleague who types fast and never minds when you change your mind.

The tool this guide uses is [Claude Code](https://code.claude.com/docs), Anthropic's CLI coding agent. Most of it transfers to any agentic coding tool.

[Why](#why) • [Getting started](#start) • [CLAUDE.md](#claude-md) • [Workflows](#workflows) • [Practices](#practices) • [Pitfalls](#pitfalls) • [Anti-patterns](#anti-patterns)

## Why this matters for scientists {#why}

Most scientists know enough to code but not enough to be fast. The hours go on

- debugging environment issues and dependency conflicts,
- remembering the right pandas, numpy, or scipy incantation,
- writing boilerplate (argparse, logging, config files, plotting),
- translating a method from a paper into working code, and
- refactoring a Jupyter notebook into something reproducible.

These are exactly the tasks an AI assistant is good at. The science, which is to say the experimental design and knowing what to compute and why, is still entirely you. Vibe coding lets you spend more of your time there.

## Getting started with Claude Code {#start}

### Install

```bash
# Native installer (or: brew install claude-code, or npm install -g @anthropic-ai/claude-code)
curl -fsSL https://claude.ai/install.sh | bash

# Start a session in your project directory
cd my-research-project/
claude
```

### Basic patterns

Once you're in a session, you just talk.

- *"Read the CSV in data/results.csv and plot a violin plot of column 'expression' grouped by 'treatment'"*
- *"This script is too slow; profile it and suggest optimisations"*
- *"Write a Snakemake rule that runs this analysis for each sample in the manifest"*
- *"Refactor this notebook into a CLI script with proper argument parsing"*

Claude reads the files it needs, works out your project structure, writes code, runs it, and iterates on the errors or your feedback. You stay in the loop at every step, approving changes, correcting course, and adding constraints.

### The conversational loop

The power is in the iteration. A typical flow runs

1. **Describe** what you want at a high level.
2. **Review** the proposed code. Does it match your scientific intent?
3. **Run** it. Claude can execute code and see the output.
4. **Refine** with "actually, use log scale on the y-axis" or "filter out controls first".
5. **Commit** when you're happy.

This is faster than writing from scratch and faster than searching Stack Overflow, because the AI reads the parts of your project it needs as it goes.

### Headless mode

Claude Code also runs non-interactively with `claude -p "your prompt"`, which suits standardised analysis steps or code generation in CI.

## Teaching Claude your project with CLAUDE.md {#claude-md}

The single most useful thing you can do is add a `CLAUDE.md` file to your repository root. It is a plain Markdown file that Claude reads at the start of every session. Think of it as onboarding notes for a new lab member.

A good scientific `CLAUDE.md` looks something like this.

```markdown
# CLAUDE.md

## Project Overview
This repo implements [brief description of the science].
The main analysis pipeline is in `src/pipeline.py`.

## Data
- Raw data lives in `data/raw/` (do NOT modify)
- Processed outputs go to `data/processed/`
- We use AnnData (.h5ad) for single-cell data

## How to Run
- `snakemake --cores 8` runs the full pipeline
- `python src/train.py --config configs/default.yaml` for training
- Tests: `pytest tests/`

## Conventions
- We use PyTorch Lightning for all training loops
- Logging via wandb (project: "my-project")
- Figures for the paper go in `figures/` as both .png and .svg

## Important Context
- The baseline model is in `src/models/baseline.py`
- Don't modify anything in `src/legacy/` — it's kept for reproducibility
```

With that context Claude writes code that fits your project instead of generic Python. The conventions section is where the practices below go once you've settled on them; written there, the AI follows them without being asked each time.

## Workflows that work {#workflows}

### Prototyping ML experiments

This is where the gain is largest. Instead of writing a training loop from scratch, ask for it.

*"Set up a PyTorch Lightning module for a VAE with a ResNet18 encoder. The input is 3-channel 224x224 cell images. Use the same latent dim as the config. Add wandb logging for reconstruction loss and KL divergence."*

Claude writes it, you review the architecture and tweak the loss weighting, and you're training in minutes rather than an hour.

### Data analysis and exploration

For the exploratory analysis that fills a scientist's day, the same applies.

*"Load the AnnData object in data/processed/adata.h5ad. Show me the top 20 differentially expressed genes between clusters 3 and 7, and make a volcano plot."*

You get the plot, stare at it, and follow up. *"Interesting; now run GO enrichment on the upregulated genes and show me the top biological process terms."*

### Debugging legacy code

Every lab has that script, the one a former postdoc wrote, nobody fully understands, and the key analysis still depends on. Claude can read it, explain it, and help you refactor it carefully.

*"Read src/legacy/process_images.py. Explain what it does step by step, then refactor it to use pathlib instead of os.path and add type hints. Don't change the logic."*

### Reproducible pipelines

Moving from a notebook to a proper pipeline is a one-line ask.

*"Convert this Jupyter notebook into a Snakemake workflow. Each section header should be a separate rule. Keep the same parameters but read them from a config.yaml."*

## Practices that keep it sane {#practices}

Vibe coding produces a lot of code quickly. These habits are what stop a fast week turning into an unreadable repository. Put the ones you adopt in `CLAUDE.md`.

### Commits
- One commit does one thing. Ask for the change, review it, commit it, then ask for the next.
- The first line says what changed and the body says why. The why is what the AI can't recover for you later.
- Never bundle unrelated changes; "fix tests, update docs, add feature" in one commit is the classic failure.
- Commit working states often, so an iteration that goes sideways is a `git checkout` away from undone.

### Worktrees
- Give each branch its own `git worktree` rather than switching with `git checkout`. Several features move in parallel without stepping on each other's working tree; merge conflicts are still yours to resolve.
- One workspace means one concern, which also keeps the AI's context focused.

### Typed configs
- Pydantic schemas for configs, validated at runtime, so a typo in a YAML key fails at startup rather than three hours into training.
- Type hints everywhere; they let tools catch errors before the code runs, and they tell the AI what you meant.

### Small diffs
- Prefer additive changes to rewrites. Ask for the smallest change that does the job.
- Extract shared abstractions when duplication appears, not before.
- Delete dead code completely; no commented-out safety blankets.

### Files
- New files are expensive. Prefer extending the module that exists.
- Flat structures beat deeply nested ones, and each file has one clear job.

### Standards over invention
- Follow the style guide that exists (Google Python, PEP 8) and conventional commit and branch formats. The AI knows them, so you get them for free.

### Privacy
- Review what goes into a commit; no secrets, no `.env` files.
- Don't reference private repositories in public issues, PRs, or commits.

## Tips and pitfalls {#pitfalls}

**Verify numerical code.** AI is excellent at writing syntactically correct code that does the wrong maths. Sanity-check statistical tests, loss functions, and data transformations against known results or toy examples.

**Don't trust unfamiliar libraries blindly.** Claude occasionally suggests functions that don't exist or have different signatures than expected. If it uses an API you haven't seen, check the docs.

**Keep the science in your head.** The AI doesn't know your biological system, your experimental design, or why that normalisation step matters. Say so explicitly; it won't infer scientific intent from code alone.

**Start small.** Don't ask for the whole pipeline in one go. Data loading, preprocessing, model, training, evaluation, one at a time, reviewed before moving on.

**Run independent work in the background.** If two tasks don't depend on each other, let one run while you steer the other. The main session is for thinking, not waiting.

## Anti-patterns {#anti-patterns}

**LLM-looking code.** Overly verbose, with abstractions nobody needs and generic variable names. A `DataProcessor` base class when there is one processor. Ask for code that doesn't announce itself as generated.

**File clutter.** Every function in its own file. Extend the module that exists.

**Messy history.** Bundled changes, vague messages, bypassed hooks, force-pushes to main. The AI will happily produce all of these if you let it.

**Blocking on sequential work.** Running git operations one after another when worktrees would let them run side by side.

**Private repository leakage.** Mentioning private work in public discussions or linking to internal repositories, which is easy to do when the AI is drafting the text.

## The point

Vibe coding isn't a replacement for understanding your code. The scientists who get the most from it are the ones who already think clearly about their problems; the AI removes the friction between "I know what I want to compute" and "I have working code that computes it".

The biggest shift is treating code as disposable infrastructure for your scientific questions rather than a precious artefact. If Claude can regenerate a plotting script in 30 seconds, you don't need to spend 20 minutes making it perfect. Spend that time thinking about what the plot is telling you. Disposable doesn't mean sloppy; the practices above are where the line sits.

For scientists building ML models, the gap between reading a paper and having a working implementation of the method has gone from days to hours, if you can articulate what you want. That articulation is the key skill, and the thing that makes you good at writing papers makes you good at this.
