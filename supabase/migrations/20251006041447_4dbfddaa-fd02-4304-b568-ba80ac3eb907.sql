-- Create role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'editor');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- CMS Content table
CREATE TABLE public.cms_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  type TEXT DEFAULT 'text',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_content ENABLE ROW LEVEL SECURITY;

-- CMS Services table
CREATE TABLE public.cms_services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_services ENABLE ROW LEVEL SECURITY;

-- CMS Portfolio table
CREATE TABLE public.cms_portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  category TEXT,
  description TEXT,
  image_url TEXT,
  tags TEXT[] DEFAULT '{}',
  link TEXT,
  featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_portfolio ENABLE ROW LEVEL SECURITY;

-- CMS Partners table
CREATE TABLE public.cms_partners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo TEXT,
  description TEXT,
  website TEXT,
  category TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_partners ENABLE ROW LEVEL SECURITY;

-- CMS Contact table
CREATE TABLE public.cms_contact (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  address TEXT,
  phone TEXT[] DEFAULT '{}',
  email TEXT[] DEFAULT '{}',
  business_hours TEXT[] DEFAULT '{}',
  social_links JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.cms_contact ENABLE ROW LEVEL SECURITY;

-- Form Submissions table
CREATE TABLE public.form_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;

-- RLS Policies - Public read access
CREATE POLICY "Public can view content" ON public.cms_content FOR SELECT USING (true);
CREATE POLICY "Public can view services" ON public.cms_services FOR SELECT USING (true);
CREATE POLICY "Public can view portfolio" ON public.cms_portfolio FOR SELECT USING (true);
CREATE POLICY "Public can view partners" ON public.cms_partners FOR SELECT USING (true);
CREATE POLICY "Public can view contact" ON public.cms_contact FOR SELECT USING (true);

-- RLS Policies - Admin write access
CREATE POLICY "Admins can manage content" ON public.cms_content FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage services" ON public.cms_services FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage portfolio" ON public.cms_portfolio FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage partners" ON public.cms_partners FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can manage contact" ON public.cms_contact FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies - Form submissions
CREATE POLICY "Anyone can submit forms" ON public.form_submissions FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can view submissions" ON public.form_submissions FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update submissions" ON public.form_submissions FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));

-- RLS Policies - User roles
CREATE POLICY "Users can view their roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Updated at trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

-- Triggers for updated_at
CREATE TRIGGER update_cms_content_updated_at BEFORE UPDATE ON public.cms_content FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_cms_services_updated_at BEFORE UPDATE ON public.cms_services FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_cms_portfolio_updated_at BEFORE UPDATE ON public.cms_portfolio FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_cms_partners_updated_at BEFORE UPDATE ON public.cms_partners FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_cms_contact_updated_at BEFORE UPDATE ON public.cms_contact FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE ON public.form_submissions FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Insert initial contact data
INSERT INTO public.cms_contact (address, phone, email, business_hours, social_links) VALUES (
  'Stockholm, Sweden',
  ARRAY['+46 70 123 4567'],
  ARRAY['hello@nayacode.com'],
  ARRAY['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday - Sunday: Closed'],
  '{"linkedin": "https://linkedin.com", "twitter": "https://twitter.com"}'::jsonb
);

-- Insert initial content
INSERT INTO public.cms_content (key, value, type) VALUES
  ('hero.title', 'Build Your Digital Future', 'text'),
  ('hero.subtitle', 'Transform your ideas into powerful digital solutions', 'text'),
  ('about.title', 'About Naya Code', 'text'),
  ('about.description', 'We are a team of passionate developers and designers dedicated to creating exceptional digital experiences.', 'text');