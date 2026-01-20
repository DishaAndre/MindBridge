import { supabase, TABLES } from '../lib/supabase';
import { aiService } from './aiService';

export const chatService = {
  // Create a new chat session
  async createChatSession(userId) {
    const { data, error } = await supabase
      .from(TABLES.CHAT_SESSIONS)
      .insert({
        user_id: userId,
        started_at: new Date().toISOString(),
        status: 'active'
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get chat sessions for a user
  async getChatSessions(userId, limit = 10) {
    const { data, error } = await supabase
      .from(TABLES.CHAT_SESSIONS)
      .select('*')
      .eq('user_id', userId)
      .order('started_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Get messages for a chat session
  async getChatMessages(sessionId) {
    const { data, error } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .select('*')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  // Send a message and get AI response
  async sendMessage(sessionId, userId, messageText, moodContext = null) {
    try {
      // Save user message
      const { data: userMessage, error: userError } = await supabase
        .from(TABLES.CHAT_MESSAGES)
        .insert({
          session_id: sessionId,
          user_id: userId,
          message_text: messageText,
          is_user_message: true,
          mood_context: moodContext,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (userError) throw userError;

      // Get AI response
      const aiResponse = await aiService.generateChatResponse(messageText, userId, sessionId);

      // Save AI message
      const { data: aiMessage, error: aiError } = await supabase
        .from(TABLES.CHAT_MESSAGES)
        .insert({
          session_id: sessionId,
          user_id: userId,
          message_text: aiResponse.response,
          is_user_message: false,
          ai_analysis: aiResponse.analysis,
          emotion_detected: aiResponse.emotionDetected,
          confidence_score: aiResponse.confidenceScore,
          flagged_for_crisis: aiResponse.crisisDetected,
          created_at: new Date().toISOString()
        })
        .select()
        .single();

      if (aiError) throw aiError;

      // If crisis detected, create alert
      if (aiResponse.crisisDetected) {
        await this.handleCrisisDetection(userId, sessionId, messageText, aiResponse);
      }

      return {
        userMessage,
        aiMessage,
        crisisDetected: aiResponse.crisisDetected
      };
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Handle crisis detection
  async handleCrisisDetection(userId, sessionId, messageText, aiResponse) {
    try {
      // Create crisis alert
      await supabase
        .from(TABLES.ALERTS)
        .insert({
          individual_id: userId,
          alert_type: 'crisis_detected',
          priority: 'critical',
          title: 'Crisis Detected in Chat',
          description: `Crisis indicators detected in user message. Confidence: ${aiResponse.confidenceScore}%`,
          data: {
            session_id: sessionId,
            message_text: messageText,
            ai_analysis: aiResponse.analysis,
            confidence_score: aiResponse.confidenceScore
          },
          created_at: new Date().toISOString()
        });

      // Notify caregivers
      await this.notifyCaregivers(userId, 'crisis', {
        message: 'Crisis detected in chat conversation',
        urgency: 'immediate',
        sessionId: sessionId
      });

    } catch (error) {
      console.error('Error handling crisis detection:', error);
    }
  },

  // End chat session
  async endChatSession(sessionId, summary = null) {
    const { data, error } = await supabase
      .from(TABLES.CHAT_SESSIONS)
      .update({
        ended_at: new Date().toISOString(),
        status: 'completed',
        session_summary: summary
      })
      .eq('id', sessionId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // Get chat history for context
  async getChatHistory(userId, limit = 50) {
    const { data, error } = await supabase
      .from(TABLES.CHAT_MESSAGES)
      .select(`
        *,
        chat_sessions!inner(user_id)
      `)
      .eq('chat_sessions.user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data;
  },

  // Notify caregivers
  async notifyCaregivers(userId, alertType, data) {
    try {
      // Get user's caregivers
      const { data: relationships, error } = await supabase
        .from(TABLES.CAREGIVER_RELATIONSHIPS)
        .select('caregiver_id')
        .eq('individual_id', userId)
        .eq('status', 'active');

      if (error) throw error;

      // Send notifications to each caregiver
      for (const relationship of relationships) {
        await supabase
          .from(TABLES.ALERTS)
          .insert({
            individual_id: userId,
            caregiver_id: relationship.caregiver_id,
            alert_type: alertType,
            priority: data.urgency === 'immediate' ? 'critical' : 'high',
            title: data.message,
            description: `Alert for individual under your care`,
            data: data,
            created_at: new Date().toISOString()
          });
      }
    } catch (error) {
      console.error('Error notifying caregivers:', error);
    }
  },

  // Subscribe to real-time messages
  subscribeToMessages(sessionId, callback) {
    return supabase
      .channel(`messages:${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: TABLES.CHAT_MESSAGES,
          filter: `session_id=eq.${sessionId}`
        },
        callback
      )
      .subscribe();
  }
};
