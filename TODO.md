# TODO — OKLM Drag Club

Suivi des tâches du projet. Statuts : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## Phase 1 — Correctifs bloquants (avant mise en ligne)

- [x] **Vraies URLs plateformes dans Hero.tsx** — remplacer les URLs fictives (Spotify, Apple Podcasts, Deezer, Amazon Music) par les vraies URLs du podcast
- [x] **Apple Podcasts et Deezer automatiques** — `platforms.ts` fetch les liens au build via iTunes API + Deezer API, mergés dans `fetchEpisodes()`
- [x] **Amazon Music** — lien vers la page show en fallback automatique (`AMAZON_SHOW_URL` dans `platforms.ts`). `overrides.json` peut surcharger avec un lien d'épisode spécifique si besoin.
- [x] **Newsletter remplacée par RSS** — section "Ne rien rater" avec lien RSS à copier + bouton copier-coller ; `NewsletterForm.tsx` supprimé
- [x] **Footer : liens cliquables** — les plateformes et émissions dans le footer sont des `<p>` nus, les transformer en `<a>` avec les vraies URLs

---

## Phase 2 — Contenu & SEO

- [x] **Page À propos** (`/about`) — présenter le podcast, Romain, les émissions couvertes
- [x] **Open Graph / og:image** — og:image générée dynamiquement par Next.js (`opengraph-image.tsx`) pour la home et chaque épisode
- [x] **Twitter / X cards** — `summary_large_image` sur layout et pages épisode
- [x] **Sitemap** — `/sitemap.xml` généré via `src/app/sitemap.ts` (home, /episodes, /about, tous les épisodes)
- [x] **robots.txt** — `src/app/robots.ts` avec lien vers sitemap
- [x] **JSON-LD schema.org** — `PodcastSeries` dans le layout, `PodcastEpisode` sur chaque page épisode
- [x] **Favicon personnalisé** — `src/app/icon.tsx` via `ImageResponse` : "OK" lime sur fond forest

---

## Phase 3 — Expérience utilisateur

- [x] **Afficher les images épisodes** — `next/image` dans `EpisodeCard`, fond coloré en fallback si pas d'image ; `next.config.ts` configuré avec `remotePatterns`
- [x] **ISR sur fetchEpisodes** — `next: { revalidate: 3600 }` sur tous les fetches (RSS, Apple, Deezer) — le site se met à jour toutes les heures sans rebuild
- [x] **Nav mobile** — menu hamburger avec SVG icons, drawer déroulant, géré via CSS media query 640px
- [x] **Page 404 personnalisée** — `src/app/not-found.tsx` dans le ton OKLM
- [x] **Sanitization HTML** — sanitizer serveur dans `rss.ts` : allowlist de tags sûrs, XSS bloqué

---

## Phase 4 — Enhancements

- [x] **Recherche dans les épisodes** — input de recherche dans `EpisodesClient.tsx`, filtre sur le titre en temps réel
- [x] **Pages par émission** — `/emissions/[show]` avec header couleur show, grille filtrée ; cartes shows home cliquables
- [x] **Pagination** — affichage 24 épisodes par défaut, bouton "Voir X de plus" par tranches de 12
- [x] **Partage épisode** — `ShareButton.tsx` : Web Share API sur mobile, fallback copier le lien sur desktop
- [ ] **Mode sombre** — à envisager plus tard, travail de design à part entière
- [x] **Newsletter** → remplacée par liens plateformes + lien RSS discret

---

## Notes techniques

- ISR configuré à 3600s (1h) — les nouveaux épisodes apparaissent automatiquement sans rebuild manuel
- `overrides.json` reste utile pour Amazon Music (pas d'API) et corrections manuelles de liens
- La détection d'émission (`detectShow` dans `rss.ts`) se base sur des mots-clés dans le titre — à ajuster si les titres changent de format
- Next.js 16 App Router — `params` est une `Promise<>` dans les page components (déjà géré correctement)
- `NEXT_PUBLIC_SITE_URL` à configurer dans Vercel (sinon fallback sur l'URL Vercel auto-générée)
