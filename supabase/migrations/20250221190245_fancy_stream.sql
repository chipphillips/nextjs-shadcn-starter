/*
  # Enhanced Profile Schema

  1. New Tables
    - `ai_preferences`
      - User-specific AI interaction preferences
      - Communication styles and personas
      - Learning preferences and expertise levels
    
    - `project_history`
      - Track completed projects
      - Store project-specific context
      - Performance metrics

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- AI Preferences Table
CREATE TABLE ai_preferences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  communication_style TEXT NOT NULL DEFAULT 'formal',
  technical_level TEXT NOT NULL DEFAULT 'intermediate',
  learning_style TEXT NOT NULL DEFAULT 'detailed',
  code_examples_format TEXT NOT NULL DEFAULT 'typescript',
  special_instructions TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_communication_style CHECK (communication_style IN ('formal', 'casual', 'technical')),
  CONSTRAINT valid_technical_level CHECK (technical_level IN ('beginner', 'intermediate', 'advanced', 'expert')),
  CONSTRAINT valid_learning_style CHECK (learning_style IN ('detailed', 'concise', 'bullet-points')),
  CONSTRAINT valid_code_format CHECK (code_examples_format IN ('typescript', 'javascript', 'python', 'mixed'))
);

-- Project History Table
CREATE TABLE project_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  project_name TEXT NOT NULL,
  description TEXT,
  role TEXT NOT NULL,
  technologies TEXT[] NOT NULL DEFAULT '{}',
  start_date DATE NOT NULL,
  end_date DATE,
  performance_metrics JSONB,
  ai_interactions_summary TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE ai_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_history ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own AI preferences"
  ON ai_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own AI preferences"
  ON ai_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own AI preferences"
  ON ai_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own project history"
  ON project_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update own project history"
  ON project_history FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can insert own project history"
  ON project_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers
CREATE TRIGGER update_ai_preferences_updated_at
  BEFORE UPDATE ON ai_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_project_history_updated_at
  BEFORE UPDATE ON project_history
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Create initial preferences for existing users
INSERT INTO ai_preferences (user_id)
SELECT id FROM auth.users
ON CONFLICT DO NOTHING;