/*
  # Add Conversation History Support

  1. New Tables
    - `conversation_history`
      - Stores chat conversations with context and metadata
      - Enables conversation persistence and context management
      - Supports analytics and personalization

  2. Security
    - Enable RLS on new table
    - Add policies for authenticated users
*/

-- Create conversation history table
CREATE TABLE conversation_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  conversation JSONB NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  metadata JSONB DEFAULT '{}',
  CONSTRAINT valid_conversation CHECK (
    jsonb_typeof(conversation) = 'object'
    AND conversation ? 'messages'
    AND jsonb_typeof(conversation->'messages') = 'array'
  )
);

-- Enable RLS
ALTER TABLE conversation_history ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own conversations"
  ON conversation_history FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own conversations"
  ON conversation_history FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes
CREATE INDEX idx_conversation_history_user_id ON conversation_history(user_id);
CREATE INDEX idx_conversation_history_created_at ON conversation_history(created_at);

-- Add conversation validation function
CREATE OR REPLACE FUNCTION validate_conversation()
RETURNS TRIGGER AS $$
BEGIN
  IF NOT (
    NEW.conversation ? 'messages'
    AND jsonb_typeof(NEW.conversation->'messages') = 'array'
    AND jsonb_array_length(NEW.conversation->'messages') > 0
  ) THEN
    RAISE EXCEPTION 'Invalid conversation structure';
  END IF;

  -- Validate each message in the conversation
  FOR i IN 0..jsonb_array_length(NEW.conversation->'messages') - 1 LOOP
    IF NOT (
      NEW.conversation->'messages'->i ? 'role'
      AND NEW.conversation->'messages'->i ? 'content'
      AND NEW.conversation->'messages'->i ? 'timestamp'
    ) THEN
      RAISE EXCEPTION 'Invalid message structure at index %', i;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for conversation validation
CREATE TRIGGER validate_conversation_trigger
  BEFORE INSERT OR UPDATE ON conversation_history
  FOR EACH ROW
  EXECUTE FUNCTION validate_conversation();