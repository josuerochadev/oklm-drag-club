# ADR 002 — Source de données : RSS + fichier overrides local

**Date :** 2026-05-09
**Statut :** Accepté

## Contexte

Les métadonnées des épisodes (titre, description, date, durée, Spotify) viennent du flux RSS Anchor.fm. Mais Anchor ne fournit pas les liens Deezer, Amazon Music, ni Apple Podcasts (URLs épisode-par-épisode). Ces données sont disponibles via des APIs tierces (iTunes Search API, Deezer API) avec matching par titre, ou peuvent nécessiter une correction manuelle.

## Décision

Deux sources mergées au build :

1. **RSS Anchor.fm** — source principale, fetchée à chaque build.
2. **`src/data/overrides.json`** — fichier versionné dans le repo, contenant les correctifs manuels et les cas que les APIs tierces ne couvrent pas (show mal détecté, URL manquante).

La priorité est : `overrides.json` > APIs tierces (Apple, Deezer) > RSS.

## Conséquences

**Avantages :**
- Pas de BDD pour corriger une anomalie : un PR sur `overrides.json` suffit.
- Les correctifs sont versionnés avec le code, auditables, réversibles.
- La détection automatique du show (`detectShow`) couvre 95 % des cas ; overrides couvre les exceptions.

**Inconvénients :**
- Le matching des URLs Apple/Deezer est fait par slug de titre (`slugify`) : une différence de ponctuation entre le titre RSS et le titre sur la plateforme peut casser le matching. Mitigé par `overrides.json`.
- `overrides.json` grandit avec le catalogue. Tolérable à l'échelle actuelle (~100 épisodes).

## Alternatives considérées

- **BDD avec table episodes** : surcharge opérationnelle, coût.
- **Tout dans overrides.json** (sans fetch API) : maintenance manuelle pour chaque épisode, infaisable dans la durée.
