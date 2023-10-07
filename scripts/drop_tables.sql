-- Drop users table
DROP TABLE IF EXISTS user_daily_usage;

-- Drop vectors table (depend on vector)
DROP TABLE IF EXISTS vectors;

-- Drop vector extension
DROP EXTENSION IF EXISTS vector;

-- Drop function to match vectors
DROP FUNCTION IF EXISTS match_vectors;

-- Drop stats table
DROP TABLE IF EXISTS stats;

-- Drop summaries table
DROP TABLE IF EXISTS summaries;

-- Drop function to match summaries
DROP FUNCTION IF EXISTS match_summaries;

-- Drop api_keys table
DROP TABLE IF EXISTS api_keys;

-- Drop chats table (depends on auth.users)
DROP TABLE IF EXISTS chats;

-- knowledge table (depends on brains)
DROP TABLE IF EXISTS knowledge;

-- knowledge_vectors table
DROP TABLE IF EXISTS knowledge_vectors;

--- Drop brains table (depends on prompts)
DROP TABLE IF EXISTS brains;

--- Drop prompts table
DROP TABLE IF EXISTS prompts;

-- Drop chat_history table
DROP TABLE IF EXISTS chat_history;

-- DROP notification table

DROP TABLE IF EXISTS notifications;

-- DROP brains X users table
DROP TABLE IF EXISTS brains_users;

-- DROP brains X vectors table
DROP TABLE IF EXISTS brains_vectors;

-- DROP brains X vectors table
DROP TABLE IF EXISTS brain_subscription_invitations;

--- DROP user_identity table
DROP TABLE IF EXISTS user_identity;

DROP FUNCTION IF EXISTS public.get_user_email_by_user_id;

DROP FUNCTION IF EXISTS public.get_user_id_by_user_email;

DROP TABLE IF EXISTS migrations;

DROP TABLE IF EXISTS user_settings;

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

-- End of Scripts
