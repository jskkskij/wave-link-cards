import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1"

const corsHeaders: Record<string, string> = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Access-Control-Max-Age': '86400',
}

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response(null, { status: 204, headers: corsHeaders })
    }

    try {
        // Initialize Supabase client
        const supabaseUrl = Deno.env.get('SUPABASE_URL')
        const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

        // If env vars are missing, still return 200 so the browser stops retrying the report
        if (!supabaseUrl || !supabaseKey) {
            console.warn('Missing Supabase environment variables for CSP reporting')
            return new Response(JSON.stringify({ message: "Received but not logged (missing DB config)" }), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            })
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // Parse the body. Browsers send CSP reports as 'application/csp-report' or 'application/json'
        let payload = null;
        try {
            payload = await req.json();
            // Unnest the standard CSP report structure if present
            if (payload && payload['csp-report']) {
                payload = payload['csp-report'];
            }
        } catch (e) {
            console.error("Failed to parse request body:", e);
            throw new Error("Invalid JSON payload");
        }

        // Store the report in the database (assuming a 'security_logs' table exists)
        // If the table doesn't exist, it will just fail gracefully and log to the edge function console.
        const { error } = await supabase
            .from('security_logs')
            .insert({
                event_type: 'CSP_VIOLATION',
                severity: 'warning',
                details: payload,
                user_agent: req.headers.get('user-agent') || 'Unknown',
                url: payload.documentUri || payload['document-uri'] || 'Unknown'
            });

        if (error) {
            console.error('Error inserting log:', error);
        }

        // Always return 200 OK so the browser knows the report was received
        return new Response(JSON.stringify({ message: "Report processed successfully" }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    } catch (error) {
        console.error("Unhandled Error processing CSP report:", error.message)
        // Returning 200 even on error prevents browser retries and noise
        return new Response(JSON.stringify({ error: error.message }), {
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
            status: 200,
        })
    }
})
