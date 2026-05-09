# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Site web pour le podcast OKLM Drag Club, créé par Romain. Podcast réaction drag/téléréalité (Drag Race France, Dragula, Les Traîtres FR, Ultime Drag ASMR, et une saison Fan Fiction). Ton : calme, bienveillant, "sans hurler dans vos oreilles".

## Commands

```bash
npm run dev      # Serveur de développement sur http://localhost:3000
npm run build    # Build de production (fetch RSS au build)
npm run lint     # ESLint
```

Pas de suite de tests configurée.

## Stack

- **Next.js 16** App Router — version avec breaking changes, lire `node_modules/next/dist/docs/` avant d'utiliser des APIs Next.js
- **React 19**, TypeScript strict (`@/*` alias vers `src/`)
- **Tailwind CSS v4** (via `@tailwindcss/postcss`)
- **fast-xml-parser** pour le parsing RSS
- Déployé sur Vercel

## Architecture des données

Le site est entièrement statique (pas de BDD). Les données viennent de deux sources mergées :

1. **RSS Anchor.fm** (`https://anchor.fm/s/f3147f50/podcast/rss`) — fetché au build, contient les métadonnées des épisodes (titre, description, date, liens Spotify/Apple Podcasts)
2. **`src/data/overrides.json`** — fichier local qui ajoute les liens Deezer et Amazon Music (absents du RSS)

## Conventions

- Server Components par défaut, `"use client"` seulement si nécessaire
- TypeScript strict, pas de `any`
- Pas de player audio embarqué — liens externes uniquement (Spotify, Apple Podcasts, Deezer, Amazon Music)
