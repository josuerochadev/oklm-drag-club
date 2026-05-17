# TODO — OKLM Drag Club

Suivi des tâches du projet. Statuts : `[ ]` à faire · `[~]` en cours · `[x]` fait

---

## Phase 1 — Correctifs bloquants (avant mise en ligne)

- [x] **Vraies URLs plateformes dans Hero.tsx** — remplacer les URLs fictives (Spotify, Apple Podcasts, Deezer, Amazon Music) par les vraies URLs du podcast
- [x] **Apple Podcasts et Deezer automatiques** — `platforms.ts` fetch les liens au build via iTunes API + Deezer API, mergés dans `fetchEpisodes()`
- [x] **Amazon Music** — lien vers la page show en fallback automatique (`AMAZON_SHOW_URL` dans `platforms.ts`). `overrides.json` peut surcharger avec un lien d'épisode spécifique si besoin.
- [ ] **Brancher la newsletter** — intégrer un vrai service d'emailing (Buttondown, Brevo, Mailchimp...) dans `NewsletterForm.tsx` — actuellement le formulaire ne fait rien
- [x] **Footer : liens cliquables** — les plateformes et émissions dans le footer sont des `<p>` nus, les transformer en `<a>` avec les vraies URLs

---

## Phase 2 — Contenu & SEO

- [x] **Page À propos** (`/about`) — présenter le podcast, Romain, les émissions couvertes
- [ ] **Open Graph / og:image** — ajouter balises og sur le layout et les pages épisode (og:image statique ou dynamique via `opengraph-image.tsx`)
- [ ] **Twitter / X cards** — balises `twitter:card` dans les metadata
- [ ] **Sitemap** — générer `/sitemap.xml` (Next.js App Router supporte `src/app/sitemap.ts`)
- [ ] **robots.txt** — créer `src/app/robots.ts`
- [ ] **JSON-LD schema.org** — ajouter `PodcastSeries` sur le layout et `PodcastEpisode` sur chaque page épisode (aide au référencement Google)
- [ ] **Favicon personnalisé** — remplacer le favicon Next.js par défaut par une icône OKLM

---

## Phase 3 — Expérience utilisateur

- [ ] **Afficher les images épisodes** — `imageUrl` est parsée depuis le RSS mais jamais affichée ; configurer `next.config.ts` avec le domaine Anchor.fm pour `next/image`, et afficher en thumbnail dans les cartes
- [ ] **ISR sur fetchEpisodes** — remplacer `cache: "force-cache"` par `next: { revalidate: 3600 }` pour que le site se mette à jour automatiquement sans rebuild manuel
- [ ] **Nav mobile** — la navigation n'est pas adaptée aux petits écrans ; ajouter un menu hamburger ou réorganiser les éléments
- [ ] **Page 404 personnalisée** — créer `src/app/not-found.tsx` dans le ton OKLM
- [ ] **Sanitization HTML** — la description des épisodes est injectée via `dangerouslySetInnerHTML` depuis le RSS ; envisager `dompurify` ou un sanitizer côté serveur

---

## Phase 4 — Enhancements

- [ ] **Recherche dans les épisodes** — filtre textuel côté client sur titre/description dans `EpisodesClient.tsx`
- [ ] **Pages par émission** — rendre les cartes émissions dans la home cliquables (`/emissions/drag-race-france`) avec liste filtrée
- [ ] **Pagination / infinite scroll** — si le catalogue grandit, éviter de rendre 100+ cartes en une seule page
- [ ] **Partage épisode** — bouton "Copier le lien" ou partage natif sur les pages épisode
- [ ] **Mode sombre** — le design system en forest/lime se prête bien à un dark mode (déjà sombre par défaut en Hero)

---

## Notes techniques

- Le RSS est fetché avec `cache: "force-cache"` — rebuild Vercel nécessaire pour voir les nouveaux épisodes (voir webhook `/api/rebuild`)
- `overrides.json` est le seul fichier à éditer manuellement pour ajouter Deezer/Amazon Music
- La détection d'émission (`detectShow` dans `rss.ts`) se base sur des mots-clés dans le titre — à ajuster si les titres changent de format
- Next.js 16 App Router — `params` est une `Promise<>` dans les page components (déjà géré correctement)
