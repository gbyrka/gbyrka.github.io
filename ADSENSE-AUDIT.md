# AdSense navigation audit — 2026-11-02

The reported category is **Site behavior: navigation**. Google did not identify a
specific URL or element, so these are evidence-based risk findings, not a claim
to know the reviewer’s exact reason. Approval remains Google's decision.

## Findings and implemented changes

1. **Ads behind “About & sponsors”.** CHESS, CHECKERS and Boggle placed a manual
   unit inside a native About dialog, requested through a footer navigation
   button. These units have been removed entirely. The button now says
   **About this game**, and the dialog contains information only. This removes
   an unnecessary navigation-to-ad destination and avoids advertising next to a
   modal's closing/navigation controls.
2. **Empty catalog destinations.** The public catalog's Mobile and Desktop +
   mobile navigation links led to “Coming soon” headings with no games, followed
   by the catalog advertisement. The empty sections and their navigation links
   have been removed. Actual game cards, order and working links are preserved.
3. **The domain root was only a redirect.** Its only meaningful content without
   executing JavaScript was “Redirecting…” and one link. It is now an ad-free,
   static homepage describing the actual games and control requirements, with
   ordinary links to the public games, catalog, multiplayer collection and
   privacy policy. It does not force navigation to `/games/`. Necessary HTTPS/
   canonical-host redirects still preserve paths, queries and fragments.
4. **Ads too close to following navigation.** The game unit's original top gap
   was 150px, but the catalog used only 24px above its ad, and game footers were
   only 32px below it. All six independent `ads.css` copies now use 180px on both
   sides, clear borders and a legible **Advertisements** label. Units remain in
   normal document flow, outside game controls, menus and private chat.
5. **Dynamic visibility after an ad request.** SPA transitions could hide a
   requested footer unit and show it later. The shared helper now only changes
   ordinary visibility before a request. A requested unit remains attached and
   visible, without refreshing or requesting it again. Blocked or unfilled
   slots can still collapse. The helper rejects ad placements inside dialogs,
   navigation and private-chat containers, fixed/sticky placements, and labels
   other than Google's permitted “Advertisements”/“Sponsored links”. Native
   modal dialogs block new footer requests until closed. Board-local game menus
   do not cover the separated footer and do not prevent its normal display.
6. **Direct return navigation.** Every game footer now links explicitly to the
   public games catalog. The multiplayer collection has static links/content
   while JavaScript loads and readable instructions when it is disabled.

## Coverage

| Entry | Manual advertisement after the change |
| --- | --- |
| `/` | None; real static homepage |
| `/games/` | Separated ordinary catalog section |
| `/dock/`, `/park/`, `/hamster/`, local `/sokoban/` | Separated ordinary footer |
| `/multiplayer/` and PLAN | Separated stable ordinary footer |
| Multiplayer TOW, Driver’s Seat, HAMSTER, Catana | Separated stable ordinary footer |
| Multiplayer CHESS, CHECKERS, Boggle | None; information-only About dialog |
| Privacy and the old Word Trail redirect | None |

Boggle and Driver’s Seat remain unlisted; this audit does not add them to either
public catalog. SOKOBAN's code was audited, but its public URL returned **404**
on 2026-11-02. Its tested release was pushed to `gbyrka/sokoban` main (`fe7ccfa`),
but GitHub Pages is disabled for that repository. Enable **Deploy from a branch →
main → /(root)** in its Pages settings. The catalog's **Keyboard and mobile**
section and gameplay cover are ready in local commit `6eaac81` (release
`sokoban1`); publish that commit only after `/sokoban/` responds successfully.
No deployed public catalog points to it yet. Missing `/robots.txt` and
`/sitemap.xml` also returned 404, but those optional files are not navigation
destinations and their absence alone is not the reported violation.

The public game destinations, both catalogs and the privacy page returned HTTP
200 in the live HTML audit. All local HTML navigation links and fragments are
checked by `multiplayer/tests/adsense.test.mjs`. Browser tests stub every Google
script and use clearly labelled dummy ads: they do not create actual ad
impressions or click real ads. The full game rules/room tests are unchanged.

## Deployment and account checks before requesting another review

1. Deploy the changes in **all seven repositories**: `gbyrka.github.io`, `games`,
   `multiplayer`, `dock`, `park`, `hamster`, `sokoban` (if that project is served).
   Each independently deployed project keeps identical copies of the two shared
   advertising files. The helper/CSS URL version and catalog/multiplayer release
   version are **adnav1**, except the catalog release is **sokoban1** (its shared
   helper/CSS URLs still use **adnav1**). Publishing only the catalog leaves older integrations
   on the other URLs.
2. In **AdSense → Ads → mod-it.games → Edit**, verify **Auto ads is off**. In
   particular, disable automatic overlays/anchors, vignettes and intent/link
   formats that could place an ad at a game/navigation click. Manual footer code
   cannot switch off server-side account settings. The AdSense bootstrap is
   retained on game entries for the existing Google CMP integration, so merely
   removing a manual slot is not proof that account-managed Auto ads is off.
   If Auto ads is intentionally used later, first configure and test page/area
   exclusions for all game, private-room, dialog and unlisted experiences.
3. Retain the published Google CMP and denied-by-default Consent Mode. Verify
   privacy/consent controls on the deployed domain, and `https://mod-it.games/ads.txt`
   (it already returned 200 with the configured publisher ID during this audit).
4. Recheck the published pages at desktop and phone widths, then request the
   site review in AdSense. These source changes do not submit a review or alter
   the AdSense account. Do not click your own advertisements while checking.

## Google references

- [AdSense Program policies — Site behavior/navigation](https://support.google.com/publisherpolicies/answer/48182?hl=en)
- [Ad placement policies — accidental clicks and misleading headings](https://support.google.com/adsense/answer/1346295?hl=en)
- [AdSense for content ads on game play pages — clear play links and distance from the game](https://support.google.com/adsense/answer/2768340?hl=en)
- [Modifications of AdSense ad code — hiding, covering and overlapping units](https://support.google.com/adsense/answer/1354736?hl=en)
- [Auto ads page exclusions](https://support.google.com/adsense/answer/9262311?hl=en)

Google's guidance recommends at least 150px from game play; it is not a guarantee
that an otherwise misleading implementation is acceptable. The separate
180px regions and removal of the modal placements address the actual layouts
found here without inventing new ad APIs or changing consent requirements.
