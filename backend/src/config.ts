import path from 'path';
import dotenv from 'dotenv';

const envPath = process.env.NODE_ENV === 'production'
  ? path.resolve(__dirname, '../.env')
  : path.resolve(process.cwd(), '.env');

dotenv.config({ path: envPath });

export const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: Number(process.env.PORT || 3000),
  supabaseUrl: process.env.SUPABASE_URL || '',
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  corsOrigins: process.env.CORS_ORIGINS ? process.env.CORS_ORIGINS.split(',') : ['*'],
};

export default config;
