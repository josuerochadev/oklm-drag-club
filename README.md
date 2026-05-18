# OKLM Drag Club

Site web du podcast **OKLM Drag Club** — réactions calmes et bienveillantes sur la drag et la téléréalité, sans hurler dans vos oreilles.

Couverture : Drag Race France, Dragula, Les Traîtres FR, Ultime Drag ASMR, Fan Fiction, RPDR Global All Stars.

## Stack

| Outil | Version | Rôle |
|---|---|---|
| Next.js | 16 (App Router) | Framework — SSG, routing, OG images |
| React | 19 | UI |
| TypeScript | 5 strict | Typage |
| Tailwind CSS | v4 | Utilitaires CSS globaux |
| fast-xml-parser | 5 | Parsing du flux RSS |
| Vercel | — | Déploiement + deploy hooks |

## Architecture des données

Le site est entièrement statique — **pas de base de données**.

Les épisodes proviennent de deux sources mergées au build :

1. **Flux RSS Anchor.fm** — titre, description, date, durée, liens Spotify
2. **`src/data/overrides.json`** — correctifs manuels : show, Deezer, Apple Podcasts, Amazon Music

Voir [`CONTRIBUTING.md`](./CONTRIBUTING.md#format-de-overridesjson) pour le format du fichier overrides.

## Prérequis

- Node.js ≥ 20
- npm ≥ 10

## Installation

```bash
git clone <repo>
cd oklm-drag-club
npm install
cp .env.example .env.local   # puis renseigner les valeurs
```

## Lancer le projet

```bash
npm run dev      # http://localhost:3000
npm run build    # build de production (fetch RSS + APIs plateformes)
npm run lint     # ESLint
```

## Variables d'environnement

Copier `.env.example` en `.env.local` :

| Variable | Obligatoire | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommandée | URL publique du site (ex: `https://oklm-drag-club.fr`) |
| `VERCEL_DEPLOY_HOOK_URL` | Pour `/api/rebuild` | URL du deploy hook Vercel |
| `REBUILD_SECRET` | Pour `/api/rebuild` | Secret partagé pour protéger l'endpoint rebuild |

En l'absence de `NEXT_PUBLIC_SITE_URL`, le site utilise `VERCEL_URL` (injecté automatiquement par Vercel) puis `http://localhost:3000`.

## Structure du projet

```
src/
├── app/                   # Pages et routes Next.js (App Router)
│   ├── api/rebuild/       # Endpoint POST pour déclencher un redéploiement
│   ├── emissions/[show]/  # Page par émission
│   ├── episodes/[id]/     # Page détail d'un épisode
│   └── ...
├── components/            # Composants React
├── data/
│   └── overrides.json     # Correctifs manuels sur les épisodes
└── lib/
    ├── config.ts          # Constantes globales (URLs, noms)
    ├── platforms.ts       # Fetch Apple Podcasts + Deezer au build
    ├── rss.ts             # Fetch + parsing du flux RSS
    ├── shows.ts           # Configuration des émissions (couleurs, labels, slugs)
    └── utils.ts           # slugify, SLUG_MAX_LENGTH
```

## Contribuer

Lire [`CONTRIBUTING.md`](./CONTRIBUTING.md).

## Déploiement

Le site est déployé sur Vercel. Chaque push sur `main` déclenche un build automatique. Le flux RSS est refetché à chaque build (`next: { revalidate: 3600 }` en dev).

Pour forcer un rebuild sans push (ex : nouvel épisode paru), utiliser l'endpoint `/api/rebuild` — voir [CONTRIBUTING.md](./CONTRIBUTING.md#endpoint-apirebuild).
