-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  location TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create opening_hours table
CREATE TABLE public.opening_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  day_of_week INTEGER NOT NULL CHECK (day_of_week >= 0 AND day_of_week <= 6), -- 0 = Sunday, 6 = Saturday
  day_name TEXT NOT NULL,
  open_time TIME,
  close_time TIME,
  is_closed BOOLEAN DEFAULT false,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opening_hours ENABLE ROW LEVEL SECURITY;

-- Create policies for events (public read access)
CREATE POLICY "Events are viewable by everyone"
  ON public.events
  FOR SELECT
  USING (true);

-- Create policies for opening_hours (public read access)
CREATE POLICY "Opening hours are viewable by everyone"
  ON public.opening_hours
  FOR SELECT
  USING (true);

-- Insert current events data
INSERT INTO public.events (title, description, event_date, location) VALUES
  ('Sunday Service', 'Join us for our weekly Sunday worship service', '2025-10-19', 'Main Church Hall'),
  ('Bible Study', 'Weekly Bible study and discussion', '2025-10-22', 'Fellowship Room'),
  ('Youth Ministry', 'Activities and fellowship for young people', '2025-10-24', 'Youth Center');

-- Insert opening hours data (example structure)
INSERT INTO public.opening_hours (day_of_week, day_name, open_time, close_time, is_closed, notes) VALUES
  (0, 'Sunday', '09:00', '13:00', false, 'Sunday worship service'),
  (1, 'Monday', null, null, true, 'Closed'),
  (2, 'Tuesday', '18:00', '20:00', false, 'Bible study'),
  (3, 'Wednesday', null, null, true, 'Closed'),
  (4, 'Thursday', '18:00', '20:00', false, 'Youth activities'),
  (5, 'Friday', null, null, true, 'Closed'),
  (6, 'Saturday', null, null, true, 'Closed');

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add triggers for updated_at
CREATE TRIGGER set_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER set_opening_hours_updated_at
  BEFORE UPDATE ON public.opening_hours
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();