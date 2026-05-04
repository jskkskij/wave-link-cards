/**
 * 2026 Security Monitoring
 * PCI DSS 4.0 Requirement 11.6.1: Script Integrity Monitoring
 */

interface SecurityEvent {
    type: string;
    severity: 'info' | 'warning' | 'critical';
    details: Record<string, any>;
    timestamp: string;
    userAgent: string;
    url: string;
}

let lastCspViolationEdgePost = 0;
const CSP_VIOLATION_EDGE_MIN_MS = 12_000;

function getSupabaseEdgeReporting(): { base: string; anon: string } | null {
    const base = (import.meta.env.VITE_SUPABASE_URL as string | undefined)?.trim();
    const anon = (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined)?.trim();
    if (!base || !anon) return null;
    return { base: base.replace(/\/$/, ''), anon };
}

/** POST to Edge function (requires functions/csp-report with verify_jwt=false). */
function postSecurityEventToEdge(event: SecurityEvent): void {
    const creds = getSupabaseEdgeReporting();
    if (!creds) return;
    const endpoint = `${creds.base}/functions/v1/csp-report`;
    void fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${creds.anon}`,
            apikey: creds.anon,
        },
        body: JSON.stringify(event),
        keepalive: true,
    }).catch(() => {});
}

/**
 * Log security events for audit trail
 */
export function logSecurityEvent(
    type: string,
    details: Record<string, any> = {},
    severity: SecurityEvent['severity'] = 'info'
): void {
    const event: SecurityEvent = {
        type,
        severity,
        details,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href
    };

    // Store in localStorage for debugging (in production, send to backend)
    const events = JSON.parse(localStorage.getItem('security_events') || '[]');
    events.push(event);

    // Keep only last 100 events
    if (events.length > 100) {
        events.shift();
    }

    localStorage.setItem('security_events', JSON.stringify(events));

    // Log to console in development
    if (import.meta.env.DEV) {
        console.log(`[SECURITY ${severity.toUpperCase()}] ${type}:`, details);
    }

    if (severity === 'critical') {
        postSecurityEventToEdge(event);
    } else if (type === 'CSP_VIOLATION') {
        const now = Date.now();
        if (now - lastCspViolationEdgePost >= CSP_VIOLATION_EDGE_MIN_MS) {
            lastCspViolationEdgePost = now;
            postSecurityEventToEdge(event);
        }
    }
}

/**
 * Monitor CSP violations
 * PCI DSS 4.0 Requirement 6.4.3
 */
export function initCSPMonitoring(): void {
    document.addEventListener('securitypolicyviolation', (e) => {
        const violation = {
            blockedURI: e.blockedURI,
            violatedDirective: e.violatedDirective,
            effectiveDirective: e.effectiveDirective,
            originalPolicy: e.originalPolicy,
            sourceFile: e.sourceFile,
            lineNumber: e.lineNumber,
            columnNumber: e.columnNumber
        };

        logSecurityEvent('CSP_VIOLATION', violation, 'warning');

        console.warn('CSP Violation:', violation);
    });
}

/**
 * Monitor for unauthorized script injection
 * PCI DSS 4.0 Requirement 11.6.1
 */
export function initScriptIntegrityMonitoring(): void {
    const authorizedScripts = new Set([
        'https://challenges.cloudflare.com/turnstile/v0/api.js',
        'https://va.vercel-scripts.com',
        'https://www.google-analytics.com',
        'https://vitals.vercel-insights.com',
        'https://pagead2.googlesyndication.com',
        'https://googleads.g.doubleclick.net',
        'https://ep1.adtrafficquality.google',
        'https://ep2.adtrafficquality.google',
        'https://static.cloudflareinsights.com',
        'https://www.googletagmanager.com'
    ]);

    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node.nodeName === 'SCRIPT') {
                    const script = node as HTMLScriptElement;

                    // Check if script has src
                    if (script.src) {
                        const scriptOrigin = new URL(script.src).origin;
                        const isAuthorized = Array.from(authorizedScripts).some(
                            authorized => script.src.startsWith(authorized)
                        );

                        if (!isAuthorized) {
                            logSecurityEvent('UNAUTHORIZED_SCRIPT', {
                                src: script.src,
                                origin: scriptOrigin
                            }, 'critical');

                            console.error('SECURITY: Unauthorized script detected:', script.src);
                        }

                        // Check for SRI
                        if (!script.integrity && !script.src.includes('vercel')) {
                            logSecurityEvent('SCRIPT_NO_SRI', {
                                src: script.src
                            }, 'warning');

                            console.warn('SECURITY: Script loaded without SRI:', script.src);
                        }
                    }

                    // Check for inline scripts
                    if (!script.src && script.textContent) {
                        logSecurityEvent('INLINE_SCRIPT_DETECTED', {
                            content: script.textContent.substring(0, 100)
                        }, 'info');
                    }
                }
            });
        });
    });

    observer.observe(document.documentElement, {
        childList: true,
        subtree: true
    });
}

/**
 * Monitor for XSS attempts
 */
export function detectXSSAttempt(input: string): boolean {
    const xssPatterns = [
        /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi,
        /<iframe/gi,
        /<object/gi,
        /<embed/gi,
        /eval\(/gi,
        /expression\(/gi
    ];

    const hasXSS = xssPatterns.some(pattern => pattern.test(input));

    if (hasXSS) {
        logSecurityEvent('XSS_ATTEMPT_DETECTED', {
            input: input.substring(0, 200)
        }, 'critical');
    }

    return hasXSS;
}

/**
 * Initialize all security monitoring
 */
export function initSecurityMonitoring(): void {
    initCSPMonitoring();
    initScriptIntegrityMonitoring();

    console.log('[SECURITY] Monitoring initialized');
}

/**
 * Get security event logs
 */
export function getSecurityLogs(): SecurityEvent[] {
    return JSON.parse(localStorage.getItem('security_events') || '[]');
}

/**
 * Clear security logs
 */
export function clearSecurityLogs(): void {
    localStorage.removeItem('security_events');
}
