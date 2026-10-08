# gbyrka.github.io

Publish this repository's root on GitHub Pages. `index.html` redirects visitors to the games collection at `/games/` and includes the AdSense account verification metatag.

The public entry is `https://mod-it.games/`, which redirects to `https://mod-it.games/games/`. Keep `CNAME` with `mod-it.games` in this user-site repository and enable **Enforce HTTPS** in its Pages settings. The project repositories inherit this domain and keep their existing paths (`/dock/`, `/park/`, `/hamster/`, `/sokoban/`, `/multiplayer/`). Do not add the same `CNAME` to each project repository.

Each entry page redirects HTTP, `www.mod-it.games` and the old `gbyrka.github.io` hostname to the canonical HTTPS origin before loading the game. Paths, query parameters and fragments survive the redirect, including multiplayer room codes and DOCK challenges. Relative links between projects inherit the HTTPS origin. Localhost previews are unaffected. Canonical URLs, social preview images, public sharing fallback URLs and the privacy policy use the new domain.

Keep `ads.txt` at the repository root so Google can read it at `https://mod-it.games/ads.txt`. The redirect page itself does not load ads or analytics. Advertising units and the shared privacy policy live in the individual project repositories.
