import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Normalizes certificate email inputs for case-insensitive verification
 */
export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

/**
 * Normalizes certificate IDs
 */
export function normalizeCertificateId(id: string): string {
  return id.trim().toUpperCase();
}
