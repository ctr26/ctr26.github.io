---
layout: page
title: Vibe Coding for Scientists
permalink: /vibe-coding/
---

You're a scientist, not a software engineer — but you write a lot of code. Data pipelines, analysis scripts, ML experiments, plotting, glue code between tools that were never meant to talk to each other. Most of it is means to an end: you care about the *result*, not the code itself.

**Vibe coding** is the practice of using AI to write code by describing what you want in natural language, iterating conversationally, and staying in the driver's seat on the science while the AI handles implementation details. Think of it as pair programming with a colleague who types fast, knows every API, and never gets annoyed when you change your mind.

I've been using [Claude Code](https://docs.anthropic.com/en/docs/claude-code) — Anthropic's CLI coding agent — as my primary vibe coding tool. This page is a practical guide to getting started, shaped by my experience building ML pipelines, bioimage analysis tools, and foundation models.

## Why This Matters for Scientists

Most scientists I've worked with (myself included) fall into a gap: we know enough to code, but not enough to be *fast*. We lose hours to:

- Debugging environment issues and dependency conflicts
- Remembering the right pandas/numpy/scipy incantation
- Writing boilerplate (argparse, logging, config files, plotting)
- Translating a method from a paper into working code
- Refactoring a Jupyter notebook into something reproducible

These are exactly the tasks where AI assistants excel. The science — experimental design, hypothesis formation, interpreting results, knowing what to compute and why — that's still entirely you. Vibe coding lets you spend more time on the parts that require your domain expertise.

## Getting Started with Claude Code

### Install

```bash
# Install Claude Code CLI
npm install -g @anthropic-ai/claude-code

# Start a session in your project directory
cd my-research-project/
claude
```

### Basic Patterns

Once you're in a session, you just talk:

- *"Read the CSV in data/results.csv and plot a violin plot of column 'expression' grouped by 'treatment'"*
- *"This script is too slow — profile it and suggest optimisations"*
- *"Write a Snakemake rule that runs this analysis for each sample in the manifest"*
- *"Refactor this notebook into a CLI script with proper argument parsing"*

Claude reads your files, understands your project structure, writes code, runs it, and iterates based on errors or your feedback. You stay in the loop at every step — approving changes, correcting course, adding constraints.

### The Conversational Loop

The power is in the iteration. A typical flow looks like:

1. **Describe** what you want at a high level
2. **Review** the proposed code — does it match your scientific intent?
3. **Run** it — Claude can execute code and see the output
4. **Refine** — "actually, use log scale on the y-axis" or "filter out controls first"
5. **Commit** when you're happy

This is faster than writing code from scratch *and* faster than searching Stack Overflow, because the AI has full context of your project.

## The CLAUDE.md File: Teaching Claude Your Project

The single most impactful thing you can do is add a `CLAUDE.md` file to your repo root. This is a plain Markdown file that Claude reads at the start of every session. Think of it as onboarding notes for a new lab member.

A good scientific `CLAUDE.md` includes:

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

This context makes Claude dramatically more useful. Instead of generic Python, it writes code that fits *your* project.

## Workflows That Work

### Prototyping ML Experiments

This is where I get the most value. Instead of writing training loops from scratch:

*"Set up a PyTorch Lightning module for a VAE with a ResNet18 encoder. The input is 3-channel 224x224 cell images. Use the same latent dim as the config. Add wandb logging for reconstruction loss and KL divergence."*

Claude writes it, you review the architecture, tweak the loss weighting, and you're training in minutes instead of an hour.

### Data Analysis and Exploration

For the kind of exploratory analysis that fills a scientist's day:

*"Load the AnnData object in data/processed/adata.h5ad. Show me the top 20 differentially expressed genes between clusters 3 and 7, and make a volcano plot."*

You get the plot, stare at it, and follow up: *"Interesting — now run GO enrichment on the upregulated genes and show me the top biological process terms."*

### Debugging Legacy Code

Every lab has *that* script — the one a former postdoc wrote, nobody fully understands, but it still runs the key analysis. Claude can read it, explain what it does, and help you carefully refactor it:

*"Read src/legacy/process_images.py. Explain what it does step by step, then refactor it to use pathlib instead of os.path and add type hints. Don't change the logic."*

### Writing Reproducible Pipelines

Moving from notebooks to proper pipelines:

*"Convert this Jupyter notebook into a Snakemake workflow. Each section header should be a separate rule. Keep the same parameters but read them from a config.yaml."*

## Tips and Pitfalls

**Verify numerical code.** AI is excellent at writing syntactically correct code that does the wrong maths. Always sanity-check statistical tests, loss functions, and data transformations against known results or toy examples.

**Don't trust unfamiliar libraries blindly.** Claude occasionally suggests functions that don't exist or have different signatures than expected. If it uses an API you haven't seen before, check the docs.

**Keep the science in your head.** The AI doesn't know your biological system, your experimental design, or why that specific normalisation step matters. Provide that context explicitly — don't assume it will infer scientific intent from code alone.

**Commit often.** Vibe coding moves fast. Commit working states frequently so you can roll back when an iteration goes sideways.

**Start small.** Don't ask Claude to write your entire pipeline in one go. Break it into components: data loading, preprocessing, model, training, evaluation. Review each piece before moving on.

**Use headless mode for batch jobs.** Claude Code supports non-interactive usage (`claude -p "your prompt"`) which is useful for running standardised analysis steps or code generation as part of CI.

## My Take

Vibe coding isn't a replacement for understanding your code. It's a force multiplier. The scientists who will get the most out of it are the ones who already think clearly about their problems — the AI just removes the friction between "I know what I want to compute" and "I have working code that computes it."

The biggest mindset shift: treat code as *disposable infrastructure* for your scientific questions, not as a precious artefact. If Claude can regenerate a plotting script in 30 seconds, you don't need to spend 20 minutes making it perfect. Spend that time thinking about what the plot is telling you.

For scientists building ML models specifically, vibe coding is transformative. The gap between reading a paper and having a working implementation of the method used to be days. Now it's hours, sometimes minutes — if you can clearly articulate what you want.

That's the key skill: **clear articulation of scientific intent.** Turns out, the same thing that makes you good at writing papers makes you good at vibe coding.

---

*I'm Craig Russell, an ML Scientist working on virtual cell foundation models at [Recursion](https://www.recursion.com/). I use Claude Code daily for ML research, pipeline development, and open-source tool building. Find me on [GitHub](https://github.com/ctr26) or [LinkedIn](https://linkedin.com/in/ctr26).*
