/*
  # AI Context and Profile System

  1. New Tables
    - `ai_context_versions`
      - Tracks changes to AI context and preferences
      - Enables version control and rollback
      - Stores change history with metadata

    - `ai_interaction_logs`
      - Logs AI interactions for analysis
      - Tracks effectiveness of context
      - Stores error reports and edge cases

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Implement audit logging

  3. Changes
    - Add version control to existing tables
    - Add performance tracking fields
    - Add context effectiveness metrics
*/

-- Create AI Context Versions table
CREATE TABLE ai_context_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  version_number INTEGER NOT NULL,
  preferences_snapshot JSONB NOT NULL,
  project_history_snapshot JSONB NOT NULL,
  change_description TEXT NOT NULL,
  change_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  created_by UUID REFERENCES auth.users(id),
  is_active BOOLEAN DEFAULT true,
  metadata JSONB,
  CONSTRAINT valid_change_type CHECK (change_type IN ('update', 'rollback', 'system'))
);

-- Create AI Interaction Logs table
CREATE TABLE ai_interaction_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  interaction_type TEXT NOT NULL,
  context_version UUID REFERENCES ai_context_versions(id),
  request TEXT NOT NULL,
  response TEXT NOT NULL,
  effectiveness_score INTEGER,
  error_details JSONB,
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB,
  CONSTRAINT valid_effectiveness_score CHECK (effectiveness_score BETWEEN 1 AND 10),
  CONSTRAINT valid_interaction_type CHECK (interaction_type IN ('chat', 'function_call', 'error'))
);

-- Add version control fields to existing tables
ALTER TABLE ai_preferences
ADD COLUMN version INTEGER DEFAULT 1,
ADD COLUMN previous_version UUID REFERENCES ai_context_versions(id),
ADD COLUMN effectiveness_metrics JSONB DEFAULT '{}',
ADD COLUMN last_evaluated_at TIMESTAMPTZ;

ALTER TABLE project_history
ADD COLUMN version INTEGER DEFAULT 1,
ADD COLUMN context_relevance_score INTEGER,
ADD COLUMN ai_usage_metrics JSONB DEFAULT '{}',
CONSTRAINT valid_relevance_score CHECK (context_relevance_score BETWEEN 1 AND 10);

-- Enable RLS
ALTER TABLE ai_context_versions ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_interaction_logs ENABLE ROW LEVEL SECURITY;

-- RLS Policies for ai_context_versions
CREATE POLICY "Users can view own context versions"
  ON ai_context_versions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own context versions"
  ON ai_context_versions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for ai_interaction_logs
CREATE POLICY "Users can view own interaction logs"
  ON ai_interaction_logs FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own interaction logs"
  ON ai_interaction_logs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Functions for version control
CREATE OR REPLACE FUNCTION create_context_version()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO ai_context_versions (
    user_id,
    version_number,
    preferences_snapshot,
    project_history_snapshot,
    change_description,
    change_type,
    created_by
  ) VALUES (
    NEW.user_id,
    NEW.version,
    row_to_json(NEW),
    (
      SELECT json_agg(row_to_json(ph))
      FROM project_history ph
      WHERE ph.user_id = NEW.user_id
    ),
    'Automatic version created on preference update',
    'update',
    auth.uid()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for version control
CREATE TRIGGER create_ai_preferences_version
  AFTER UPDATE ON ai_preferences
  FOR EACH ROW
  WHEN (NEW.version > OLD.version)
  EXECUTE FUNCTION create_context_version();

-- Function to evaluate context effectiveness
CREATE OR REPLACE FUNCTION evaluate_context_effectiveness()
RETURNS TRIGGER AS $$
BEGIN
  -- Calculate effectiveness based on recent interactions
  WITH recent_interactions AS (
    SELECT 
      COALESCE(AVG(effectiveness_score), 0) as avg_score,
      COUNT(*) FILTER (WHERE interaction_type = 'error') as error_count
    FROM ai_interaction_logs
    WHERE user_id = NEW.user_id
    AND created_at > NOW() - INTERVAL '7 days'
  )
  UPDATE ai_preferences
  SET 
    effectiveness_metrics = jsonb_build_object(
      'average_score', (SELECT avg_score FROM recent_interactions),
      'error_rate', (SELECT COALESCE(error_count::float / NULLIF(COUNT(*), 0), 0) FROM recent_interactions),
      'last_updated', NOW()
    ),
    last_evaluated_at = NOW()
  WHERE user_id = NEW.user_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for effectiveness evaluation
CREATE TRIGGER evaluate_interaction_effectiveness
  AFTER INSERT ON ai_interaction_logs
  FOR EACH ROW
  EXECUTE FUNCTION evaluate_context_effectiveness();

-- Create indexes for performance
CREATE INDEX idx_context_versions_user_id ON ai_context_versions(user_id);
CREATE INDEX idx_interaction_logs_user_id ON ai_interaction_logs(user_id);
CREATE INDEX idx_interaction_logs_created_at ON ai_interaction_logs(created_at);