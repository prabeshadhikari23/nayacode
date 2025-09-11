/*
  # CMS Database Schema

  1. New Tables
    - `cms_content` - Stores editable text content with versioning
    - `services` - Service items with features and ordering
    - `portfolio` - Portfolio items with tags and featured status
    - `partners` - Partner information with logos and categories
    - `contact_info` - Contact information and social links
    - `form_submissions` - Contact form submissions with status tracking

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage content
    - Public read access for content display

  3. Features
    - UUID primary keys for all tables
    - Timestamps for created/updated tracking
    - JSON fields for complex data structures
    - Proper indexing for performance
*/

-- CMS Content table for editable text
CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'text',
  key text UNIQUE NOT NULL,
  value jsonb NOT NULL,
  last_modified timestamptz DEFAULT now(),
  modified_by text,
  created_at timestamptz DEFAULT now()
);

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT 'Code',
  title text NOT NULL,
  description text NOT NULL,
  features jsonb NOT NULL DEFAULT '[]',
  category text NOT NULL DEFAULT 'General',
  order_index integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  description text NOT NULL,
  image_url text NOT NULL,
  tags jsonb NOT NULL DEFAULT '[]',
  link text,
  featured boolean DEFAULT false,
  order_index integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Partners table
CREATE TABLE IF NOT EXISTS partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  logo text NOT NULL,
  description text NOT NULL,
  website text,
  category text NOT NULL,
  order_index integer NOT NULL DEFAULT 1,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Contact info table
CREATE TABLE IF NOT EXISTS contact_info (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text NOT NULL,
  phone jsonb NOT NULL DEFAULT '[]',
  email jsonb NOT NULL DEFAULT '[]',
  business_hours jsonb NOT NULL DEFAULT '[]',
  social_links jsonb NOT NULL DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Form submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived')),
  notes text,
  submitted_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE partners ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Public read policies for content display
CREATE POLICY "Public can read cms_content"
  ON cms_content
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read services"
  ON services
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read portfolio"
  ON portfolio
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read partners"
  ON partners
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Public can read contact_info"
  ON contact_info
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Authenticated users can manage content
CREATE POLICY "Authenticated users can manage cms_content"
  ON cms_content
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage services"
  ON services
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage portfolio"
  ON portfolio
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage partners"
  ON partners
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage contact_info"
  ON contact_info
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can manage form_submissions"
  ON form_submissions
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anyone can submit forms
CREATE POLICY "Anyone can submit forms"
  ON form_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_cms_content_key ON cms_content(key);
CREATE INDEX IF NOT EXISTS idx_services_order ON services(order_index);
CREATE INDEX IF NOT EXISTS idx_portfolio_order ON portfolio(order_index);
CREATE INDEX IF NOT EXISTS idx_portfolio_featured ON portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_partners_order ON partners(order_index);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_submitted_at ON form_submissions(submitted_at DESC);

-- Insert default data
INSERT INTO cms_content (key, value) VALUES
  ('hero.title', '"Transforming Challenges into Digital Opportunities"'),
  ('hero.subtitle', '"Your partner for innovative, scalable, and secure IT solutions in Nepal and beyond."'),
  ('about.title', '"Our Core Philosophy"'),
  ('about.description', '"We believe in creating digital solutions that not only solve problems but also drive innovation and growth."')
ON CONFLICT (key) DO NOTHING;

INSERT INTO services (icon, title, description, features, category, order_index) VALUES
  ('Code', 'Software Development', 'Custom web and mobile applications built with modern technologies', '["Web Applications", "Mobile Apps", "API Development", "Cloud Solutions"]', 'Development', 1),
  ('Shield', 'IT Security', 'Comprehensive cybersecurity solutions to protect your business', '["Security Audits", "Threat Assessment", "Implementation", "Monitoring"]', 'Security', 2),
  ('Target', 'Digital Marketing', 'Strategic digital marketing to grow your online presence', '["SEO Optimization", "Social Media", "Content Strategy", "Lead Generation"]', 'Marketing', 3),
  ('Users', 'UI/UX Design', 'Beautiful and intuitive user experiences that engage customers', '["User Research", "Interface Design", "Brand Identity", "Prototyping"]', 'Design', 4)
ON CONFLICT DO NOTHING;

INSERT INTO portfolio (title, category, description, image_url, tags, featured, order_index) VALUES
  ('E-commerce Platform', 'Web Development', 'Modern e-commerce solution with payment integration', '/api/placeholder/400/300', '["React", "Node.js", "MongoDB"]', true, 1),
  ('Mobile Banking App', 'Mobile Development', 'Secure mobile banking application with biometric authentication', '/api/placeholder/400/300', '["React Native", "Security", "Fintech"]', false, 2)
ON CONFLICT DO NOTHING;

INSERT INTO partners (name, logo, description, website, category, order_index) VALUES
  ('Microsoft Nepal', '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png', 'Strategic technology partnership for cloud solutions and enterprise software development', 'https://microsoft.com', 'Technology', 1),
  ('Google Cloud Partner', '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png', 'Certified Google Cloud partner providing scalable cloud infrastructure solutions', 'https://cloud.google.com', 'Cloud Services', 2),
  ('AWS Solutions Partner', '/lovable-uploads/39671993-1bb4-4bb6-8819-3ca5c07c0042.png', 'Amazon Web Services partner specializing in cloud migration and DevOps solutions', 'https://aws.amazon.com', 'Cloud Infrastructure', 3)
ON CONFLICT DO NOTHING;

INSERT INTO contact_info (address, phone, email, business_hours, social_links) VALUES
  ('Dillibazar-30, Kathmandu, Nepal', 
   '["+977 14548052", "+977 970511455"]', 
   '["info@nayacode.com.np"]', 
   '["Monday - Friday: 9:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM"]',
   '{"facebook": "https://facebook.com/nayacode", "twitter": "https://twitter.com/nayacode", "linkedin": "https://linkedin.com/company/nayacode", "instagram": "https://instagram.com/nayacode"}'
  )
ON CONFLICT DO NOTHING;