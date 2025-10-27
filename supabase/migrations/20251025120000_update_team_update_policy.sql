-- Update the teams update policy to allow admin to approve teams
DROP POLICY "IGL can update own team" ON public.teams;

CREATE POLICY "IGL can update own team or admin can update teams" ON public.teams FOR UPDATE USING (
  auth.uid() = igl_user_id OR auth.jwt() ->> 'email' = 'tech.obscuragroups@gmail.com'
);
