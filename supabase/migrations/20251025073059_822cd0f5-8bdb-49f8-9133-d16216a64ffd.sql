-- Fix security issues from linter (corrected approach)

-- Add RLS policies for admin_logs (admin only)  
CREATE POLICY "Admin logs viewable by admin only" ON public.admin_logs FOR SELECT USING (false);
CREATE POLICY "System can insert admin logs" ON public.admin_logs FOR INSERT WITH CHECK (true);

-- Fix function search paths (use OR REPLACE without DROP)
CREATE OR REPLACE FUNCTION generate_unique_player_id()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.profiles;
  new_id := 'BPUT-FF-' || LPAD(counter::TEXT, 4, '0');
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION generate_unique_team_id()
RETURNS TEXT 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_id TEXT;
  counter INTEGER;
BEGIN
  SELECT COUNT(*) + 1 INTO counter FROM public.teams;
  new_id := 'TEAM-' || LPAD(counter::TEXT, 4, '0');
  RETURN new_id;
END;
$$;

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;