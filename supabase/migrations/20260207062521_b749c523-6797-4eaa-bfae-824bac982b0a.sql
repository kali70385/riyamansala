-- Create vehicle_makes table
CREATE TABLE public.vehicle_makes (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    category TEXT NOT NULL,
    make TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE(category, make)
);

-- Enable Row Level Security
ALTER TABLE public.vehicle_makes ENABLE ROW LEVEL SECURITY;

-- Anyone can view vehicle makes (for filters and autocomplete)
CREATE POLICY "Anyone can view vehicle makes"
ON public.vehicle_makes
FOR SELECT
USING (true);

-- Only admins can insert vehicle makes
CREATE POLICY "Admins can insert vehicle makes"
ON public.vehicle_makes
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update vehicle makes
CREATE POLICY "Admins can update vehicle makes"
ON public.vehicle_makes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete vehicle makes
CREATE POLICY "Admins can delete vehicle makes"
ON public.vehicle_makes
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_vehicle_makes_updated_at
BEFORE UPDATE ON public.vehicle_makes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();