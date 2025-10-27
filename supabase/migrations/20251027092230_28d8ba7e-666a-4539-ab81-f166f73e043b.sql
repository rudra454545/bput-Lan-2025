-- Create user_role enum for authentication roles
CREATE TYPE public.user_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role user_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.is_admin(_user_id UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = 'admin'::user_role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can view all roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (public.is_admin(auth.uid()));

-- Add booyah column to match_scores_br
ALTER TABLE public.match_scores_br ADD COLUMN IF NOT EXISTS booyah INTEGER DEFAULT 0;

-- Update profiles RLS to allow admin verification
CREATE POLICY "Admins can update any profile"
ON public.profiles
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Update teams RLS for admin management
CREATE POLICY "Admins can update any team"
ON public.teams
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete teams"
ON public.teams
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Allow admins to insert and update match scores
CREATE POLICY "Admins can insert BR scores"
ON public.match_scores_br
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update BR scores"
ON public.match_scores_br
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete BR scores"
ON public.match_scores_br
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));

-- Allow admins to manage player stats
CREATE POLICY "Admins can insert BR stats"
ON public.player_stats_br
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin(auth.uid()));

CREATE POLICY "Admins can update BR stats"
ON public.player_stats_br
FOR UPDATE
TO authenticated
USING (public.is_admin(auth.uid()));

CREATE POLICY "Admins can delete BR stats"
ON public.player_stats_br
FOR DELETE
TO authenticated
USING (public.is_admin(auth.uid()));