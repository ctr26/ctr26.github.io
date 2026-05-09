# CV proposal — agentic discovery + inference engineering

Proposed additions to `index.md`. Not yet applied to the live CV — review here, then merge into `index.md` when happy.

## 1) Core Strengths line — add two new bullets

Current:

> Foundation models • Representation/self‑supervised learning • Multi‑modal fusion • Knowledge graphs • Biological sequence & transcriptomics • High‑content imaging • GNNs • OOD/robustness • Scaling & performance • Reproducible ML (MLOps) • Scientific communication

Proposed (new items inserted after **Knowledge graphs**):

> Foundation models • Representation/self‑supervised learning • Multi‑modal fusion • Knowledge graphs • **Agentic discovery** • **Inference‑time engineering / hallucination suppression** • Biological sequence & transcriptomics • High‑content imaging • GNNs • OOD/robustness • Scaling & performance • Reproducible ML (MLOps) • Scientific communication

## 2) Recursion experience — new bullet (above the Community line)

Add this bullet to the **Senior Machine Learning Scientist — Valence Labs @ Recursion Pharmaceuticals** section, immediately above the **Community** bullet:

> - **Agentic discovery:** Built inference‑time engineering layers around multi‑modal foundation models — constrained decoding to closed biological vocabularies (Ensembl/HGNC/ChEMBL), tool‑call verification against structured knowledge graphs, retrieval grounding with citation‑level attribution, verifier‑model ensembles — to wall hallucinations into checkable failure modes for autonomous hypothesis generation.

## 3) Skills — extend the ML & AI line

Current:

> **ML & AI:** Foundation‑model fine‑tuning, contrastive/self‑supervised learning, OOD & uncertainty, evaluation/ablation design

Proposed:

> **ML & AI:** Foundation‑model fine‑tuning, contrastive/self‑supervised learning, OOD & uncertainty, evaluation/ablation design, **agentic LLM workflows**, **inference‑time engineering** (constrained decoding, tool‑call verification, retrieval grounding, verifier ensembles)

---

## Rationale

Adds language around two adjacent capability areas that aren't visible in the current CV but are part of the Recursion/Valence work:

1. **Agentic discovery** — autonomous hypothesis generation by LLMs operating over biological foundation models.
2. **Inference‑time engineering for hallucination suppression** — constrained decoding, tool‑call verification, retrieval grounding, verifier ensembles. This is the engineering layer that makes (1) scientifically usable rather than a free-generation gimmick.

Surfaced now because both feature centrally in the Sanger / GDM Fellowship cover letter, and ought to be reflected in the CV that supports it.

## Apply

When ready, the additions can be merged into `index.md` directly — sections/locations called out above. No structural changes to the rest of the CV.
