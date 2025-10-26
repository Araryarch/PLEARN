import { createClient } from '@supabase/supabase-js';
import config from '../config';

if (!config.supabaseUrl || !config.supabaseServiceRoleKey) {
  console.warn('SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is not set. Some features may fail.');
}

export const supabase = createClient(config.supabaseUrl, config.supabaseServiceRoleKey);

