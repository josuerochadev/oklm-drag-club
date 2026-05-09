import { NextResponse } from "next/server";

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
