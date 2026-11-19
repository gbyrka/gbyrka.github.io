# MoD-IT Games homepage

`https://mod-it.games/` is the single illustrated game catalog. Its HTML lives in
this repository's `index.html`; the former `/games/` entry redirects here with
`location.replace`, preserving its query string and category fragment. A
noscript refresh and ordinary link also reach the homepage without JavaScript.

The catalog retains all 13 cards: eight multiplayer games, four Keyboard games
(with **SimCity** first), and SOKOBAN under Keyboard and mobile. Game URLs remain
unchanged, including `/games/simcity2000/`. POP and SCRABBLE remain unlisted.

## Shared files

Styles, images, favicon, release configuration and the existing advertising/
consent helper are served from the sibling `games` repository under `/games/`.
Publish that repository alongside this one. The homepage uses root-relative
paths, so moving the catalog does not move game assets or change room links.
The initial stylesheet and all cards work without JavaScript. The versioned
loader fetches `/games/config.json` without cache to pick the current CSS release.

The existing catalog ad placement and consent behavior now run on the homepage.
The old `/games/` redirect loads no advertising or analytics; the privacy policy
stays at `/games/privacy.html` and also loads no such scripts. Keep Auto ads off
and retain the existing Google CMP / Consent Mode account settings.

## Hosting and navigation

Publish this repository's root with GitHub Pages. Keep `CNAME` set to
`mod-it.games` and Enforce HTTPS enabled. Project repositories inherit the domain;
do not duplicate its CNAME in them. All “All games” links return directly to `/`.
The root canonical and Open Graph URLs are `https://mod-it.games/`.

To preview all project paths together from the parent workspace:

```sh
node gbyrka.github.io/tools/preview.mjs
```

Then open `http://127.0.0.1:8000/`. The preview mounts this homepage at `/` and
its sibling projects at their public paths. The migration regression test in
`../multiplayer/tests/browser-catalog.mjs` checks cards, redirects, game return
links, static/no-JavaScript behavior and HTTPS aliases without public requests.

`ads.txt` remains here at `https://mod-it.games/ads.txt`.
