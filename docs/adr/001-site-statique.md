# ADR 001 — Site entièrement statique (SSG sans BDD)

**Date :** 2026-05-09
**Statut :** Accepté

## Contexte

Le podcast OKLM Drag Club est un projet personnel géré par une seule personne. Les données changent peu fréquemment (nouvel épisode ~1 fois par semaine). Le site n'a pas besoin d'authentification, de commentaires, ni de contenu temps-réel.

## Décision

Le site est généré statiquement au build (Next.js SSG). Il n'y a pas de base de données, pas de backend applicatif. Toutes les données viennent du flux RSS fetchée au build.

## Conséquences

**Avantages :**
- Hébergement gratuit sur Vercel sans coût de BDD.
- Performances maximales (pages pré-rendues, CDN).
- Zéro surface d'attaque côté serveur.
- Déploiement simple : un push = un build.

**Inconvénients :**
- Un nouvel épisode n'apparaît pas immédiatement : il faut rebuilder. Mitigé par l'endpoint `/api/rebuild` et le `revalidate: 3600` en cache Next.js.
- Impossible d'ajouter des fonctionnalités dynamiques (likes, commentaires) sans changer d'architecture.

## Alternatives considérées

- **Next.js avec BDD (Supabase/PlanetScale)** : surcharge opérationnelle injustifiée pour un seul contributeur de contenu.
- **Astro** : viable, mais Next.js offre un meilleur écosystème pour les OG images dynamiques et le SSG hybride.
