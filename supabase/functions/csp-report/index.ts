import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

const corsHeaders: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, baggage, sentry-trace",
  "Access-Control-Max-Age": "86400",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return jsonResponse({ error: "Method not allowed" });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !supabaseKey) {
      console.warn("Missing Supabase environment variables for CSP reporting");
      return jsonResponse({ message: "Received but not logged (missing DB config)" });
    }

    const supabase = createClient(supabaseUrl, supabaseKey);

    let raw: Record<string, unknown> | null = null;
    try {
      raw = (await req.json()) as Record<string, unknown>;
    } catch (e) {
      console.error("Failed to parse request body:", e);
      return jsonResponse({ error: "Invalid JSON payload" });
    }

    // Browser report-uri / Reporting API shape
    let details: Record<string, unknown> = raw;
    let eventType = "CSP_VIOLATION";
    let severity: string = "warning";
    let url = "Unknown";

    if (raw && typeof raw["csp-report"] === "object" && raw["csp-report"] !== null) {
      details = raw["csp-report"] as Record<string, unknown>;
    } else if (raw && typeof raw.type === "string") {
      // Client SecurityEvent from security-monitor.ts
      eventType = String(raw.type);
      severity = typeof raw.severity === "string" ? raw.severity : "info";
      details = {
        ...(typeof raw.details === "object" && raw.details !== null
          ? (raw.details as Record<string, unknown>)
          : {}),
        clientTimestamp: raw.timestamp,
        clientUrl: raw.url,
        clientUserAgent: raw.userAgent,
      };
      url =
        typeof raw.url === "string"
          ? raw.url
          : typeof details.documentUri === "string"
            ? (details.documentUri as string)
            : "Unknown";
    } else {
      url =
        (typeof details["document-uri"] === "string"
          ? (details["document-uri"] as string)
          : null) ||
        (typeof details.documentUri === "string"
          ? (details.documentUri as string)
          : null) ||
        "Unknown";
    }

    const { error } = await supabase.from("security_logs").insert({
      event_type: eventType,
      severity,
      details,
      user_agent: req.headers.get("user-agent") || "Unknown",
      url,
    });

    if (error) {
      console.error("Error inserting log:", error);
    }

    return jsonResponse({ message: "Report processed successfully" });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Unhandled error processing CSP report:", message);
    return jsonResponse({ error: message });
  }
});
