// Utility functions — add as needed.

/**
 * Formats a date string to a human-readable locale string.
 */
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

