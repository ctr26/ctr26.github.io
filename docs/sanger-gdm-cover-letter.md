# Cover Letter: Google DeepMind Fellow in Genomics and AI

Dr Craig T. Russell
London, UK · <craig.russell.phd@gmail.com> · [ctr26.github.io](https://ctr26.github.io)

To the Fellowship Review Panel,
Wellcome Sanger Institute & Google DeepMind Academic Fellowship Programme

---

## Why Sanger, and why now

This Fellowship sits where my work is heading.
I want to take the multi-modal foundation-model approaches I have built in industry and ground them in the world's richest genomics environment, to deliver fundamental biological insight.
Sanger is the only place in the UK where atlas-scale single-cell data (Cellular Genomics), a programme committed to predictive biology (Generative Genomics), and a strategic embrace of AI for science share one building.
I want to spend three years here.

I am Senior Machine Learning Scientist at Valence Labs / Recursion Pharmaceuticals.
I lead components of the Virtual Cell initiative, fine-tuning multi-modal LLMs over knowledge graphs, free text, transcriptomic and phenotypic imaging data to predict cell state and drug response.
I co-developed TxPert (arXiv:2505.14919), a state-of-the-art transcriptomic perturbation predictor, and contributed to the Boltz2 proteome-scale virtual screening pipeline.
Before Recursion I led AI engineering at EMBL-EBI's BioImage Archive and Uhlmann Group, supervised six PhD students, and shipped `bioimage_embed` (self-supervised learning for biological images) and `shape_embed` (cell-shape representation, arXiv:2507.01009) as community resources.
My PhD (Cambridge, 2018) was an instrument-building project: I designed and built a light-sheet microscope from scratch.
I am as comfortable at the data-generation end of the stack as at the modelling end.

## My Grand Challenges

I would primarily target Grand Challenge 4: *Harnessing multimodal generative AI to study the interplay of genetics with spatial transcriptomics, proteomics and morphology in human tissues*, led by Mo Lotfollahi and Muzlifah Haniffa.
The downstream goal of predicting genetic variation from routine clinical pathology slides sits exactly at the intersection of the multi-modal foundation models I have built at Recursion (TxPert; the Virtual Cell initiative integrating knowledge graphs, transcriptomics, free text and phenomics; Boltz2 components) and the imaging methods I shipped at EMBL-EBI (`bioimage_embed`, `shape_embed`, MIFA).
Sanger's >200 million curated cells across H&E, Xenium, scRNA-seq and ATAC are an unparalleled training corpus for cross-modal generative architectures.

I would secondarily consider Grand Challenge 5 (*A Foundation sequence model of the Cis-Regulatory Code in developing human tissues*, Lotfollahi/Taipale) and Grand Challenge 2 (*Predictive and Mechanistic AI for Longitudinal Multi-Omics in Complex Disease*, Anderson) as natural adjacencies, but Challenge 4 is where my unique skills land best.

The technical novelty I would bring has four parts.
First, integrate Sanger's H&E + Xenium + scRNA-seq + ATAC corpora under a single multi-expert architecture with shared latent space, with knowledge graphs as structural priors and curated literature as semantic anchors.
The architectural lineage is the multi-modal LLM-over-omics work I have shipped at Valence; the data scale is what makes Sanger the right home for it.
Second, evaluate not only held-out reconstruction but counterfactual prediction.
Does the model give scientifically reasonable answers when asked "what would the spatial transcriptome and morphology look like for this individual's variant in this tissue?".
Third, explicitly evaluate and correct for ancestry-shift and tissue-shift in the latent space, so that variant-to-pathology predictions are anchored in data the model has actually seen rather than extrapolated unsafely from a single reference cohort.
This connects directly to my outreach plan below.

Fourth is the part I would most like to push the field on: build an agentic discovery layer on top of the foundation model, walled in by inference-time engineering so that hallucination is contained to scientifically tolerable failure modes.
Naive agentic LLMs in biology fail loudly.
The agent invents a gene name, fabricates a citation, proposes a perturbation that exists in no cell line.
The engineering response is to refuse free generation over the things that matter.
Constrained decoding restricted to a closed vocabulary of valid Ensembl IDs, HGNC symbols, and ChEMBL identifiers; tool-call verification against Sanger's own structured resources (Cellular Genomics atlases, Tree of Life genomes, the human variant catalogues), so that every claim round-trips through real data before the agent emits it; retrieval grounding to a curated literature corpus with citation-level attribution; verifier-model ensembles that score each hypothesis for biological plausibility before it leaves the agent.
The result is an agent that proposes follow-up experiments (variants to validate, tissues to oversample, perturbations to run) but only inside a sandbox where every leaf claim is checkable.
This is the missing piece between an LLM that talks about biology and an autonomous research collaborator.
GDM mentorship is most directly useful here: the inference-engineering and constrained-generation work at DeepMind on AlphaFold's confidence calibration and the AlphaProof verifier loop is the lineage I want to bring into genomics.

Three deliverables in year one.
(i) A Sanger-anchored multimodal foundation model trained jointly on Cellular Genomics atlases (H&E + Xenium + scRNA-seq + ATAC), with public benchmarks for cross-modal counterfactual prediction.
(ii) A variant-to-pathology benchmark co-designed with Lotfollahi and Haniffa's groups that scores models on ancestry-stratified validation cohorts rather than convenience samples.
(iii) An open-source agentic discovery harness with built-in hallucination suppression (constrained decoding, tool-call verification, retrieval grounding, verifier ensembles) that other Sanger researchers can wrap around their own foundation models.
Year two onward extends this to the cis-regulatory code (Challenge 5) and to longitudinal cohorts (Challenge 2) where the same foundation-model backbone applies.

For secondary supervisor I suggest Prof. Pietro Liò (Cambridge, Computer Laboratory) for his work on graph foundation models for biology, with Dr Virginie Uhlmann (EMBL Barcelona, formerly EMBL-EBI) as a complementary option from my prior collaboration on bioimage representation learning.
Neither is a precondition; I am open to whichever AI/ML academic the panel matches me to.

## Outreach: capacity-building for Genomics and AI in LMICs

The outreach fund is what I most want to use this Fellowship for.
I will run a recurring "Foundation Models for Genomics" workshop series, twice a year at LMIC partner institutions, one week each, producing graduates who can fine-tune and evaluate ML models on local genomic data.
The teaching pattern is the one I already run at EMBL-EBI for 40+ researchers a year, adapted for compute-constrained settings: containerised pipelines, transfer learning from publicly hosted weights, and datasets sourced where possible from the host country's own collections.

The first workshop I would scope sits with the H3ABioNet / H3Africa community, who have spent over a decade building African genomic infrastructure and have been systematically underserved by the foundation-model wave.
Year-two and year-three editions expand to South-East Asia (probably anchored at the MORU collaboration in Bangkok or NUS in Singapore) and Latin America.
Each edition leaves behind a containerised teaching environment that runs on modest hardware, a small number of fine-tuned community models on locally-relevant tasks, and a peer cohort of trainers who can run later editions independently.
I would budget the fund for travel cost-sharing for participants who cannot self-fund, because that is where most "open" programmes silently fail.

Beyond the workshops I would use the ambassadorial role to push for honest evaluation practices in published genomics-AI work, specifically benchmarks that include ancestry- and tissue-diversity stratifications, in line with the Grand Challenge framing above.
I have done versions of this community-shaping work already: founding the Virtual Cell Journal Club at Valence, contributing to napari and the Bioimage Model Zoo, and co-authoring the AI4LIFE €5M federated bioimage AI infrastructure grant.

## In closing

I am a research engineer.
I came up through instrument-building, went into industry to ship multi-modal foundation models at scale, and want to come back and do this work in the open.
Sanger is the one place in the UK where the data, the strategic commitment to AI, and the global-health framing live in one building.
I want to spend the next three years there.

Sincerely,
Craig T. Russell, PhD
