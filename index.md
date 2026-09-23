---
title: Senior Machine Learning Scientist — Generative & Agentic Models for Biology
layout: default
---

London, UK • [linkedin.com/in/ctr26](https://linkedin.com/in/ctr26) • [github.com/ctr26](https://github.com/ctr26) • [Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en) • [PDF](cv.pdf)  
*Focus:* Generative & agentic models for biology • LLM post‑training • Out‑of‑distribution modelling • Virtual cells • Open to relocation (San Francisco)

## Professional Summary
ML Research Scientist building **generative models that generalise to unseen biology**, so that we can build the first virtual cell. Eight years applying machine learning to biological data, from light‑sheet microscopy and TB‑scale image archives to single‑cell transcriptomics and knowledge graphs, with papers in *Nature Biotechnology*, *NeurIPS* and *Nature Methods*. I write the research code and the infrastructure: tools other labs use, agents grounded in real biological databases, and training and inference on cloud and HPC.

## Experience

**Senior Machine Learning Scientist — Valence Labs @ Recursion Pharmaceuticals**  
London, UK • Oct 2024 – Present  
- **Agentic biology:** Build **tool‑use systems grounded in real biological databases** — constrained decoding over **Ensembl/HGNC/ChEMBL** vocabularies, tool‑call verification against structured resources, retrieval grounding and verifier ensembles — producing explainable, multi‑source gene–gene hypotheses.  
- **TxPert** *(Nature Biotechnology, 2026)*: Co‑author on a state‑of‑the‑art transcriptomic perturbation predictor conditioned on multiple biological knowledge graphs; owned benchmark‑task design, data curation and **OOD ablations**.  
- **LLM fine‑tuning & reinforcement learning:** Post‑train multi‑modal LLMs over **knowledge graphs, literature and omics**; apply **RL** to align agent behaviour with verifiable biological objectives.  
- **Generative out‑of‑distribution modelling:** Train **large diffusion transformers** to generate perturbational biology, targeting generalisation to **unseen** perturbations, cell types and their combinations rather than in‑distribution interpolation.  
- **Gene expression + bioimage data:** Model **single‑cell and bulk RNA‑seq** jointly with **high‑content phenotypic imaging**, so each modality constrains the other where one alone leaves the prediction under‑determined.  
- **Active learning:** Design acquisition strategies that choose the next experiment under a fixed budget, closing the loop between model uncertainty and wet‑lab capacity.  
- **Research engineering lead, ~30‑person research team:** Set technical direction and engineering standards across a multidisciplinary ML and biology group; **scale models to the cloud** for multi‑GPU training and distributed inference; foster collaborative coding — code review, reproducibility, shared tooling — to carry research prototypes into production.  
- **Virtual screening:** Evaluation strategy and error analysis for proteome‑scale binding‑affinity screening.  
- **Community:** Organiser, Virtual Cell Journal Club, bridging ML and wet‑lab teams.

**Senior Research Associate & AI Engineering Lead — EMBL‑EBI (Uhlmann Group & Bio‑Image Archive)**  
Cambridge, UK • Dec 2022 – Oct 2024  
- **Team leadership:** Supervised **6 PhD students**; established coding standards, CI and peer review across the lab.  
- **Self‑supervised representation learning:** Created **[bioimage_embed](https://github.com/uhlmanngroup/bioimage_embed)** and co‑authored **ShapeEmbed** *(NeurIPS 2025)* — contour and morphology representations learned without labels, both shipped as **production Python used by other labs**.  
- **Cloud compute for biologists:** First author on **bia‑binder** *(Bioinformatics 2025)* — web‑native cloud compute alongside the Bio‑Image Archive.  
- **MLOps:** Designed scalable pipelines processing **TB‑scale microscopy** across HPC and cloud; containerised workflows, automated experiment tracking.  

*Part‑time and consulting roles held alongside EMBL‑EBI, 2022 – 2024:*

**AI/ML Founding Engineer (part‑time) — Amun AI AB**  
Stockholm, Sweden • 2022 – 2024  
- Built a **GKE/Kubernetes** model‑serving platform with **NVIDIA Triton/KServe**; supported **100+ models** for **30+ daily users** with auth, monitoring and autoscaling.

**AI/ML Engineering Consultant (part‑time) — DeepMirror**  
Cambridge & London, UK • 2022 – 2024  
- **MouseMindMapper:** Shipped a brain‑histology segmentation product generating **£50k annual revenue**; owned it end to end — data, training, packaging and docs.  
- Wrote a high‑performance **C++ cheminformatics fingerprinting** library for production.

**Data Scientist — Brazma Group, EMBL‑EBI**  
Cambridge, UK • Dec 2019 – Dec 2023  
- Co‑authored the successful **AI4LIFE €5M** grant (federated bioimage AI infrastructure); contributed to platform architecture and model‑sharing strategy.  
- Drove **large‑scale AI microscopy** analyses in the Image Data Resource; collaborated with **Google Cloud** on representation learning.  
- Taught annual deep‑learning courses to **40+ researchers** (PhD to PI).

**Software Engineer (COVID‑19 Response) — European Nucleotide Archive, EMBL‑EBI**  
Cambridge, UK • Mar 2020 – Sept 2020  
- Built CI/CD for the **COVID‑19 Data Portal** enabling **daily global data updates**; scaled NGS alignment and **Nextflow/Kubernetes** ETL for surging data volumes.

**Computational Microscopist — National Physical Laboratory**  
London, UK • 2018 – Dec 2019  
- Developed novel **3D organoid segmentation** methods for cancer research; consulted for MSquared on advanced imaging.

## Education

**PhD, Engineering — University of Cambridge** • 2014 – 2018 (EPSRC PES‑CDT)  
*Thesis:* “Light‑sheet microscopy for tracking particles in large specimens”  
- Designed and built a novel light‑sheet microscope with automated acquisition; algorithms for particle tracking, signal optimisation and micrometre‑scale tomography. Supervised 2× MRes and 1× BSc students.

**MRes, Photonics — University of Cambridge & UCL** • 2013 – 2014 • structured‑illumination microscopy reconstruction  
**MSci, Physics (First‑Class Honours) — Nottingham Trent University** • 2009 – 2013 • top physics graduate

## Selected Publications

1. **TxPert** — out‑of‑distribution transcriptomic perturbation prediction over biological knowledge graphs. *Nature Biotechnology* (2026) • co‑author. [doi:10.1038/s41587-026-03113-4](https://doi.org/10.1038/s41587-026-03113-4)
2. **ShapeEmbed** — self‑supervised learning of 2D contour representations. *NeurIPS* (2025) • second author. [proceedings](https://proceedings.neurips.cc/paper_files/paper/2025/hash/124cc3a6e8f563555c8bba9f5ded690f-Abstract-Conference.html)
3. **bia‑binder** — web‑native cloud compute for bioimage analysis. *Bioinformatics* (2025) • *first author*. [doi:10.1093/bioinformatics/btaf412](https://doi.org/10.1093/bioinformatics/btaf412)
4. **MIFA** — metadata and accessibility standards for reusable AI training datasets in bioimaging. *Nature Methods* (2025) • co‑author. [doi:10.1038/s41592-025-02835-8](https://doi.org/10.1038/s41592-025-02835-8)
5. **DL4MicEverywhere** — reproducible, containerised deep learning for microscopy. *Nature Methods* (2024) • co‑author. [doi:10.1038/s41592-024-02295-6](https://doi.org/10.1038/s41592-024-02295-6)
6. **CIR4MICS** — synthetic ground truth for benchmarking image‑analysis methods. *Bioinformatics* (2023) • co‑author. [doi:10.1093/bioinformatics/btad587](https://doi.org/10.1093/bioinformatics/btad587)
7. **The COVID‑19 Data Portal** — rapid open‑access data sharing for SARS‑CoV‑2 research. *Nucleic Acids Research* 49(W1) (2021) • co‑author. [doi:10.1093/nar/gkab417](https://doi.org/10.1093/nar/gkab417)
8. **mmSIM** — open toolbox for structured illumination microscopy. *Phil. Trans. R. Soc. A* (2021) • *first author*. [doi:10.1098/rsta.2020.0353](https://doi.org/10.1098/rsta.2020.0353)
9. **Frame‑localisation OPT** — reconstruction for optical projection tomography. *Scientific Reports* (2021) • *first author*. [doi:10.1038/s41598-021-83454-z](https://doi.org/10.1038/s41598-021-83454-z)

Full list on **[Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en)**.

## Patents
- **Virtual Cell Foundation Model** • Patent pending • 2024 (Recursion)
- **TxPert: Transcriptomic Perturbation Prediction** • Patent pending • 2024 (Recursion)

## Open Source
**[bioimage_embed](https://github.com/uhlmanngroup/bioimage_embed)** (author) • contributions to **napari**, **BioImage Model Zoo**, **Hypha Platform**, **DL4MicEverywhere**, **BIA Binder**, **COVID Workflow Manager**

## Skills

**ML & AI:** Diffusion transformers, generative modelling, foundation‑model fine‑tuning & post‑training, reinforcement learning, agentic / tool‑use systems, constrained decoding & retrieval grounding, active learning, contrastive/self‑supervised learning, OOD & uncertainty, evaluation/benchmark design  
**Frameworks:** PyTorch, Lightning, Hugging Face, Pyro, TensorFlow, scikit‑learn  
**Bio & data:** Single‑cell & bulk RNA‑seq, high‑content & phenotypic imaging, histopathology, GNNs, knowledge graphs; UniProt, PDB, Ensembl, NCBI, ChEMBL  
**Languages:** Python (primary), R, C++, Rust, MATLAB, Java  
**Compute:** Multi‑GPU (A100/V100), CUDA, distributed training, SLURM, HPC, GCP/AWS  
**MLOps/Infra:** Kubernetes, Docker, NVIDIA Triton, KServe, MLflow, CI/CD, Terraform; Nextflow, Snakemake, Airflow

## Grants, Teaching & Service
- **Grants:** AI4LIFE (2022, €5M EU Horizon, co‑author) • EPSRC CDT Studentship (2013–2018, £120k) • Nuffield Research Bursary (2012)  
- **Course lead:** Deep Learning for Bioimage Analysis (2019–2023), 40+ participants/year  
- **Supervision:** 6 PhD students (AI & spatial biology) + 3 project students  
- **Peer review:** Nature Methods, Scientific Reports, Journal of Microscopy, ISBI (2022, 2023), ICASSP (2024)  
- **Talks:** FOM (2018, 2022, 2023), MMC (2018, 2022), CBIAS (2023)
