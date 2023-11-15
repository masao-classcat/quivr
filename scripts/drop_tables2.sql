drop schema public cascade;
create schema public;

-- Drop function to match vectors (depends on vector)
DROP FUNCTION IF EXISTS match_vectors;

-- Drop function to match summaries (depends on vector)
DROP FUNCTION IF EXISTS match_summaries;

DROP FUNCTION IF EXISTS public.get_user_email_by_user_id;

DROP FUNCTION IF EXISTS public.get_user_id_by_user_email;

DROP FUNCTION IF EXISTS public.create_user_onboarding;
/* DROP FUNCTION IF EXISTS create_user_onboarding; */

DROP TRIGGER IF EXISTS create_user_onboarding_trigger ON auth.users;

DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_0" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_1" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_2" ON storage.objects;
DROP POLICY IF EXISTS "Access Quivr Storage 1jccrwz_3" ON storage.objects;

DELETE FROM storage.objects;

DELETE FROM storage.buckets WHERE id='quivr';

-- Drop vector extension
DROP EXTENSION IF EXISTS vector;
