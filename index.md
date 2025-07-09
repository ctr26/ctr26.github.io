---
title: Craig T. Russell, PhD
layout: default
---

```markdown
# Craig T. Russell, PhD

**Contact**  
+44 (0)7521 650931 · craig.russell.phd@gmail.com  
[GitHub](https://github.com/ctr26) · [LinkedIn](https://linkedin.com/in/ctr26)

## Professional Summary

Machine Learning Scientist and Engineer specialising in virtual cells for drug discovery. Extensive experience in multi-omics modelling, foundation models and systems biology integrations.

        WARNING - You have used 81.65% of your home directory

Submitted batch job 9988417
Connection to slclogin2 closed.

~ 14s
base ❯ sft logout && sft login
Waiting on browser...
Browser step completed successfully.
Session expires in 24h0m0s

~ 7s
base ❯ ssh slclogin2 -t "bash -l -c 'sbatch tunnel.sbatch'"



        WARNING - You have used 81.62% of your home directory

Submitted batch job 10043155
Connection to slclogin2 closed.

~ 16s
base ❯ sft logout && sft login
error: Post "https://app.scaleft.com/v1/refresh_client_token": dial tcp 52.223.9.96:443: i/o timeout

~ 49s
base ❯ sft logout && sft login
Waiting on browser...
Browser step completed successfully.
Session expires in 24h0m0s

~ 9s
base ❯ ssh slclogin2 -t "bash -l -c 'sbatch tunnel.sbatch'"



        WARNING - You have used 81.62% of your home directory

Submitted batch job 10084418
Connection to slclogin2 closed.

~ 19s
base ❯ sft logout && sft login
Waiting on browser...
Browser step completed successfully.
Session expires in 24h0m0s

~ 6s
base ❯ ssh slclogin2 -t "bash -l -c 'sbatch tunnel.sbatch'"



        WARNING - You have used 81.62% of your home directory

Submitted batch job 10114015
Connection to slclogin2 closed.

~ 14s
base ❯ ssh slclogin2 -t "bash -l -c 'sbatch tunnel.sbatch'"



        WARNING - You have used 81.62% of your home directory

Submitted batch job 10125343
Connection to slclogin2 closed.

~ 15s
base ❯ git clone
fatal: You must specify a repository to clone.

usage: git clone [<options>] [--] <repo> [<dir>]

    -v, --verbose         be more verbose
    -q, --quiet           be more quiet
    --progress            force progress reporting
    --reject-shallow      don't clone shallow repository
    -n, --no-checkout     don't create a checkout
    --bare                create a bare repository
    --mirror              create a mirror repository (implies bare)
    -l, --local           to clone from a local repository
    --no-hardlinks        don't use local hardlinks, always copy
    -s, --shared          setup as shared repository
    --recurse-submodules[=<pathspec>]
                          initialize submodules in the clone
    --recursive ...       alias of --recurse-submodules
    -j, --jobs <n>        number of submodules cloned in parallel
    --template <template-directory>
                          directory from which templates will be used
    --reference <repo>    reference repository
    --reference-if-able <repo>
                          reference repository
    --dissociate          use --reference only while cloning
    -o, --origin <name>   use <name> instead of 'origin' to track upstream
    -b, --branch <branch>
                          checkout <branch> instead of the remote's HEAD
    -u, --upload-pack <path>
                          path to git-upload-pack on the remote
    --depth <depth>       create a shallow clone of that depth
    --shallow-since <time>
                          create a shallow clone since a specific time
    --shallow-exclude <revision>
                          deepen history of shallow clone, excluding rev
    --single-branch       clone only one branch, HEAD or --branch
    --no-tags             don't clone any tags, and make later fetches not to follow them
    --shallow-submodules  any cloned submodules will be shallow
    --separate-git-dir <gitdir>
                          separate git dir from working tree
    -c, --config <key=value>
                          set config inside the new repository
    --server-option <server-specific>
                          option to transmit
    -4, --ipv4            use IPv4 addresses only
    -6, --ipv6            use IPv6 addresses only
    --filter <args>       object filtering
    --also-filter-submodules
                          apply partial clone filters to submodules
    --remote-submodules   any cloned submodules will use their remote-tracking branch
    --sparse              initialize sparse-checkout file to include only files
at root
    --bundle-uri <uri>    a URI for downloading bundles before fetching from origin remote


~
base ❯ git clone https://github.com/ctr26/ctr26.github.io
Cloning into 'ctr26.github.io'...
remote: Enumerating objects: 54, done.
remote: Total 54 (delta 0), reused 0 (delta 0), pack-reused 54 (from 1)
Receiving objects: 100% (54/54), 760.34 KiB | 6.39 MiB/s, done.

~
base ❯ nvim cv.md

~ 26s
base ❯ mv cv.md ctr26.github.io

~
base ❯ cd ctr26.github.io

~/ctr26.github.io master*
base ❯ nvim cv.md

~/ctr26.github.io master*
base ❯ rm index.html

~/ctr26.github.io master*
base ❯ mv cv.md index.md

~/ctr26.github.io master*
base ❯ git add .

~/ctr26.github.io master*
base ❯ git commit -m "cv"
[master 9597b59] cv
 2 files changed, 92 insertions(+), 463 deletions(-)
 delete mode 100644 index.html
 create mode 100644 index.md

~/ctr26.github.io master ⇡
base ❯ git push
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 14 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 2.30 KiB | 2.30 MiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/ctr26/ctr26.github.io
   5d2d519..9597b59  master -> master

~/ctr26.github.io master
base ❯ nvim cv.md

~/ctr26.github.io master 8s
base ❯ nvim index.md

~/ctr26.github.io master 7s
base ❯ git status -u .
On branch master
Your branch is up to date with 'origin/master'.

Changes not staged for commit:
  (use "git add <file>..." to update what will be committed)
  (use "git restore <file>..." to discard changes in working directory)
        modified:   index.md

no changes added to commit (use "git add" and/or "git commit -a")
~/ctr26.github.io master*
base ❯ git add .

~/ctr26.github.io master*
base ❯ git commit -m "cv"
[master 4c1ab17] cv
 1 file changed, 6 insertions(+)

~/ctr26.github.io master ⇡
base ❯ git push
Enumerating objects: 5, done.
Counting objects: 100% (5/5), done.
Delta compression using up to 14 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 320 bytes | 320.00 KiB/s, done.
Total 3 (delta 2), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (2/2), completed with 2 local objects.
To https://github.com/ctr26/ctr26.github.io
   9597b59..4c1ab17  master -> master

~/ctr26.github.io master
base ❯ nvim _config.yml

~/ctr26.github.io master*
base ❯ git add .

~/ctr26.github.io master*
base ❯ git commit -m "cv"
[master 59832ad] cv
 1 file changed, 4 insertions(+)
 create mode 100644 _config.yml

~/ctr26.github.io master ⇡
base ❯ git push
Enumerating objects: 4, done.
Counting objects: 100% (4/4), done.
Delta compression using up to 14 threads
Compressing objects: 100% (3/3), done.
Writing objects: 100% (3/3), 342 bytes | 342.00 KiB/s, done.
Total 3 (delta 1), reused 0 (delta 0), pack-reused 0
remote: Resolving deltas: 100% (1/1), completed with 1 local object.
To https://github.com/ctr26/ctr26.github.io
   4c1ab17..59832ad  master -> master

~/ctr26.github.io master
base ❯ nvim _config.yml

~/ctr26.github.io master
base ❯ nvim index.md
  index.md  󰅖

 15   ---
  14   title: Craig T. Russell, PhD
  13   layout: default
  12   ---
  11
  10 ▎ ```markdown
   9 ▎ # Craig T. Russell, PhD
   8 ▎
   7   **Contact**
   6 ▎ +44 (0)7521 650931 · craig.russell.phd@gmail.com
   5   [GitHub](https://github.com/ctr26) · [LinkedIn](https://linkedin.com/in/c
   4
   3   ## Professional Summary
   2
   1 ▎ Machine Learning Scientist and Engineer specialising in virtual cells for
  16
   1   ## Technical Skills
   2
   3 ▎ - **Scientific & Analytical**: Data science, scientific writing, grant wr
   4 ▎ - **Image & Signal Processing**: Bio-image analysis, inverse problems, im
   5 ▎ - **Machine Learning & Modelling**: Deep learning, MLOps, multi-modal LLM
    master    markdown     42  23  40                TS   16:1  16% ▂▂
[1] <index.md + (~/ctr26.github.io) - Nv>"index.md + (~/ctr26.g" 16:54 02-Jul-25
## Technical Skills

- **Scientific & Analytical**: Data science, scientific writing, grant writing, independent research, problem solving
- **Image & Signal Processing**: Bio-image analysis, inverse problems, image processing, deconvolution, denoising
- **Machine Learning & Modelling**: Deep learning, MLOps, multi-modal LLM finetuning, graph neural networks
- **Programming**: Python (8 yrs), R, MATLAB, Java, C, NumPy, SciPy, OpenCV, scikit-learn, scikit-image, PyTorch, pyro.ai, TensorFlow, Keras, Lightning, Skorch, Pandas, Seaborn, Matplotlib
- **Cloud & Infrastructure**: Bash, Unix, Git, CI/CD, Make, GitHub Actions, Kubernetes, Docker, Snakemake, Nextflow, SLURM, LSF, HPC, conda, pipenv, gcloud CLI, openstack CLI, Helm, Helmsman, Terraform, GCP, OpenStack
- **Development Tools**: Cursor, VSCode, NeoVim, tmux
- **Mathematics**: Applied mathematics, discrete mathematics

## Education

**PhD Engineering** (EPSRC)  
Cambridge University, 2014 – 2018  
Thesis: Light-sheet microscopy for particle tracking; supervised three project students

**MRes Engineering & Physics**  
Cambridge University & UCL, 2013 – 2014  
Projects in structured illumination and assistive Android app development

**MSci Physics (First Class)**  
Nottingham Trent University, 2009 – 2013  
Awarded Nuffield and IOP bursaries

</div>

<!-- Right Column -->
<div style="flex: 1 1 45%; padding-left: 2em; box-sizing: border-box;">

## Employment

**Senior Machine Learning Scientist**  
Valence Labs | Recursion Pharmaceuticals, London  
Oct 2024 – Present  
- Fine-tuned multi-modal LLMs on epigenomic, transcriptomic and phenotypic data  
- Co-developed TxPert, achieving SOTA transcriptomic perturbation prediction  
- Contributed to proteome-wide virtual drug screening (Boltz2)  
- Lead Virtual Cell journal club

**Senior Research Associate & AI Engineer**  
Uhlmann Group & Bio-Image Archive, EMBL-EBI, Cambridge  
Dec 2022 – Oct 2024  
- Supervised 6 PhD students; established TDD, code reviews and standards  
- Led deep learning research in spatial biology and high-content morphology  
- Implemented representation learning pipelines and MLOps workflows

**AI/ML & Cloud Engineer**  
DeepMirror & Amun AI AB, Cambridge, London & Stockholm  
2022 – 2024  
- Delivered image-segmentation pipelines (MouseMindMapper: £50k pa)  
- Built C++ cheminformatics libraries; collaborated with NVIDIA on K8s model serving  
- Deployed GKE infrastructure for ~100 models, 30+ daily users

**Data Scientist**  
Brazma Group, EMBL-EBI, Cambridge  
Dec 2019 – Dec 2023  
- Designed and taught annual deep learning courses (40+ PhD-PI cohorts)  
- Co-wrote €5M AI4LIFE grant; led large-scale oncology image segmentation  
- Partnered with Google Cloud for big-data representation learning

**Software Engineer (Secondment)**  
Covid Response Team, ENA – EMBL-EBI, Cambridge  
Mar 2020 – Sept 2020  
- Developed robust CI/CD pipelines; containerised ETL workflows with Nextflow & K8s

**Computational Microscopist**  
National Physical Laboratory, London  
2018 – Dec 2019  
- Pioneered novel microscopy image-analysis algorithms and 3D organoid segmentation

## Publications & Projects

- *TxPert: Leveraging Biochemical Relationships for OOD Perturbation Prediction* (arXiv 2505.14919, 2025)  
- *DL4MicEverywhere*, Nature Methods 21:925 (2024)  
- *COVID-19 Data Portal*, NAR 49:W619 (2021)  
- GitHub: shape_embed · bioimage_embed · pydeconv · nuclear_phenotyping · hypha & helm charts

</div>

</div>
```
