---
title: Machine Learning Scientist - Drug Discovery (Foundation Models)
layout: default
---

London, UK ·
[linkedin.com/in/ctr26](https://linkedin.com/in/ctr26) ·
[github.com/ctr26](https://github.com/ctr26) ·
[Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en)

*Focus:* Virtual cells, multi-modal foundation models, omics and imaging, precision medicine.

## Professional summary

Machine Learning Scientist specialising in virtual-cell development for drug discovery.
I build and deploy multi-modal foundation models that integrate knowledge graphs, text, transcriptomic and phenotypic imaging data.
My experience spans molecular interactions to whole-organism imaging.
I lead across science and engineering: MLOps at TB-scale, reproducible pipelines, and cross-functional work with biology, chemistry and platform teams.

## Core strengths

Foundation models ·
representation and self-supervised learning ·
multi-modal fusion ·
knowledge graphs ·
agentic discovery ·
inference-time engineering and hallucination suppression ·
biological sequence and transcriptomics ·
high-content imaging ·
GNNs ·
OOD and robustness ·
scaling and performance ·
reproducible ML (MLOps) ·
scientific communication.

## Experience

### Senior Machine Learning Scientist, Valence Labs at Recursion Pharmaceuticals

London, UK. Oct 2024 to present.

- Virtual Cell initiative: I fine-tune multi-modal LLMs over knowledge graphs, free text, RNA-seq and phenotypic imaging to model cell state and predict gene and drug responses; I partner with biology to design benchmark tasks and success metrics.
- TxPert: I co-developed a state-of-the-art transcriptomic perturbation predictor using systems-biology knowledge graphs; I contributed training code, data curation and ablations.
- Boltz2: I contributed to proteome-scale virtual drug screening components; I supported evaluation strategy and error analysis across targets.
- Agentic discovery: I built inference-time engineering layers around multi-modal foundation models. Constrained decoding to closed biological vocabularies (Ensembl, HGNC, ChEMBL); tool-call verification against structured knowledge graphs; retrieval grounding with citation-level attribution; verifier-model ensembles. Hallucinations are walled into checkable failure modes for autonomous hypothesis generation.
- Community: I organise the Virtual Cell Journal Club, bridging ML and wet-lab teams.

### Senior Research Associate and AI Engineering Lead, EMBL-EBI (Uhlmann Group and BioImage Archive)

Cambridge, UK. Dec 2022 to Oct 2024.

- Team leadership: I supervised six PhD students; I established coding standards, CI, and peer-review practices used across the lab.
- Spatial biology: I built deep-learning pipelines for high-content cell morphology and single-cell feature learning, integrated with public bioimage resources.
- Open source: I created [bioimage_embed](https://github.com/uhlmanngroup/bioimage_embed) (self-supervised learning for biological images) and [shape_embed](https://arxiv.org/abs/2507.01009) (cell-shape DL toolkit); I productionised training and inference.
- MLOps: I designed scalable pipelines processing TB-scale microscopy datasets across HPC and cloud; I containerised workflows and automated experiment tracking.
- Academic service: Reviewer, ISBI 2022 and 2023, ICASSP 2024.

### AI/ML Founding Engineer, Amun AI AB

Stockholm, Sweden. 2022 to 2024.

- I built a GKE/Kubernetes platform for model serving with NVIDIA Triton and KServe; it supported 100+ models for 30+ daily users with auth, monitoring and autoscaling.

### AI/ML Engineering Consultant, DeepMirror

Cambridge and London, UK. 2022 to 2024.

- MouseMindMapper: I delivered an automated brain-histology segmentation product generating £50k annual revenue, end to end across data, training, packaging and docs.
- I wrote a high-performance C++ cheminformatics fingerprinting library for production use.

### Data Scientist, Brazma Group at EMBL-EBI

Cambridge, UK. Dec 2019 to Dec 2023.

- I co-authored the AI4LIFE €5M EU grant on federated bioimage AI infrastructure; I contributed platform architecture and model-sharing strategy.
- I drove large-scale AI microscopy analyses in the Image Data Resource; I collaborated with Google Cloud on representation learning.
- I taught annual deep-learning courses to 40+ researchers (PhD to PI).

### Software Engineer (COVID-19 Response), European Nucleotide Archive at EMBL-EBI

Cambridge, UK. Mar 2020 to Sept 2020.

- I built CI/CD for the COVID-19 Data Portal to enable daily global data updates.
- I scaled NGS alignment and Nextflow/Kubernetes ETL pipelines for the pandemic data surge.

### Computational Microscopist, National Physical Laboratory

London, UK. 2018 to Dec 2019.

- I developed novel 3D organoid segmentation methods for cancer research; I delivered consultancy to MSquared on advanced imaging.

## Education

### PhD, Engineering, University of Cambridge

2014 to 2018. EPSRC PES-CDT studentship, £120k.

Thesis: "Light-sheet microscopy for tracking particles in large specimens."

- I designed and built a novel light-sheet microscope with automated acquisition.
- I developed algorithms for particle tracking, signal optimisation and micrometre-scale tomography.
- I supervised two MRes and one BSc student.

### MRes, Photonics, University of Cambridge and UCL

2013 to 2014. EPSRC Photonics CDT.

- Structured-illumination microscopy reconstruction; modules in computer vision, quantum mechanics, photonics.

### MSci, Physics (First-Class Honours), Nottingham Trent University

2009 to 2013.

- Top physics graduate.
- President, Mountaineering Club (2011 to 2012).

## Selected publications and preprints

1. Wenkel F, Tu W, Masschelein C, Shirzad H, Eastwood C, Whitfield ST, Bendidi I, **Russell CT**, et al. *TxPert: Leveraging Biochemical Relationships for Out-of-Distribution Transcriptomic Perturbation Prediction.* arXiv:2505.14919 (2025).
2. Hidalgo-Cenalmor I, Pylvänäinen JW, Ferreira MG, **Russell CT**, et al. *DL4MicEverywhere: deep learning for microscopy made flexible, shareable and reproducible.* Nature Methods 21(6):925 to 927 (2024).
3. Ahlers J, Moré DA, Amsalem O, Anderson A, Bokota G, Boone P, **Russell C**, et al. *napari: a multi-dimensional image viewer for Python.* Zenodo (2023).
4. Ouyang W, Beuttenmueller F, Gómez-de-Mariscal E, Pape C, Burke T, Garcia-López-de Haro C, **Russell C**, et al. *Bioimage model zoo: a community-driven resource for accessible deep learning in bioimage analysis.* bioRxiv 2022.06.07.495102 (2022).
5. Harrison PW, Lopez R, Rahman N, Allen SG, Aslam R, Buso N, **Russell CT**, et al. *The COVID-19 Data Portal: accelerating SARS-CoV-2 and COVID-19 research through rapid open access data sharing.* Nucleic Acids Research 49(W1):W619 to W623 (2021).

Full list at [Google Scholar](https://scholar.google.com/citations?user=XVt7BYQAAAAJ&hl=en).

## Patents

- Virtual Cell Foundation Model. Patent pending, 2024 (Hook1/Recursion). Multi-modal integration of knowledge graphs, transcriptomics and imaging for cellular-state prediction.
- TxPert: Transcriptomic Perturbation Prediction. Patent pending, 2024 (Recursion). Systems-biology knowledge-graph integration for gene-expression response forecasting.

## Open source

- [bioimage_embed](https://github.com/uhlmanngroup/bioimage_embed). Self-supervised learning for biological images.
- [shape_embed](https://arxiv.org/abs/2507.01009). Deep-learning toolkit for cell-shape analysis.
- Contributions to Hypha Platform, BioImage Model Zoo, BIA Binder, Hypha Helm Charts and the COVID Workflow Manager.

## Skills

**ML and AI.** Foundation-model fine-tuning, contrastive and self-supervised learning, OOD and uncertainty, evaluation and ablation design, agentic LLM workflows, inference-time engineering (constrained decoding, tool-call verification, retrieval grounding, verifier ensembles).

**Frameworks.** PyTorch, Lightning, Hugging Face, Pyro, TensorFlow, scikit-learn.

**Vision and bio.** Bioimage analysis, 3D reconstruction, segmentation and super-resolution, snRNA-seq and bulk RNA-seq, histopathology, fluorescence imaging, GNNs, knowledge graphs.

**Languages.** Python (primary), R, MATLAB, C++, Java.

**Compute.** Multi-GPU training (A100, V100), CUDA, distributed training, SLURM, HPC, GCP and AWS GPU instances.

**MLOps and infra.** Kubernetes, Docker, NVIDIA Triton, KServe, MLflow, CI/CD, Terraform.

**Workflows.** Nextflow, Snakemake, Apache Airflow.

## Grants and awards

- AI4LIFE (2022). Co-investigator on a €5M EU grant for federated bioimage AI.
- EPSRC CDT studentship (2013 to 2018). Photonic and Electronic Systems CDT, £120k.
- Nuffield Research Bursary (2012). Computer vision for liquid-crystal flows.
- Institute of Physics grant support (2009 to 2012).

## Teaching, mentoring and service

- Course lead: Deep Learning for Bioimage Analysis (2019 to 2023), 40+ participants per year.
- Supervision: 6 PhD students (AI and spatial biology), plus 3 project students during PhD.
- Peer review: Nature Methods, Scientific Reports, Journal of Microscopy, ISBI, ICASSP.
- Talks and conferences: FOM (2018, 2022, 2023), MMC (2018, 2022), CBIAS (2023).
- Community: Rowing captain and coach (Magdalene College); Mountaineering Club President (NTU).

*References available on request.*
