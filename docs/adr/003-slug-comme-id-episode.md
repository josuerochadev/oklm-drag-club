# ADR 003 — Slug du titre comme identifiant d'épisode

**Date :** 2026-05-14
**Statut :** Accepté

## Contexte

Les épisodes RSS n'ont pas d'identifiant stable et lisible par défaut (le `<guid>` Anchor est une URL opaque). Les URLs des pages épisode doivent être stables, lisibles, et compatibles avec `overrides.json`.

## Décision

L'identifiant d'épisode (`episode.id`) est le slug dérivé du titre : `slugify(title).slice(0, 72)`.

- `slugify` : minuscules, NFD, suppression des diacritiques, `[^a-z0-9\s-]` supprimé, espaces → `-`.
- `SLUG_MAX_LENGTH = 72` : limite empirique pour garder des URLs raisonnables tout en évitant les collisions sur les premiers mots (les titres OKLM sont suffisamment discriminants à 72 caractères).
- En cas de collision de slug (deux épisodes avec titres quasi-identiques), un suffixe `-2`, `-3`, etc. est ajouté dans l'ordre du flux RSS.

La même logique `slugify` est appliquée pour le matching avec les APIs Apple et Deezer.

## Conséquences

**Avantages :**
- URLs lisibles : `/episodes/reactions-drag-race-france-s3-ep1`.
- Clé stable pour `overrides.json` sans dépendre d'un système externe.

**Inconvénients :**
- Si le titre d'un épisode change dans le RSS après publication, l'URL change → liens brisés. À éviter côté podcast.
- Le matching avec Apple/Deezer peut échouer si leurs titres diffèrent du RSS (gestion par overrides).

## Alternatives considérées

- **GUID RSS** : stable mais opaque (`/episodes/abc123xyz`) — mauvais pour le SEO et la lisibilité.
- **Numéro d'épisode** : `episodeNumber` est calculé par position dans le flux, fragile si un épisode est retiré.
