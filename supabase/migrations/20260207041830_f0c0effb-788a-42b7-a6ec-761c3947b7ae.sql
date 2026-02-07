-- Create vehicle_models table for dynamic model management
CREATE TABLE public.vehicle_models (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  make text NOT NULL,
  model text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(category, make, model)
);

-- Enable RLS
ALTER TABLE public.vehicle_models ENABLE ROW LEVEL SECURITY;

-- Anyone can view models (needed for filters/autocomplete)
CREATE POLICY "Anyone can view vehicle models"
ON public.vehicle_models
FOR SELECT
USING (true);

-- Only admins can insert models
CREATE POLICY "Admins can insert vehicle models"
ON public.vehicle_models
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'));

-- Only admins can update models
CREATE POLICY "Admins can update vehicle models"
ON public.vehicle_models
FOR UPDATE
USING (has_role(auth.uid(), 'admin'));

-- Only admins can delete models
CREATE POLICY "Admins can delete vehicle models"
ON public.vehicle_models
FOR DELETE
USING (has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_vehicle_models_updated_at
BEFORE UPDATE ON public.vehicle_models
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at();