export const SUPABASE_URL = 'https://bfaarhffvylqqbxycuds.supabase.co';
// Replace this with the PUBLIC publishable key from Supabase dashboard.
// Do not use a service_role or secret key in frontend code.
export function requirePublishableKey(value){if(!value)throw new Error('Missing Supabase publishable key');return value;}
