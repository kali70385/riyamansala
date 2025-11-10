-- Fix search_path for check_listing_count function
CREATE OR REPLACE FUNCTION public.check_listing_count()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  listing_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO listing_count
  FROM public.listings
  WHERE user_id = NEW.user_id AND status = 'active';
  
  IF listing_count >= 5 THEN
    RAISE EXCEPTION 'Maximum 5 active listings per user allowed';
  END IF;
  
  RETURN NEW;
END;
$$;

-- Fix search_path for update_updated_at function
CREATE OR REPLACE FUNCTION public.update_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;