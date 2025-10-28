-- Fix the team update policy to use auth.email() instead of auth.jwt() ->> 'email'
DROP POLICY "IGL can update own team or admin can update teams" ON public.teams;

CREATE POLICY "IGL can update own team or admin can update teams" ON public.teams FOR UPDATE USING (
  auth.uid() = igl_user_id OR auth.email() = 'tech.obscuragroups@gmail.com'
);
