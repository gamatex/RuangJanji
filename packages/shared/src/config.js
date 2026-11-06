export const SUPABASE_URL = 'https://bfaarhffvylqqbxycuds.supabase.co';
// Public client key; Supabase RLS remains mandatory for every table.
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_2Xf6OFt3oIZla83C8cq5jg_W3xOr8R7';
export function requirePublishableKey(value){if(!value)throw new Error('Missing Supabase publishable key');return value;}
