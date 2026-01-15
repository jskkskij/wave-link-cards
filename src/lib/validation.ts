import { z } from 'zod';
import { parsePhoneNumber } from 'libphonenumber-js';

/**
 * 2026 Security: Runtime Validation with Zod
 * TypeScript types disappear at runtime - Zod provides runtime safety
 */

// Order Form Schema with strict validation
export const OrderFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name too long')
        .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters')
        .transform(val => val.trim()),

    phone: z.string()
        .min(8, 'Phone number too short')
        .max(20, 'Phone number too long')
        .regex(/^[+\d\s()-]+$/, 'Phone number contains invalid characters')
        .transform(val => val.trim()),

    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email too long')
        .toLowerCase()
        .transform(val => val.trim()),

    quantity: z.coerce.number()
        .int('Quantity must be a whole number')
        .min(1, 'Minimum quantity is 1')
        .max(1000, 'Maximum quantity is 1000'),

    product: z.enum(['Smart Card', 'Review Stand'], {
        errorMap: () => ({ message: 'Invalid product selection' })
    }),

    address: z.string()
        .min(10, 'Address must be at least 10 characters')
        .max(500, 'Address too long')
        .transform(val => val.trim()),

    // Honeypot field - should always be empty
    website: z.string().max(0, 'Bot detected').optional().default('')
});

export type OrderFormData = z.infer<typeof OrderFormSchema>;

// Review Form Schema
export const ReviewFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name too long')
        .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters')
        .transform(val => val.trim()),

    rating: z.number()
        .int('Rating must be a whole number')
        .min(1, 'Minimum rating is 1')
        .max(5, 'Maximum rating is 5'),

    comment: z.string()
        .min(10, 'Comment must be at least 10 characters')
        .max(1000, 'Comment too long')
        .transform(val => val.trim()),

    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email too long')
        .toLowerCase()
        .optional()
        .transform(val => val?.trim())
});

export type ReviewFormData = z.infer<typeof ReviewFormSchema>;

// Contact Form Schema
export const ContactFormSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name too long')
        .regex(/^[a-zA-Z\s.'-]+$/, 'Name contains invalid characters')
        .transform(val => val.trim()),

    email: z.string()
        .email('Invalid email address')
        .max(255, 'Email too long')
        .toLowerCase()
        .transform(val => val.trim()),

    message: z.string()
        .min(10, 'Message must be at least 10 characters')
        .max(2000, 'Message too long')
        .transform(val => val.trim()),

    // Honeypot field
    website: z.string().max(0, 'Bot detected').optional().default('')
});

export type ContactFormData = z.infer<typeof ContactFormSchema>;

/**
 * Sanitize HTML to prevent XSS attacks
 * Used as a second layer of defense after Zod validation
 */
export function sanitizeHTML(dirty: string): string {
    // Remove all HTML tags and script content
    return dirty
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/<[^>]+>/g, '')
        .replace(/javascript:/gi, '')
        .replace(/on\w+\s*=/gi, '')
        .trim();
}

/**
 * Validate and sanitize form data with detailed error reporting
 */
export function validateFormData<T>(
    schema: z.ZodSchema<T>,
    data: unknown
): { success: true; data: T } | { success: false; error: string; details: Record<string, string[]> } {
    const result = schema.safeParse(data);

    if (result.success) {
        return { success: true, data: result.data };
    }

    const fieldErrors = result.error.flatten().fieldErrors;
    const firstError = Object.values(fieldErrors)[0]?.[0] || 'Validation failed';

    return {
        success: false,
        error: firstError,
        details: fieldErrors as Record<string, string[]>
    };
}
