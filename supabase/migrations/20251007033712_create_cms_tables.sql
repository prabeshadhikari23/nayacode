/*
  # Create CMS Tables

  ## Overview
  Creates all necessary tables for the CMS system including content management,
  services, portfolio, partners, contact information, and form submissions.

  ## Tables Created
  
  ### 1. cms_content
  - `id` (uuid, primary key) - Unique identifier
  - `key` (text, unique) - Content key for lookup
  - `value` (text) - Content value
  - `type` (text) - Content type (text, html, etc.)
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. cms_services
  - `id` (uuid, primary key) - Unique identifier
  - `icon` (text) - Icon identifier
  - `title` (text) - Service title
  - `description` (text) - Service description
  - `features` (text[]) - Array of features
  - `category` (text) - Service category
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 3. cms_portfolio
  - `id` (uuid, primary key) - Unique identifier
  - `title` (text) - Portfolio item title
  - `category` (text) - Portfolio category
  - `description` (text) - Portfolio description
  - `image_url` (text) - Image URL
  - `tags` (text[]) - Array of tags
  - `link` (text) - External link
  - `featured` (boolean) - Featured flag
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 4. cms_partners
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Partner name
  - `logo` (text) - Logo URL
  - `description` (text) - Partner description
  - `website` (text) - Partner website
  - `category` (text) - Partner category
  - `display_order` (integer) - Display order
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 5. cms_contact
  - `id` (uuid, primary key) - Unique identifier
  - `address` (text) - Contact address
  - `phone` (text[]) - Array of phone numbers
  - `email` (text[]) - Array of email addresses
  - `business_hours` (text[]) - Array of business hours
  - `social_links` (jsonb) - Social media links
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 6. form_submissions
  - `id` (uuid, primary key) - Unique identifier
  - `name` (text) - Submitter name
  - `email` (text) - Submitter email
  - `phone` (text) - Submitter phone
  - `subject` (text) - Submission subject
  - `message` (text) - Submission message
  - `status` (text) - Submission status (new, read, replied)
  - `notes` (text) - Admin notes
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ## Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with the following policies:
  
  1. **Public Read Access**: Anyone can read content from cms_content, cms_services, 
     cms_portfolio, cms_partners, and cms_contact tables (for website display)
  
  2. **Authenticated Write Access**: Only authenticated users can insert, update, 
     or delete records in CMS tables (for admin interface)
  
  3. **Form Submissions**: Public users can insert submissions, but only authenticated 
     users can read and manage them

  ## Important Notes
  - All tables use UUID primary keys with automatic generation
  - Timestamps are automatically set with defaults
  - Array and JSONB types are used for complex data structures
  - Display order fields default to 0 for sorting
*/

-- Create cms_content table
CREATE TABLE IF NOT EXISTS cms_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text NOT NULL DEFAULT '',
  type text NOT NULL DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cms_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cms_content"
  ON cms_content FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cms_content"
  ON cms_content FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cms_content"
  ON cms_content FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cms_content"
  ON cms_content FOR DELETE
  TO authenticated
  USING (true);

-- Create cms_services table
CREATE TABLE IF NOT EXISTS cms_services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  icon text NOT NULL DEFAULT '',
  title text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  features text[] DEFAULT ARRAY[]::text[],
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cms_services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cms_services"
  ON cms_services FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cms_services"
  ON cms_services FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cms_services"
  ON cms_services FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cms_services"
  ON cms_services FOR DELETE
  TO authenticated
  USING (true);

-- Create cms_portfolio table
CREATE TABLE IF NOT EXISTS cms_portfolio (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  category text,
  description text,
  image_url text,
  tags text[] DEFAULT ARRAY[]::text[],
  link text,
  featured boolean DEFAULT false,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cms_portfolio ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cms_portfolio"
  ON cms_portfolio FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cms_portfolio"
  ON cms_portfolio FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cms_portfolio"
  ON cms_portfolio FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cms_portfolio"
  ON cms_portfolio FOR DELETE
  TO authenticated
  USING (true);

-- Create cms_partners table
CREATE TABLE IF NOT EXISTS cms_partners (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL DEFAULT '',
  logo text,
  description text,
  website text,
  category text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cms_partners ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cms_partners"
  ON cms_partners FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cms_partners"
  ON cms_partners FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cms_partners"
  ON cms_partners FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cms_partners"
  ON cms_partners FOR DELETE
  TO authenticated
  USING (true);

-- Create cms_contact table
CREATE TABLE IF NOT EXISTS cms_contact (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  address text,
  phone text[] DEFAULT ARRAY[]::text[],
  email text[] DEFAULT ARRAY[]::text[],
  business_hours text[] DEFAULT ARRAY[]::text[],
  social_links jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE cms_contact ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cms_contact"
  ON cms_contact FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert cms_contact"
  ON cms_contact FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update cms_contact"
  ON cms_contact FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete cms_contact"
  ON cms_contact FOR DELETE
  TO authenticated
  USING (true);

-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status text DEFAULT 'new',
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can insert form_submissions"
  ON form_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can read form_submissions"
  ON form_submissions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update form_submissions"
  ON form_submissions FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete form_submissions"
  ON form_submissions FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_cms_content_key ON cms_content(key);
CREATE INDEX IF NOT EXISTS idx_cms_services_display_order ON cms_services(display_order);
CREATE INDEX IF NOT EXISTS idx_cms_portfolio_display_order ON cms_portfolio(display_order);
CREATE INDEX IF NOT EXISTS idx_cms_portfolio_featured ON cms_portfolio(featured);
CREATE INDEX IF NOT EXISTS idx_cms_partners_display_order ON cms_partners(display_order);
CREATE INDEX IF NOT EXISTS idx_form_submissions_status ON form_submissions(status);
CREATE INDEX IF NOT EXISTS idx_form_submissions_created_at ON form_submissions(created_at DESC);

-- Insert default contact information
INSERT INTO cms_contact (address, phone, email, business_hours, social_links)
VALUES (
  'Dillibazar-30, Kathmandu, Nepal',
  ARRAY['+977 14548052', '+977 970511455'],
  ARRAY['info@nayacode.com.np'],
  ARRAY['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'],
  '{"facebook": "https://facebook.com/nayacode", "twitter": "https://twitter.com/nayacode", "linkedin": "https://linkedin.com/company/nayacode", "instagram": "https://instagram.com/nayacode"}'::jsonb
)
ON CONFLICT DO NOTHING;