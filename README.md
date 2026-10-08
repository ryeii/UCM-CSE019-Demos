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

The Go example uses a capture-and-liberties heuristic, not a full Go engine. Timing in the large demos measures local JavaScript execution; the displayed Python illustrates the same algorithm.

## Local use

Open `index.html` in a browser, or run `python3 -m http.server 8000` from this directory and visit http://localhost:8000/.

Edit the files in `demos/` and push changes to `main` to update the published site.
