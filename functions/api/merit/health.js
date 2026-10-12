
export async function onRequestGet({ env }) {
  if (!env.DB) {
    return Response.json(
      { ok: false, database: "not_connected" },
      { status: 503 }
    );
  }

  try {
    const result = await env.DB.prepare(
      "SELECT name FROM sqlite_master WHERE type = 'table' AND name IN ('merit_members', 'merit_wallets', 'merit_transactions')"
    ).all();

    return Response.json({
      ok: true,
      database: "connected",
      tables_found: result.results.length
    });
  } catch {
    return Response.json(
      { ok: false, database: "query_failed" },
      { status: 503 }
    );
  }
}
