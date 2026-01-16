import { useState, useCallback } from 'react';

interface RateLimitConfig {
    maxAttempts: number;
    windowMs: number;
    blockDurationMs?: number;
}

interface RateLimitState {
    attempts: number;
    firstAttemptTime: number;
    blockedUntil: number | null;
}

/**
 * Hook to implement client-side rate limiting for form submissions
 * Prevents spam and DoS attacks by limiting submission frequency
 * 
 * @param key - Unique identifier for this rate limit (e.g., 'order-form')
 * @param config - Rate limit configuration
 * @returns Object with checkRateLimit function and reset function
 * 
 * @example
 * const { checkRateLimit, reset } = useRateLimit('order-form', {
 *   maxAttempts: 3,
 *   windowMs: 60000, // 1 minute
 *   blockDurationMs: 300000 // 5 minutes
 * });
 */
export const useRateLimit = (
    key: string,
    config: RateLimitConfig
) => {
    const { maxAttempts, windowMs, blockDurationMs = windowMs * 5 } = config;
    const storageKey = `rate_limit_${key}`;

    const [isBlocked, setIsBlocked] = useState(false);

    const getState = useCallback((): RateLimitState => {
        try {
            const stored = sessionStorage.getItem(storageKey);
            if (stored) {
                return JSON.parse(stored);
            }
        } catch (error) {
            console.error('[Security] Failed to read rate limit state:', error);
        }
        return {
            attempts: 0,
            firstAttemptTime: 0,
            blockedUntil: null,
        };
    }, [storageKey]);

    const setState = useCallback((state: RateLimitState) => {
        try {
            sessionStorage.setItem(storageKey, JSON.stringify(state));
        } catch (error) {
            console.error('[Security] Failed to save rate limit state:', error);
        }
    }, [storageKey]);

    /**
     * Check if the current action is rate limited
     * @returns Object with isAllowed boolean and remainingTime in seconds if blocked
     */
    const checkRateLimit = useCallback((): {
        isAllowed: boolean;
        remainingTime?: number;
        message?: string;
    } => {
        const now = Date.now();
        const state = getState();

        // Check if currently blocked
        if (state.blockedUntil && now < state.blockedUntil) {
            const remainingMs = state.blockedUntil - now;
            const remainingSeconds = Math.ceil(remainingMs / 1000);
            setIsBlocked(true);

            return {
                isAllowed: false,
                remainingTime: remainingSeconds,
                message: `Too many attempts. Please wait ${remainingSeconds} seconds before trying again.`,
            };
        }

        // Reset if window has passed
        if (state.firstAttemptTime && now - state.firstAttemptTime > windowMs) {
            setState({
                attempts: 1,
                firstAttemptTime: now,
                blockedUntil: null,
            });
            setIsBlocked(false);
            return { isAllowed: true };
        }

        // Increment attempts
        const newAttempts = state.attempts + 1;

        if (newAttempts > maxAttempts) {
            // Block the user
            const blockedUntil = now + blockDurationMs;
            setState({
                attempts: newAttempts,
                firstAttemptTime: state.firstAttemptTime || now,
                blockedUntil,
            });
            setIsBlocked(true);

            const remainingSeconds = Math.ceil(blockDurationMs / 1000);
            return {
                isAllowed: false,
                remainingTime: remainingSeconds,
                message: `Rate limit exceeded. Please wait ${remainingSeconds} seconds before trying again.`,
            };
        }

        // Update attempts
        setState({
            attempts: newAttempts,
            firstAttemptTime: state.firstAttemptTime || now,
            blockedUntil: null,
        });
        setIsBlocked(false);

        return { isAllowed: true };
    }, [getState, setState, maxAttempts, windowMs, blockDurationMs]);

    /**
     * Reset the rate limit state
     */
    const reset = useCallback(() => {
        sessionStorage.removeItem(storageKey);
        setIsBlocked(false);
    }, [storageKey]);

    return {
        checkRateLimit,
        reset,
        isBlocked,
    };
};
