/**
 * Security utilities for e-commerce grade protection
 * Implements input sanitization, CSRF protection, and XSS prevention
 */

/**
 * Sanitize user input to prevent injection attacks
 * Removes leading formula characters and dangerous patterns
 * 
 * @param input - User input string
 * @returns Sanitized string safe for storage and display
 */
export const sanitizeInput = (input: string): string => {
    if (!input || typeof input !== 'string') return '';

    return input
        // Remove leading characters that could be interpreted as formulas (CSV injection)
        .replace(/^[=+\-@\t\r]/, '')
        // Remove null bytes
        .replace(/\0/g, '')
        // Trim whitespace
        .trim()
        // Limit length to prevent DoS
        .slice(0, 1000);
};

/**
 * Sanitize email addresses
 * Validates format and removes dangerous characters
 * 
 * @param email - Email address
 * @returns Sanitized email or empty string if invalid
 */
export const sanitizeEmail = (email: string): string => {
    if (!email || typeof email !== 'string') return '';

    const sanitized = email.trim().toLowerCase();

    // Basic email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(sanitized)) {
        return '';
    }

    return sanitized;
};

/**
 * Sanitize phone numbers
 * Removes non-numeric characters except + and -
 * 
 * @param phone - Phone number
 * @returns Sanitized phone number
 */
export const sanitizePhone = (phone: string): string => {
    if (!phone || typeof phone !== 'string') return '';

    return phone
        .replace(/[^\d+\-\s()]/g, '')
        .trim()
        .slice(0, 20);
};

/**
 * Generate a CSRF token
 * Uses crypto.randomUUID for cryptographically secure tokens
 * 
 * @returns CSRF token string
 */
export const generateCSRFToken = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }

    // Fallback for older browsers
    return `${Date.now()}-${Math.random().toString(36).substring(2)}`;
};

/**
 * Store CSRF token in session storage
 * 
 * @param token - CSRF token to store
 */
export const storeCSRFToken = (token: string): void => {
    try {
        sessionStorage.setItem('csrf_token', token);
    } catch (error) {
        console.error('[Security] Failed to store CSRF token:', error);
    }
};

/**
 * Retrieve CSRF token from session storage
 * 
 * @returns CSRF token or null if not found
 */
export const getCSRFToken = (): string | null => {
    try {
        return sessionStorage.getItem('csrf_token');
    } catch (error) {
        console.error('[Security] Failed to retrieve CSRF token:', error);
        return null;
    }
};

/**
 * Validate CSRF token
 * 
 * @param token - Token to validate
 * @returns True if token is valid
 */
export const validateCSRFToken = (token: string): boolean => {
    const storedToken = getCSRFToken();
    return storedToken !== null && token === storedToken;
};

/**
 * Initialize CSRF protection
 * Generates and stores a new token if one doesn't exist
 * 
 * @returns CSRF token
 */
export const initCSRFProtection = (): string => {
    let token = getCSRFToken();

    if (!token) {
        token = generateCSRFToken();
        storeCSRFToken(token);
    }

    return token;
};

/**
 * Escape HTML to prevent XSS attacks
 * 
 * @param unsafe - Unsafe HTML string
 * @returns Escaped HTML string
 */
export const escapeHTML = (unsafe: string): string => {
    if (!unsafe || typeof unsafe !== 'string') return '';

    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
};

/**
 * Validate URL to prevent open redirect vulnerabilities
 * 
 * @param url - URL to validate
 * @param allowedDomains - List of allowed domains
 * @returns True if URL is safe
 */
export const isValidURL = (url: string, allowedDomains: string[] = []): boolean => {
    if (!url || typeof url !== 'string') return false;

    try {
        const parsedURL = new URL(url);

        // Only allow http and https protocols
        if (!['http:', 'https:'].includes(parsedURL.protocol)) {
            return false;
        }

        // If allowed domains specified, check against them
        if (allowedDomains.length > 0) {
            return allowedDomains.some(domain =>
                parsedURL.hostname === domain || parsedURL.hostname.endsWith(`.${domain}`)
            );
        }

        return true;
    } catch {
        return false;
    }
};

/**
 * Log security events for monitoring
 * 
 * @param event - Event name
 * @param details - Event details
 * @param severity - Event severity level (optional)
 */
export const logSecurityEvent = (
    event: string,
    details: Record<string, any> = {},
    severity: 'info' | 'warning' | 'critical' = 'info'
): void => {
    const logData = {
        event,
        details,
        severity,
        timestamp: new Date().toISOString(),
        userAgent: navigator.userAgent,
        url: window.location.href,
    };

    // Log to console in development
    if (import.meta.env.DEV) {
        console.warn('[SECURITY EVENT]', logData);
    }

    // In production, send to monitoring service
    if (import.meta.env.PROD) {
        // TODO: Integrate with your monitoring service (Sentry, LogRocket, etc.)
        // Example:
        // fetch('/api/security-log', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json' },
        //   body: JSON.stringify(logData),
        // }).catch(console.error);
    }
};

/**
 * Detect potential XSS attempts in user input
 * 
 * @param input - User input to check
 * @returns True if potential XSS detected
 */
export const detectXSS = (input: string): boolean => {
    if (!input || typeof input !== 'string') return false;

    const xssPatterns = [
        /<script[^>]*>.*?<\/script>/gi,
        /javascript:/gi,
        /on\w+\s*=/gi, // Event handlers like onclick=
        /<iframe/gi,
        /eval\(/gi,
        /expression\(/gi,
    ];

    return xssPatterns.some(pattern => pattern.test(input));
};

/**
 * Sanitize form data object
 * Applies appropriate sanitization to each field
 * 
 * @param data - Form data object
 * @returns Sanitized form data
 */
export const sanitizeFormData = <T extends Record<string, any>>(data: T): T => {
    const sanitized = { ...data };

    for (const key in sanitized) {
        const value = sanitized[key];

        if (typeof value === 'string') {
            // Check for XSS attempts
            if (detectXSS(value)) {
                logSecurityEvent('XSS_ATTEMPT_DETECTED', { field: key, value });
                sanitized[key] = '' as any; // Clear suspicious input
                continue;
            }

            // Apply appropriate sanitization based on field name
            if (key.toLowerCase().includes('email')) {
                sanitized[key] = sanitizeEmail(value) as any;
            } else if (key.toLowerCase().includes('phone')) {
                sanitized[key] = sanitizePhone(value) as any;
            } else {
                sanitized[key] = sanitizeInput(value) as any;
            }
        }
    }

    return sanitized;
};
