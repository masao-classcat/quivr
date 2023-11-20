-- Drop users table
DROP TABLE IF EXISTS user_daily_usage;

-- Drop summaries table (depends on vectors, vector)
DROP TABLE IF EXISTS summaries;

-- DROP brains X vectors table (depend on vectors)
DROP TABLE IF EXISTS brains_vectors;

-- knowledge_vectors table (depends on vectors)
DROP TABLE IF EXISTS knowledge_vectors;

-- Drop vectors table (depend on vector)
DROP TABLE IF EXISTS vectors;

-- Drop function to match vectors (depends on vector)
DROP FUNCTION IF EXISTS match_vectors;

-- Drop function to match summaries (depends on vector)
DROP FUNCTION IF EXISTS match_summaries;

-- Drop vector extension
DROP EXTENSION IF EXISTS vector;

-- Drop stats table
DROP TABLE IF EXISTS stats;

-- Drop api_keys table
DROP TABLE IF EXISTS api_keys;

-- Drop chat_history table (depends on chats)
DROP TABLE IF EXISTS chat_history;

-- DROP notification table (depends on chats)
DROP TABLE IF EXISTS notifications;

-- Drop chats table (depends on auth.users)
DROP TABLE IF EXISTS chats;

-- knowledge table (depends on brains)
DROP TABLE IF EXISTS knowledge;

-- DROP brains X users table (depends on brains)
DROP TABLE IF EXISTS brains_users;

-- DROP brains X vectors table (depends on brains)
DROP TABLE IF EXISTS brain_subscription_invitations;

--- Drop brains table (depends on prompts)
DROP TABLE IF EXISTS brains;

--- Drop prompts table
DROP TABLE IF EXISTS prompts;

--- DROP user_identity table
DROP TABLE IF EXISTS user_identity;

DROP FUNCTION IF EXISTS public.get_user_email_by_user_id;

DROP FUNCTION IF EXISTS public.get_user_id_by_user_email;

DROP TABLE IF EXISTS migrations;

DROP TABLE IF EXISTS user_settings;

DROP TRIGGER IF EXISTS create_user_onboarding_trigger ON auth.users;
DROP FUNCTION IF EXISTS public.create_user_onboarding;
/* DROP FUNCTION IF EXISTS create_user_onboarding; */

-- DROP the onboarding table
DROP TABLE IF EXISTS onboardings;

DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_0" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_1" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_2" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_3" ON storage.objects;

DELETE FROM storage.objects;

DELETE FROM storage.buckets WHERE id='quivr';

/*
insert into
  storage.buckets (id, name)
values
  ('quivr', 'quivr');
*/

-- v0.0.96
-- Drop wrappers extension
DROP EXTENSION IF EXISTS wrappers;

DROP FOREIGN DATA WRAPPER IF EXISTS stripe_wrapper;

DROP SERVER IF EXISTS stripe_server;

DROP FOREIGN TABLE IF EXISTS public.customers;

DROP TABLE IF EXISTS public.users;

DROP FUNCTION IF EXISTS public.handle_new_user;

-- End of Scripts
