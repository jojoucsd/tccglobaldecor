// lib/supabase.ts
import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import WebSocket from "ws";

// Service role key bypasses RLS — projects/analytics_events have RLS
// enabled with no policies (see supabase/schema.sql), so this is the only
// client that can read/write them. Never import this from a client component.
function getSupabaseAdmin(): SupabaseClient {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !serviceRoleKey) {
    throw new Error(
      "[lib/supabase] Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY"
    );
  }

  return createClient(url, serviceRoleKey, {
    auth: { persistSession: false },
    // We never use realtime subscriptions, but the client initializes a
    // RealtimeClient eagerly and it throws on Node <22 without a WebSocket
    // global. `ws` is a no-cost polyfill so this doesn't depend on which
    // Node version Amplify's build image happens to run.
    realtime: { transport: WebSocket as unknown as never },
  });
}

let cachedAdmin: SupabaseClient | null = null;

export function supabaseAdmin(): SupabaseClient {
  if (!cachedAdmin) cachedAdmin = getSupabaseAdmin();
  return cachedAdmin;
}
