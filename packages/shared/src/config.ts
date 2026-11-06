/** Shared public configuration. Never embed service-role keys. */
export const RUANGJANJI_COLORS = {
  terracotta: '#C86D51',
  cream: '#F5EBE6',
  espresso: '#2C221E',
  sage: '#A3B18B',
} as const;

export const SUPABASE_URL = 'https://bfaarhffvylqqbxycuds.supabase.co';

export function requirePublishableKey(value: string | undefined): string {
  if (!value) throw new Error('Missing Supabase publishable key');
  return value;
}
