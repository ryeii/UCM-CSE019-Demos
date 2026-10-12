# UCM-CSE019-Demos

Interactive Python teaching demos for CSE 019 at UC Merced.

## GitHub Pages

In **Settings → Pages**, choose **Deploy from a branch**, select **main** and **/(root)**, then save.

After deployment, open https://ryeii.github.io/UCM-CSE019-Demos/.

No build, package installation, backend, or external assets are needed. All links are relative, including under the GitHub Pages repository path.

## Demos

- Lowest price: six products and 600 products
- Board scanning: tic-tac-toe and a 19×19 Go board
- Password guessing: six examples and 6,000 generated common-pattern candidates, simulated locally
- Object references: integer reassignment and list mutation
- DNA sequence lab: a synthetic candidate ORF and real human HBB in a 30 kb chromosome 11 reference region

The Go example uses a capture-and-liberties heuristic, not a full Go engine. Timing in the large demos measures local JavaScript execution; the displayed Python illustrates the same algorithm.

## Local use

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this directory and visit http://localhost:8000/.

Edit the files in `demos/` and push changes to `main` to update the published site.

## Credit

**UC Merced CSE019 Fall 2026**

**Instructor: Ryan Zhiyu An**

Copyright © 2026 Ryan Zhiyu An.

## License

The original content and code in this repository are licensed under the
[Creative Commons Attribution-NonCommercial 4.0 International License (CC BY-NC 4.0)](https://creativecommons.org/licenses/by-nc/4.0/).

You may share and adapt these demos for noncommercial purposes, with appropriate
credit, a link to the license, and an indication of any changes. Commercial use
is not licensed. See [LICENSE](LICENSE) for the full terms.

Suggested attribution: “UC Merced CSE019 Fall 2026, Instructor: Ryan Zhiyu An —
[UCM-CSE019-Demos](https://github.com/ryeii/UCM-CSE019-Demos), CC BY-NC 4.0.”

## Bioinformatics data and checks

The HBB demo uses NCBI RefSeq **NC_000011.10:5210001–5240000** (GRCh38, plus strand),
**NM_000518.5** (transcript), and **NP_000509.1** (protein), downloaded October 12, 2026.
The raw GenBank records, FASTA, and generated offline data are in `demos/data/`.
It requires no live database connection.

The short demo finds a first-ATG / first-in-frame-stop candidate on one synthetic
strand, not a confirmed gene. The larger demo searches a known 30-base marker,
then uses database annotation to extract HBB, reverse-complement it, splice its
three exons, and slice its coding sequence. A final, explicitly constructed HbS
substitution illustrates **c.20A>T**, **p.Glu7Val** (traditional mature-chain β6
Glu→Val). Reference DNA is not patient data; locating a gene is not a diagnosis.

Run `python3 scripts/build-hbb-data.py` to regenerate and validate the packaged
data from the archived records. It checks genomic-to-transcript reconstruction,
CDS coordinates, complete protein translation, marker uniqueness within the
region, and the reference codon at the HbS site. Run
`node --test tests/dna.test.cjs` to verify the scanning and slicing algorithms.
The on-page sources link to NCBI Gene, RefSeq, ClinVar, and GeneReviews.

The repository license applies to our original instructional materials and code;
NCBI-sourced records remain attributed to their original sources.
