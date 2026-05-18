<div align="center">

# OKLM Drag Club

**Site vitrine du podcast drag et téléréalité de Romain — catalogue des épisodes et accès centralisé aux plateformes d'écoute.**

![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-deployed-000000?style=flat&logo=vercel)

[oklm-drag-club.fr](https://oklm-drag-club.fr) · [Portfolio](https://josuerocha.dev)

</div>

---

## À propos

OKLM Drag Club est un podcast de réaction drag et téléréalité — Drag Race France, Dragula, Les Traîtres FR, Ultime Drag ASMR — créé par Romain avec un ton calme et bienveillant. Ce site en est la vitrine : il liste les épisodes par émission et renvoie vers les plateformes d'écoute. Entièrement statique, sans base de données — les épisodes sont récupérés depuis le flux RSS Anchor.fm au moment du build et enrichis par un fichier de correctifs local.

## Fonctionnalités

- Catalogue des épisodes par émission (Drag Race France, Dragula, Les Traîtres FR, Ultime Drag ASMR, Fan Fiction)
- Page détail par épisode avec description, durée et liens directs vers Spotify, Apple Podcasts, Deezer, Amazon Music
- Mise à jour automatique via flux RSS au build — aucune intervention manuelle pour un nouvel épisode
- Images Open Graph générées dynamiquement par épisode et par émission
- Endpoint `/api/rebuild` pour forcer un redéploiement sans push git
- Sitemap et `robots.txt` générés automatiquement

## Stack technique

| Catégorie | Outils |
|---|---|
| Framework | Next.js 16 (App Router, SSG) |
| UI | React 19, TypeScript 5 strict |
| Style | Tailwind CSS v4 |
| Données | Flux RSS Anchor.fm + `overrides.json` local |
| Parsing | fast-xml-parser 5 |
| Monitoring | Sentry |
| CI | GitHub Actions (lint, type-check, tests, build) |
| Déploiement | Vercel |

## Démarrer

### Prérequis

- Node.js ≥ 20
- npm ≥ 10

### Installation

```bash
git clone <repo>
cd oklm-drag-club
npm install
```

### Variables d'environnement

| Variable | Obligatoire | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Recommandée | URL publique du site (ex : `https://oklm-drag-club.fr`) |
| `VERCEL_DEPLOY_HOOK_URL` | Pour `/api/rebuild` | URL du deploy hook Vercel |
| `REBUILD_SECRET` | Pour `/api/rebuild` | Secret partagé pour protéger l'endpoint rebuild |

En l'absence de `NEXT_PUBLIC_SITE_URL`, le site utilise `VERCEL_URL` (injecté par Vercel) puis `http://localhost:3000`.

### Scripts disponibles

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de développement sur `http://localhost:3000` |
| `npm run build` | Build de production (fetch RSS au build) |
| `npm run start` | Démarre le serveur de production |
| `npm run lint` | ESLint |
| `npm run type-check` | Vérification TypeScript sans émission |
| `npm test` | Tests unitaires (vitest) |

## Architecture

```
src/
├── app/                    # Pages et routes (App Router)
│   ├── api/rebuild/        # Endpoint POST — déclenche un redéploiement Vercel
│   ├── emissions/[show]/   # Page par émission
│   ├── episodes/[id]/      # Page détail d'un épisode
│   └── ...
├── components/             # Composants React
├── data/
│   └── overrides.json      # Liens Deezer, Amazon Music et correctifs manuels
└── lib/
    ├── config.ts           # Constantes globales (URLs, noms)
    ├── rss.ts              # Fetch et parsing du flux RSS
    ├── shows.ts            # Configuration des émissions (couleurs, slugs, labels)
    ├── platforms.ts        # URLs par plateforme d'écoute
    └── utils.ts            # Utilitaires (slugify, constantes)
```

---

Construit par **[Josué Rocha](https://josuerocha.dev)** · [LinkedIn](https://linkedin.com/in/josuerocha) · [GitHub](https://github.com/josuerochadev)
