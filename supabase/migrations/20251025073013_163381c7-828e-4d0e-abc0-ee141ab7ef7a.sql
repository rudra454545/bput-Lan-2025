-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create enum types
CREATE TYPE app_role AS ENUM ('rusher', 'flanker', 'sniper', 'supporter');
CREATE TYPE match_mode AS ENUM ('BR', 'CS');
CREATE TYPE match_status AS ENUM ('scheduled', 'ongoing', 'completed');

-- Users/Players table (extends Supabase auth.users)
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  phone_number TEXT NOT NULL,
  full_name TEXT NOT NULL,
  university_id TEXT NOT NULL UNIQUE,
  in_game_name TEXT NOT NULL,
  game_uid TEXT NOT NULL UNIQUE,
  profile_screenshot_url TEXT,
  unique_player_id TEXT NOT NULL UNIQUE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Teams table
CREATE TABLE public.teams (
  team_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_name TEXT NOT NULL UNIQUE,
  unique_team_id TEXT NOT NULL UNIQUE,
  team_logo_url TEXT,
  igl_user_id UUID NOT NULL REFERENCES public.profiles(id),
  br_mode BOOLEAN DEFAULT FALSE,
  cs_mode BOOLEAN DEFAULT FALSE,
  members_count INTEGER DEFAULT 0 CHECK (members_count >= 4 AND members_count <= 5),
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Team members junction table
CREATE TABLE public.team_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  roles app_role[] NOT NULL,
  is_igl BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id)
);

-- BR Match Scores
CREATE TABLE public.match_scores_br (
  match_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_number INTEGER NOT NULL,
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  match_kills INTEGER DEFAULT 0,
  match_standing_points INTEGER DEFAULT 0,
  total_kills INTEGER DEFAULT 0,
  total_standing_points INTEGER DEFAULT 0,
  total_points INTEGER GENERATED ALWAYS AS (total_kills + total_standing_points) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_number, team_id)
);

-- CS Match Scores
CREATE TABLE public.match_scores_cs (
  match_id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  round_number INTEGER NOT NULL,
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  match_kills INTEGER DEFAULT 0,
  match_standing_points INTEGER DEFAULT 0,
  total_kills INTEGER DEFAULT 0,
  total_standing_points INTEGER DEFAULT 0,
  total_points INTEGER GENERATED ALWAYS AS (total_kills + total_standing_points) STORED,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(round_number, team_id)
);

-- BR Player Stats (avg kills per match)
CREATE TABLE public.player_stats_br (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  match_number INTEGER NOT NULL,
  kills INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, match_number)
);

-- CS Player Stats (K/D/A)
CREATE TABLE public.player_stats_cs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  team_id UUID NOT NULL REFERENCES public.teams(team_id) ON DELETE CASCADE,
  round_number INTEGER NOT NULL,
  kills INTEGER DEFAULT 0,
  deaths INTEGER DEFAULT 0,
  assists INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, round_number)
);

-- Match Schedules
CREATE TABLE public.schedules (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  match_number INTEGER NOT NULL,
  match_type match_mode NOT NULL,
  date_time TIMESTAMPTZ NOT NULL,
  status match_status DEFAULT 'scheduled',
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(match_number, match_type)
);

-- Admin Action Logs
CREATE TABLE public.admin_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  action_type TEXT NOT NULL,
  performed_by TEXT DEFAULT 'tech.obscuragroups@gmail.com',
  details JSONB,
  timestamp TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.teams ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_scores_br ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.match_scores_cs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats_br ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_stats_cs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
CREATE POLICY "Public profiles viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for teams (public read, authenticated create)
CREATE POLICY "Teams viewable by everyone" ON public.teams FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create teams" ON public.teams FOR INSERT WITH CHECK (auth.uid() = igl_user_id);
CREATE POLICY "IGL can update own team" ON public.teams FOR UPDATE USING (auth.uid() = igl_user_id);

-- RLS Policies for team_members
CREATE POLICY "Team members viewable by everyone" ON public.team_members FOR SELECT USING (true);
CREATE POLICY "IGL can manage team members" ON public.team_members FOR ALL USING (
  auth.uid() IN (SELECT igl_user_id FROM public.teams WHERE team_id = team_members.team_id)
);

-- RLS Policies for match scores (public read)
CREATE POLICY "BR scores viewable by everyone" ON public.match_scores_br FOR SELECT USING (true);
CREATE POLICY "CS scores viewable by everyone" ON public.match_scores_cs FOR SELECT USING (true);

-- RLS Policies for player stats (public read)
CREATE POLICY "BR stats viewable by everyone" ON public.player_stats_br FOR SELECT USING (true);
CREATE POLICY "CS stats viewable by everyone" ON public.player_stats_cs FOR SELECT USING (true);

-- RLS Policies for schedules (public read)
CREATE POLICY "Schedules viewable by everyone" ON public.schedules FOR SELECT USING (true);

-- Function to generate unique player ID
CREATE OR REPLACE FUNCTION generate_unique_player_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.profiles;
  new_id := 'BPUT-FF-' || LPAD(counter::TEXT, 4, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Function to generate unique team ID
CREATE OR REPLACE FUNCTION generate_unique_team_id()
RETURNS TEXT AS $$
DECLARE
  new_id TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.teams;
  new_id := 'TEAM-' || LPAD(counter::TEXT, 4, '0');
  RETURN new_id;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, unique_player_id, phone_number, full_name, university_id, in_game_name, game_uid)
  VALUES (
    NEW.id,
    NEW.email,
    generate_unique_player_id(),
    COALESCE(NEW.raw_user_meta_data->>'phone_number', ''),
    COALESCE(NEW.raw_user_meta_data->>'full_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'university_id', ''),
    COALESCE(NEW.raw_user_meta_data->>'in_game_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'game_uid', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_teams_updated_at BEFORE UPDATE ON public.teams
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Storage bucket for profile screenshots and team logos
INSERT INTO storage.buckets (id, name, public) VALUES 
  ('profile-screenshots', 'profile-screenshots', true),
  ('team-logos', 'team-logos', true);

-- Storage policies
CREATE POLICY "Anyone can view profile screenshots" ON storage.objects 
  FOR SELECT USING (bucket_id = 'profile-screenshots');

CREATE POLICY "Authenticated users can upload profile screenshots" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'profile-screenshots' AND auth.role() = 'authenticated');

CREATE POLICY "Anyone can view team logos" ON storage.objects 
  FOR SELECT USING (bucket_id = 'team-logos');

CREATE POLICY "Authenticated users can upload team logos" ON storage.objects 
  FOR INSERT WITH CHECK (bucket_id = 'team-logos' AND auth.role() = 'authenticated');

-- Enable realtime for match scores and player stats
ALTER PUBLICATION supabase_realtime ADD TABLE public.match_scores_br;
ALTER PUBLICATION supabase_realtime ADD TABLE public.match_scores_cs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_stats_br;
ALTER PUBLICATION supabase_realtime ADD TABLE public.player_stats_cs;
ALTER PUBLICATION supabase_realtime ADD TABLE public.teams;