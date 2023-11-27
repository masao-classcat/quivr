-- Drop users table
DROP TABLE IF EXISTS user_daily_usage CASCADE;

-- Drop chats table (depends on auth.users)
DROP TABLE IF EXISTS chats CASCADE;

-- Drop vector extension
DROP EXTENSION IF EXISTS vector CASCADE;

-- Drop vectors table (depend on vector)
DROP TABLE IF EXISTS vectors CASCADE;

-- Drop function to match vectors (depends on vector)
DROP FUNCTION IF EXISTS match_vectors CASCADE;

-- Drop stats table
DROP TABLE IF EXISTS stats CASCADE;

-- Drop summaries table (depends on vectors, vector)
DROP TABLE IF EXISTS summaries CASCADE;

-- Drop function to match summaries (depends on vector)
DROP FUNCTION IF EXISTS match_summaries CASCADE;

-- Drop api_keys table
DROP TABLE IF EXISTS api_keys CASCADE;

--- Drop prompts table
DROP TABLE IF EXISTS prompts CASCADE;

--- Drop brains table (depends on prompts)
DROP TABLE IF EXISTS brains CASCADE;

-- Drop chat_history table (depends on chats)
DROP TABLE IF EXISTS chat_history CASCADE;

-- DROP notification table (depends on chats)
DROP TABLE IF EXISTS notifications CASCADE;

-- DROP brains X users table (depends on brains)
DROP TABLE IF EXISTS brains_users CASCADE;

-- DROP brains X vectors table (depend on vectors)
DROP TABLE IF EXISTS brains_vectors CASCADE;

-- DROP brains X vectors table (depends on brains)
DROP TABLE IF EXISTS brain_subscription_invitations CASCADE;

--- DROP user_identity table
DROP TABLE IF EXISTS user_identity CASCADE;

DROP TABLE IF EXISTS api_brain_definition CASCADE;

DROP FUNCTION IF EXISTS public.get_user_email_by_user_id CASCADE;

DROP FUNCTION IF EXISTS public.get_user_id_by_user_email CASCADE;

DROP TABLE IF EXISTS migrations CASCADE;

DROP TABLE IF EXISTS user_settings CASCADE;

-- knowledge table (depends on brains)
DROP TABLE IF EXISTS knowledge CASCADE;

-- knowledge_vectors table (depends on vectors)
DROP TABLE IF EXISTS knowledge_vectors CASCADE;

DROP FUNCTION IF EXISTS public.create_user_onboarding CASCADE;

DROP FUNCTION IF EXISTS create_user_onboarding CASCADE;

DROP TRIGGER IF EXISTS create_user_onboarding_trigger ON auth.users CASCADE;

-- DROP the onboarding table
DROP TABLE IF EXISTS onboardings CASCADE;

DROP EXTENSION IF EXISTS wrappers CASCADE;

DROP TABLE IF EXISTS public.users CASCADE;

DROP FUNCTION IF EXISTS public.handle_new_user CASCADE;

DROP TRIGGER IF EXISTS on_auth_user_created CASCADE;

DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_0" ON storage.objects CASCADE;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_1" ON storage.objects CASCADE;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_2" ON storage.objects CASCADE;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_3" ON storage.objects CASCADE;

DELETE FROM storage.objects;

DROP FUNCTION IF EXISTS insert_secret CASCADE;

DROP FUNCTION IF EXISTS read_secret CASCADE;

DROP FUNCTION IF EXISTS delete_secret CASCADE;



DELETE FROM storage.buckets WHERE id='quivr';

DROP FOREIGN TABLE IF EXISTS public.customers;

DROP SERVER IF EXISTS stripe_server;

DROP FOREIGN DATA WRAPPER IF EXISTS stripe_wrapper;




-- End of Scripts
