/*
  # Add Settings Table

  1. New Tables
    - `settings`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `settings` (jsonb)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `settings` table
    - Add policies for authenticated users to manage their settings
*/

-- Create settings table
CREATE TABLE settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  settings JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_settings CHECK (
    jsonb_typeof(settings) = 'object'
    AND (settings ? 'business' OR settings ? 'ai' OR settings ? 'system')
  )
);

-- Enable RLS
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own settings"
  ON settings FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own settings"
  ON settings FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own settings"
  ON settings FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create updated_at trigger
CREATE TRIGGER update_settings_updated_at
  BEFORE UPDATE ON settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create index for faster lookups
CREATE INDEX idx_settings_user_id ON settings(user_id);

-- Add settings validation function
CREATE OR REPLACE FUNCTION validate_settings()
RETURNS TRIGGER AS $$
BEGIN
  -- Validate business settings
  IF NEW.settings ? 'business' THEN
    IF NOT (
      NEW.settings->'business' ? 'companyName'
      AND NEW.settings->'business' ? 'website'
      AND NEW.settings->'business' ? 'primaryProjectType'
      AND NEW.settings->'business' ? 'industry'
      AND NEW.settings->'business' ? 'companySize'
    ) THEN
      RAISE EXCEPTION 'Invalid business settings structure';
    END IF;
  END IF;

  -- Validate AI settings
  IF NEW.settings ? 'ai' THEN
    IF NOT (
      NEW.settings->'ai' ? 'enableAI'
      AND NEW.settings->'ai' ? 'aiModel'
      AND NEW.settings->'ai' ? 'confidenceThreshold'
      AND NEW.settings->'ai' ? 'maxTokens'
      AND NEW.settings->'ai' ? 'temperature'
    ) THEN
      RAISE EXCEPTION 'Invalid AI settings structure';
    END IF;
  END IF;

  -- Validate system settings
  IF NEW.settings ? 'system' THEN
    IF NOT (
      NEW.settings->'system' ? 'theme'
      AND NEW.settings->'system' ? 'language'
      AND NEW.settings->'system' ? 'timezone'
    ) THEN
      RAISE EXCEPTION 'Invalid system settings structure';
    END IF;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;