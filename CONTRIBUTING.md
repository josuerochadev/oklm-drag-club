# Contribuer à OKLM Drag Club

## Stratégie de branches (Trunk-Based Development)

Ce repo suit un workflow **trunk-based** : `main` est la seule branche de longue durée.

- Développement direct sur `main` pour les petits changements (< 1 jour de travail).
- Branche courte (`feat/nom`, `fix/nom`) pour les changements plus larges, mergée via PR dans les 24–48h.
- Pas de branches `develop`, `release/*` ou `hotfix/*`.
- Chaque push sur `main` déclenche un build Vercel → production. Chaque branche génère une preview URL.

## Règles générales

- **Une PR = un thème.** Pas de PR fourre-tout.
- **Conventional commits** obligatoires (voir ci-dessous).
- **Validation visuelle manuelle** sur les 3 breakpoints (mobile / tablet / desktop) avant chaque merge.
- **Pre-commit hooks** : ne jamais bypasser avec `--no-verify`.
- **Pas de découpage de composant > 300 lignes** sans filet de tests.

## Conventional commits

Format : `type(scope): description`

| Type | Usage |
|---|---|
| `feat` | Nouvelle fonctionnalité |
| `fix` | Correction de bug |
| `refactor` | Refactoring sans changement de comportement |
| `docs` | Documentation uniquement |
| `style` | CSS / mise en forme (pas de logique) |
| `chore` | Dépendances, config, tooling |

Exemples :
```
feat: page émission avec liste d'épisodes filtrée
fix: détection des shows — Fan Fiction, All Stars FR
docs: documenter le format overrides.json
```

## Setup local

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Hooks locaux

| Hook | Déclenchement | Vérifications |
|---|---|---|
| `pre-commit` | `git commit` | `lint-staged` (ESLint) + `tsc --noEmit` |
| `commit-msg` | `git commit` | `commitlint` — format conventional commits |

Ne jamais bypasser avec `--no-verify`.

Pour lancer manuellement :
```bash
npm run lint        # ESLint
npm run type-check  # TypeScript
npm test            # Vitest
```

## Release

1. Mettre à jour `CHANGELOG.md` (section `[Unreleased]` → `[X.Y.Z] — AAAA-MM-JJ`)
2. Bumper la version dans `package.json`
3. Commiter : `chore: release vX.Y.Z`
4. Tagger : `git tag -a vX.Y.Z -m "vX.Y.Z — description courte"`
5. Pousser : `git push && git push --tags`

## Format de overrides.json

Le fichier `src/data/overrides.json` permet de corriger manuellement des métadonnées d'épisodes que le RSS ne fournit pas ou fournit incorrectement.

**Structure :**
```json
{
  "<slug-de-l-episode>": {
    "show": "<show-id>",
    "deezerUrl": "https://www.deezer.com/episode/...",
    "amazonUrl": "https://music.amazon.fr/podcasts/...",
    "applePodcastsUrl": "https://podcasts.apple.com/..."
  }
}
```

**Règles :**
- La clé est le **slug de l'épisode** : titre en minuscules, accents supprimés, espaces remplacés par `-`, tronqué à 72 caractères. Exemple : `grand-final-gas`.
- Tous les champs sont optionnels — ne renseigner que ceux à corriger.
- Les valeurs de `overrides.json` **prennent le dessus** sur les APIs Apple/Deezer (correction manuelle prioritaire).
- Les `show-id` valides : `drag-race-france`, `dragula`, `les-traitres-fr`, `ultime-drag-asmr`, `fan-fiction`, `rpdr-global`, `other`.

**Cas d'usage typiques :**
- Forcer le show d'un épisode mal détecté automatiquement (cf. `detectShow` dans `src/lib/rss.ts`).
- Ajouter un lien Deezer ou Amazon Music manquant.

## Endpoint `/api/rebuild`

Permet de déclencher un redéploiement Vercel sans push git (utile quand un nouvel épisode est publié).

**Méthode :** `POST /api/rebuild`

**Header requis :**
```
Authorization: Bearer <REBUILD_SECRET>
```

**Variables d'environnement nécessaires :**
- `REBUILD_SECRET` — secret partagé (défini dans Vercel + dans le système appelant)
- `VERCEL_DEPLOY_HOOK_URL` — URL du deploy hook Vercel (Settings → Git → Deploy Hooks)

**Réponses :**

| Status | Corps | Signification |
|---|---|---|
| `200` | `{ "ok": true, "triggered": true }` | Redéploiement déclenché |
| `401` | `{ "error": "Unauthorized" }` | Header Authorization manquant ou incorrect |
| `500` | `{ "error": "VERCEL_DEPLOY_HOOK_URL not configured" }` | Variable d'env manquante |
| `502` | `{ "error": "Deploy hook failed", "status": N }` | Vercel a refusé le hook |

**Exemple curl :**
```bash
curl -X POST https://oklm-drag-club.fr/api/rebuild \
  -H "Authorization: Bearer <REBUILD_SECRET>"
```

## Ajouter une nouvelle émission

1. Ajouter le `ShowId` dans `src/lib/shows.ts` (union type + `SHOW_CONFIG`).
2. Ajouter les mots-clés de détection dans `detectShow()` (`src/lib/rss.ts`).
3. Ajouter la description dans `SHOW_DESCRIPTIONS` (`src/app/about/page.tsx`).
4. Vérifier que `generateStaticParams` dans `src/app/emissions/[show]/page.tsx` génère bien la nouvelle route (automatique via `SHOWS_LIST`).
