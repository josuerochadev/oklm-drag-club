import { NextResponse } from "next/server";

/**
 * POST /api/rebuild
 *
 * Déclenche un redéploiement Vercel via deploy hook.
 * Utile pour forcer le refetch du RSS sans push git (ex : nouvel épisode publié).
 *
 * Authentification : header `Authorization: Bearer <REBUILD_SECRET>`
 *
 * Variables d'environnement requises :
 *   - REBUILD_SECRET          : secret partagé entre l'appelant et Vercel
 *   - VERCEL_DEPLOY_HOOK_URL  : URL du deploy hook (Vercel → Settings → Git → Deploy Hooks)
 *
 * Réponses :
 *   200 { ok: true, triggered: true }                        — redéploiement déclenché
 *   401 { error: "Unauthorized" }                            — header manquant ou incorrect
 *   500 { error: "VERCEL_DEPLOY_HOOK_URL not configured" }   — variable d'env absente
 *   502 { error: "Deploy hook failed", status: N }           — Vercel a rejeté le hook
 */
export async function POST(request: Request) {
  const secret = process.env.REBUILD_SECRET;
  const hookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;

  // Vérifie l'autorisation
  const authHeader = request.headers.get("authorization");
  if (!secret || authHeader !== `Bearer ${secret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!hookUrl) {
    return NextResponse.json(
      { error: "VERCEL_DEPLOY_HOOK_URL not configured" },
      { status: 500 }
    );
  }

  const res = await fetch(hookUrl, { method: "POST" });
  if (!res.ok) {
    return NextResponse.json(
      { error: "Deploy hook failed", status: res.status },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true, triggered: true });
}
