-- Allow anyone to view public profile info of sellers
CREATE POLICY "Anyone can view seller profiles"
ON public.profiles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.listings 
    WHERE listings.user_id = profiles.user_id 
    AND listings.status = 'active'
  )
);