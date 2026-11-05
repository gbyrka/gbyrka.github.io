# gbyrka.github.io

Publish this repository's root on GitHub Pages. `index.html` is a static homepage with game descriptions, ordinary links to the public games/catalog/privacy pages, and the AdSense account verification metatag. It works without JavaScript and does not load advertisements or analytics.

The homepage links to all eight multiplayer games, including TOW: Driver’s Seat and Boggle, and all four solo games, including SOKOBAN. It describes keyboard and touch support explicitly.

The public entry is `https://mod-it.games/`; the full catalog remains at `https://mod-it.games/games/`. Keep `CNAME` with `mod-it.games` in this user-site repository and enable **Enforce HTTPS** in its Pages settings. The project repositories inherit this domain and keep their existing paths (`/dock/`, `/park/`, `/hamster/`, `/sokoban/`, `/multiplayer/`). Do not add the same `CNAME` to each project repository.

Each entry page redirects HTTP, `www.mod-it.games` and the old `gbyrka.github.io` hostname to the canonical HTTPS origin before loading the game. Paths, query parameters and fragments survive the redirect, including multiplayer room codes and DOCK challenges. Relative links between projects inherit the HTTPS origin. Localhost previews are unaffected. Canonical URLs, social preview images, public sharing fallback URLs and the privacy policy use the new domain.

Keep `ads.txt` at the repository root so Google can read it at `https://mod-it.games/ads.txt`. The homepage itself does not load ads or analytics. Advertising units and the shared privacy policy live in the individual project repositories.
