-- Create a table for public profiles
CREATE TABLE profiles (
  id UUID REFERENCES auth.users NOT NULL PRIMARY KEY,
  updated_at TIMESTAMP WITH TIME ZONE,
  email TEXT UNIQUE,
  username TEXT UNIQUE,
  avatar_url TEXT,

  CONSTRAINT username_length CHECK (char_length(username) >= 5)
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles viewable by everyone"
  ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT WITH CHECK ((SELECT auth.uid()) = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE USING ((SELECT auth.uid()) = id);


-- HOOK FUNCTION FOR SIGN UP
CREATE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, username, avatar_url)
  VALUES (
    new.id,
    new.raw_user_meta_data->>'email',
    new.raw_user_meta_data->>'username',
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function everytime a user is CREATED
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Set up Storage!
INSERT INTO storage.buckets (id, name)
  VALUES ('avatars', 'avatars');

-- RLS for Storage.
CREATE POLICY "Avatar publicly accessible"
  ON storage.objects
  FOR SELECT USING (bucket_id = 'avatars');

CREATE POLICY "Anyone can upload"
  ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'avatars');

CREATE POLICY "Anyone can update their own avatar"
  ON storage.objects
  FOR UPDATE USING ((select auth.uid()) = owner)
  WITH CHECK (bucket_id = 'avatars');
