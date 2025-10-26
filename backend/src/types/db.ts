export interface Plan {
  id: string;
  user_id: string | null;
  title: string;
  description?: string | null;
  start_time?: string | null; // ISO timestamptz
  end_time?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AICommand {
  id: string;
  user_id: string | null;
  raw_text: string;
  parsed_action?: string | null;
  parsed_content?: any | null; // jsonb
  created_at?: string;
}

export interface Integration {
  id: string;
  user_id: string | null;
  provider: string;
  access_token?: string | null;
  refresh_token?: string | null;
  token_expiry?: string | null;
  created_at?: string;
}

export interface AIHistory {
  id: string;
  user_id: string | null;
  query: string;
  response?: string | null;
  related_plan_id?: string | null;
  created_at?: string;
}

export interface Profile {
  id: string;
  avatar_url?: string | null;
  full_name?: string | null;
  updated_at?: string | null;
  [key: string]: any;
}
