import { supabase } from '@/lib/supabaseClient';
import { type AIPreferences, type ProjectHistory, type Settings } from '@/types/database';

interface UserContext {
  profile: {
    id: string;
    name: string;
    email: string;
    jobTitle: string;
    department: string;
    technicalLevel: string;
  };
  preferences: AIPreferences;
  settings: Settings;
  projectHistory: ProjectHistory[];
  conversationHistory: {
    id: string;
    messages: Array<{
      role: 'user' | 'assistant' | 'system';
      content: string;
      timestamp: string;
    }>;
    context: Record<string, any>;
  }[];
}

export class AIContextManager {
  private static instance: AIContextManager;
  private context: UserContext | null = null;
  private maxContextSize = 10; // Number of previous conversations to keep

  private constructor() {}

  static getInstance(): AIContextManager {
    if (!AIContextManager.instance) {
      AIContextManager.instance = new AIContextManager();
    }
    return AIContextManager.instance;
  }

  async loadContext(userId: string): Promise<void> {
    if (!supabase) throw new Error('Supabase client not initialized');

    // Load all user data in parallel
    const [profileResponse, preferencesResponse, projectHistoryResponse, settingsResponse] = await Promise.all([
      supabase.from('profiles')
      .select('*')
      .eq('id', userId)
      .single(),
      supabase.from('ai_preferences')
      .select('*')
      .eq('user_id', userId)
      .single(),
      supabase.from('project_history')
      .select('*')
      .eq('user_id', userId)
      .order('end_date', { ascending: false }),
      supabase.from('settings')
      .select('*')
      .eq('user_id', userId)
      .single()
    ]);

    this.context = {
      profile: profileResponse.data,
      preferences: preferencesResponse.data,
      settings: settingsResponse.data?.settings || {},
      projectHistory: projectHistoryResponse.data || [],
      conversationHistory: []
    };
  }

  getSystemPrompt(): string {
    if (!this.context) return '';

    const { profile, preferences, settings, projectHistory } = this.context;
    const recentProjects = projectHistory
      .slice(0, 3)
      .map(p => p.project_name)
      .join(', ');

    const aiSettings = settings.ai || {};
    const businessSettings = settings.business || {};

    return `You are assisting ${profile.name}, a ${profile.jobTitle} in the ${profile.department} department at ${businessSettings.companyName || 'the company'}.

Technical expertise: ${preferences.technical_level}
Communication style: ${preferences.communication_style}
Learning style: ${preferences.learning_style}
Code examples format: ${preferences.code_examples_format}
Industry context: ${businessSettings.industry || 'Technology'}
Primary project type: ${businessSettings.primaryProjectType || 'Software Development'}

Recent projects: ${recentProjects}

Special instructions: ${preferences.special_instructions || aiSettings.customInstructions || 'None provided'}

Response preferences:
- Format: ${preferences.preferredOutputFormat || 'detailed'}
- Style: ${aiSettings.defaultPersona || 'professional'}
- Error handling: ${aiSettings.errorHandling || 'strict'}

Please tailor your responses according to these preferences and expertise level.`;
  }

  async addConversation(conversation: {
    messages: Array<{ role: string; content: string }>;
    context?: Record<string, any>;
  }) {
    if (!this.context) return;

    const newConversation = {
      id: crypto.randomUUID(),
      messages: conversation.messages.map(msg => ({
        ...msg,
        timestamp: new Date().toISOString()
      })),
      context: conversation.context || {}
    };

    this.context.conversationHistory.unshift(newConversation);
    
    // Maintain max context size
    if (this.context.conversationHistory.length > this.maxContextSize) {
      this.context.conversationHistory = this.context.conversationHistory.slice(0, this.maxContextSize);
    }

    // Store in Supabase
    await supabase?.from('conversation_history').insert({
      user_id: this.context.profile.id,
      conversation: newConversation
    });
  }

  getRecentContext(): Array<{ role: string; content: string }> {
    if (!this.context) return [];

    return this.context.conversationHistory
      .slice(0, 3) // Get last 3 conversations
      .flatMap(conv => conv.messages)
      .slice(-10); // Get last 10 messages
  }

  async updatePreferences(preferences: Partial<AIPreferences>): Promise<void> {
    if (!this.context || !supabase) return;

    const { data, error } = await supabase
      .from('ai_preferences')
      .update(preferences)
      .eq('user_id', this.context.profile.id);

    if (error) throw error;

    // Update local context
    this.context.preferences = {
      ...this.context.preferences,
      ...preferences,
    };
  }

  async addProjectHistory(project: Omit<ProjectHistory, 'id' | 'user_id'>): Promise<void> {
    if (!this.context || !supabase) return;

    const { data, error } = await supabase
      .from('project_history')
      .insert([
        {
          ...project,
          user_id: this.context.profile.id,
        },
      ]);

    if (error) throw error;

    // Reload project history
    await this.loadContext(this.context.profile.id);
  }
}