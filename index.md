---
title: Senior Machine Learning Scientist, generative and agentic models for biology
layout: default
---

London, UK • [linkedin.com/in/ctr26](https://linkedin.com/in/ctr26) • [github.com/ctr26](https://github.com/ctr26) • [Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en)  
Generative and agentic models for biology • LLM post-training • out-of-distribution modelling • virtual cells

## Summary
I build generative models that generalise to unseen biology, aiming to build the **first virtual cell**. I apply machine learning to biological data, from light-sheet microscopy and terabyte-scale image archives to single-cell transcriptomics and knowledge graphs. I have published in *Nature Biotechnology*, *NeurIPS*, and *Nature Methods*. I write **the research code and the infrastructure under it**, from tools used by other labs to agents grounded in real biological databases, and training and inference on cloud and HPC.

## Experience

**Senior Machine Learning Scientist, Valence Labs @ Recursion Pharmaceuticals**  
London, UK • Oct 2024 – present  
- Build **agents that use real biological databases as tools**. They decode within Ensembl, HGNC, and ChEMBL vocabularies, check tool calls against structured resources, and use retrieval and verifier ensembles for grounding. Their gene–gene hypotheses are explainable and draw on several sources.  
- Co-authored **TxPert** (*Nature Biotechnology*, 2026), a state-of-the-art transcriptomic perturbation predictor conditioned on multiple biological knowledge graphs. Owned **benchmark task design**, **data curation**, and the **out-of-distribution ablations**.  
- **Post-train multimodal LLMs** over knowledge graphs, literature, and omics; use **reinforcement learning** to align agent behaviour with verifiable biological objectives.  
- Train **large diffusion transformers** to generate perturbational biology that generalises to unseen perturbations, cell types, and combinations, rather than interpolating between ones it has.  
- Model **single-cell and bulk RNA-seq** jointly with **high-content phenotypic imaging**; each modality pins down what the other leaves open.  
- Design **active learning** strategies to choose the next experiment under a fixed budget, linking model uncertainty to experiments the wet lab can run.  
- **Lead the engineering** on a large scientific project. Set technical direction and engineering standards across ML and biology; scale training and inference across **GPUs in the cloud**; promote code review, reproducibility, and shared tooling to carry research prototypes into production.  
- Work on **evaluation strategy and error analysis** for proteome-scale binding-affinity screening.  
- Organise the **Virtual Cell Journal Club**, bringing ML and wet-lab teams together.

**Senior Research Associate and AI Engineering Lead, EMBL-EBI (Uhlmann Group and Bio-Image Archive)**  
Cambridge, UK • Dec 2022 – Oct 2024  
- Supervised **6 PhD students**; set the lab's *coding standards, CI, and peer review*.  
- Created **[bioimage_embed](https://github.com/uhlmanngroup/bioimage_embed)** and co-authored **ShapeEmbed** (*NeurIPS* 2025), which learn contour and morphology representations without labels. Both ship as *production Python used by other labs*.  
- Designed scalable, containerised pipelines with automated experiment tracking to process **terabytes of microscopy** across HPC and cloud.

*Part-time and consulting roles held alongside EMBL-EBI, 2022 – 2024*

**AI/ML Founding Engineer (part-time), Amun AI AB**  
Stockholm, Sweden • 2022 – 2024  
- Built a Kubernetes (GKE) model-serving platform on NVIDIA Triton and KServe, with auth, monitoring, and autoscaling. Served **100+ models** to **30+ daily users**.

**AI/ML Engineering Consultant (part-time), DeepMirror**  
Cambridge and London, UK • 2022 – 2024  
- Shipped **MouseMindMapper**, a brain-histology segmentation product bringing in **£50k of revenue a year**. Owned it end to end, from data and training to packaging and docs.  
- Wrote a high-performance **C++ cheminformatics fingerprinting library** for production.

**Data Scientist, Brazma Group, EMBL-EBI**  
Cambridge, UK • Dec 2019 – Dec 2023  
- Co-authored the successful **€5M AI4LIFE grant** for federated bioimage AI infrastructure; contributed to its platform architecture and model-sharing strategy.  
- Drove large-scale AI microscopy analyses in the **Image Data Resource**; worked with *Google Cloud* on representation learning.  
- Taught an annual deep learning course to **40+ researchers**, from PhD students to PIs.

**Software Engineer (COVID-19 response), European Nucleotide Archive, EMBL-EBI**  
Cambridge, UK • Mar 2020 – Sept 2020  
- Built CI/CD for the **COVID-19 Data Portal**, so it published global data daily. Scaled NGS alignment and ETL in Nextflow and Kubernetes as volumes surged.

**Computational Microscopist, National Physical Laboratory**  
London, UK • 2018 – Dec 2019  
- Developed new **3D organoid segmentation** methods for cancer research; consulted for MSquared on advanced imaging.

## Education

**PhD, Engineering, University of Cambridge** • 2014 – 2018 (EPSRC PES-CDT)  
*Thesis on light-sheet microscopy for tracking particles in large specimens*  
- Designed and built a **new light-sheet microscope**, and wrote the code that ran it. Automated acquisition, **bead tracking** for **homographic alignment** of the optics, and signal optimisation driven by the tracker.  
- Wrote **flOPT**, a micrometre-scale tomographic reconstruction that recovers sample pose from tracked fiducial beads and back-projects each ray, so it stays robust to mechanical jitter and drift where the Radon transform breaks down. Published in *Scientific Reports*, open-source Python with OpenCV.  
- Supervised two MRes students and one BSc student.

**MRes, Photonics, University of Cambridge and UCL** • 2013 – 2014 • *structured illumination microscopy reconstruction*  
**MSci, Physics (First-Class Honours), Nottingham Trent University** • 2009 – 2013 • *top physics graduate*

## Selected Publications

1. **TxPert**. Out-of-distribution transcriptomic perturbation prediction over biological knowledge graphs. *Nature Biotechnology* (2026), co-author. [doi:10.1038/s41587-026-03113-4](https://doi.org/10.1038/s41587-026-03113-4)
2. **ShapeEmbed**. Self-supervised learning of 2D contour representations. *NeurIPS* (2025), second author. [poster](https://neurips.cc/virtual/2025/poster/116558)
3. **MIFA**. Metadata and accessibility standards for reusable AI training datasets in bioimaging. *Nature Methods* (2025), co-author. [doi:10.1038/s41592-025-02835-8](https://doi.org/10.1038/s41592-025-02835-8)
4. **DL4MicEverywhere**. Reproducible, containerised deep learning for microscopy. *Nature Methods* (2024), co-author. [doi:10.1038/s41592-024-02295-6](https://doi.org/10.1038/s41592-024-02295-6)
5. **CIR4MICS**. Synthetic ground truth for benchmarking image-analysis methods. *Bioinformatics* (2023), co-author. [doi:10.1093/bioinformatics/btad587](https://doi.org/10.1093/bioinformatics/btad587)
6. **The COVID-19 Data Portal**. Rapid open data sharing for SARS-CoV-2 research. *Nucleic Acids Research* 49(W1) (2021), co-author. [doi:10.1093/nar/gkab417](https://doi.org/10.1093/nar/gkab417)
7. **mmSIM**. Open toolbox for structured illumination microscopy. *Phil. Trans. R. Soc. A* (2021), *first author*. [doi:10.1098/rsta.2020.0353](https://doi.org/10.1098/rsta.2020.0353)
8. **Frame-localisation OPT (flOPT)**. Tomographic reconstruction from tracked fiducial beads. *Scientific Reports* (2021), *first author*. [doi:10.1038/s41598-021-83454-z](https://doi.org/10.1038/s41598-021-83454-z)

The full list is on [Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en).

## Patents
- **Virtual Cell Foundation Model**, patent pending, 2025 (Recursion)
- **TxPert, transcriptomic perturbation prediction**, patent pending, 2025 (Recursion)

## Skills

**ML and AI.** Diffusion transformers, generative modelling, fine-tuning and post-training foundation models, reinforcement learning, agents and tool use, constrained decoding and retrieval grounding, active learning, contrastive and self-supervised learning, OOD and uncertainty, evaluation and benchmark design  
**Frameworks.** PyTorch, Lightning, Hugging Face, Pyro, TensorFlow, scikit-learn  
**Biology and data.** Single-cell and bulk RNA-seq, high-content and phenotypic imaging, histopathology, GNNs, knowledge graphs; UniProt, PDB, Ensembl, HGNC, NCBI, ChEMBL  
**Languages.** Python (primary), R, C++, Rust, MATLAB, Java  
**Compute.** Multi-GPU (A100, V100), CUDA, distributed training, SLURM, HPC, GCP, AWS  
**MLOps and infrastructure.** Kubernetes, Docker, NVIDIA Triton, KServe, MLflow, CI/CD, Terraform; Nextflow, Snakemake, Airflow

## Grants, Teaching, and Service
- **Grants.** AI4LIFE (2022, €5M EU Horizon, co-author) • EPSRC CDT Studentship (2013 – 2018, £120k) • Nuffield Research Bursary (2012)  
- **Teaching.** Led the Deep Learning for Bioimage Analysis course (2019–2023), 40+ participants a year  
- **Supervision.** 6 PhD students in AI and spatial biology, and 3 project students  
- **Peer review.** Nature Methods, Scientific Reports, Journal of Microscopy, ISBI (2022, 2023), ICASSP (2024)  
- **Talks.** FOM (2018, 2022, 2023), MMC (2018, 2022), CBIAS (2023)
