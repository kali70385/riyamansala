-- Allow admins to view all listings (including inactive)
CREATE POLICY "Admins can view all listings" 
ON public.listings 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update any listing
CREATE POLICY "Admins can update any listing" 
ON public.listings 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete any listing
CREATE POLICY "Admins can delete any listing" 
ON public.listings 
FOR DELETE 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to view all profiles
CREATE POLICY "Admins can view all profiles" 
ON public.profiles 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));

-- Allow admins to update any profile
CREATE POLICY "Admins can update any profile" 
ON public.profiles 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'));