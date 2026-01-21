import { moodService } from './moodService';

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

export const aiService = {
  // Generate chat response using Gemini AI
  async generateChatResponse(userMessage, userId, sessionId) {
    try {
      // Get user's recent mood data for context
      const recentMoods = await moodService.getMoodCheckIns(userId, { limit: 5 });
      const moodContext = this.buildMoodContext(recentMoods);

      // Build system prompt for mental health support
      const systemPrompt = this.buildSystemPrompt(moodContext);

      // Detect crisis indicators
      const crisisDetected = this.detectCrisisIndicators(userMessage);

      // Generate response using Gemini
      const response = await this.callGeminiAPI(systemPrompt, userMessage, crisisDetected);

      // Analyze emotion in user message
      const emotionAnalysis = await this.analyzeEmotion(userMessage);

      return {
        response: response.text,
        analysis: response.analysis,
        emotionDetected: emotionAnalysis.emotion,
        confidenceScore: emotionAnalysis.confidence,
        crisisDetected: crisisDetected.detected,
        recommendations: response.recommendations || []
      };
    } catch (error) {
      console.error('Error generating AI response:', error);
      return {
        response: "I'm here to listen and support you. Could you tell me more about how you're feeling?",
        analysis: { error: 'AI service temporarily unavailable' },
        emotionDetected: 'neutral',
        confidenceScore: 0,
        crisisDetected: false,
        recommendations: []
      };
    }
  },

  // Build system prompt for mental health context
  buildSystemPrompt(moodContext) {
    return `You are a compassionate AI mental health companion for MindBridge, specifically designed to support individuals with cognitive disabilities and their caregivers. Your role is to:

CORE PRINCIPLES:
- Be empathetic, non-judgmental, and supportive
- Use simple, clear language appropriate for cognitive disabilities
- Never provide medical diagnosis or replace professional therapy
- Always prioritize user safety and well-being
- Encourage professional help when appropriate

COMMUNICATION STYLE:
- Use warm, encouraging tone
- Keep responses concise but meaningful
- Ask one question at a time
- Validate feelings and experiences
- Offer practical coping strategies

CRISIS DETECTION:
- Watch for signs of self-harm, suicide ideation, or severe distress
- If crisis detected, provide immediate resources and encourage emergency contact
- Always err on the side of caution for safety

USER CONTEXT:
${moodContext}

CAPABILITIES:
- Emotional support and active listening
- Coping strategy suggestions
- Mood pattern insights
- Crisis detection and resource provision
- Encouragement for professional help when needed

LIMITATIONS:
- Cannot provide medical advice or diagnosis
- Cannot replace professional therapy or counseling
- Cannot handle medical emergencies (direct to 911/988)

Remember: You're a supportive companion, not a therapist. Focus on listening, validating, and providing appropriate resources.`;
  },

  // Build mood context from recent check-ins
  buildMoodContext(recentMoods) {
    if (!recentMoods || recentMoods.length === 0) {
      return "No recent mood data available.";
    }

    const moodSummary = recentMoods.map(mood => 
      `${mood.created_at.split('T')[0]}: ${mood.mood_label} (intensity: ${mood.intensity}/10)`
    ).join('\n');

    return `Recent mood patterns:\n${moodSummary}`;
  },

  // Call Gemini API
  async callGeminiAPI(systemPrompt, userMessage, crisisContext) {
    // Check if API key is available and valid
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'your_gemini_api_key_here' || GEMINI_API_KEY.length < 20) {
      console.warn('Gemini API key not configured, using fallback responses');
      return this.getFallbackResponse(userMessage, crisisContext);
    }

    const prompt = `${systemPrompt}

${crisisContext.detected ? 'CRISIS ALERT: This message may indicate crisis. Respond with immediate support and resources.' : ''}

User message: "${userMessage}"

Provide a supportive response that:
1. Acknowledges their feelings
2. Offers appropriate support or coping strategies
3. Asks a gentle follow-up question if appropriate
4. ${crisisContext.detected ? 'Includes crisis resources and encourages immediate help' : 'Maintains a supportive, therapeutic tone'}

Response:`;

    try {
      const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ]
        })
      });

      if (!response.ok) {
        console.warn(`Gemini API error: ${response.status}, falling back to local responses`);
        return this.getFallbackResponse(userMessage, crisisContext);
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || "I'm here to support you. How are you feeling right now?";

      return {
        text: aiResponse,
        analysis: {
          model: 'gemini-pro',
          timestamp: new Date().toISOString(),
          crisis_context: crisisContext
        }
      };
    } catch (error) {
      console.warn('Gemini API call failed, using fallback:', error.message);
      return this.getFallbackResponse(userMessage, crisisContext);
    }
  },

  // Fallback response system when API is unavailable
  getFallbackResponse(userMessage, crisisContext) {
    const messageLower = userMessage.toLowerCase();
    
    if (crisisContext.detected) {
      return {
        text: "I'm very concerned about what you've shared. Your feelings are valid, but I want you to know that you don't have to face this alone. Please reach out for immediate support:\n\n🆘 Crisis Text Line: Text HOME to 741741\n📞 National Suicide Prevention Lifeline: 988\n🚨 If you're in immediate danger, please call 911\n\nYou matter, and there are people who want to help you through this difficult time. Can you tell me if you have someone you trust nearby?",
        analysis: {
          model: 'fallback-crisis',
          timestamp: new Date().toISOString(),
          crisis_context: crisisContext
        }
      };
    }

    // Emotion-based responses
    if (messageLower.includes('sad') || messageLower.includes('depressed') || messageLower.includes('down')) {
      return {
        text: "I hear that you're feeling sad right now, and I want you to know that it's okay to feel this way. Sadness is a natural human emotion, and acknowledging it takes courage. Sometimes when we're feeling down, it can help to do something small and gentle for ourselves. What's one thing that usually brings you a little comfort?",
        analysis: { model: 'fallback-sad', timestamp: new Date().toISOString() }
      };
    }

    if (messageLower.includes('anxious') || messageLower.includes('worried') || messageLower.includes('nervous')) {
      return {
        text: "It sounds like you're experiencing some anxiety, and that can feel really overwhelming. Let's try to slow things down together. Take a deep breath with me - in for 4 counts, hold for 4, and out for 4. Anxiety often makes our minds race, but you're safe right now in this moment. What's one thing you can see around you right now?",
        analysis: { model: 'fallback-anxious', timestamp: new Date().toISOString() }
      };
    }

    if (messageLower.includes('angry') || messageLower.includes('frustrated') || messageLower.includes('mad')) {
      return {
        text: "I can sense your frustration, and those feelings are completely valid. It's natural to feel angry sometimes, especially when things feel out of our control. Let's acknowledge that anger together - it's telling us something important. When you're ready, maybe we can explore what's underneath that anger. What do you think triggered these feelings?",
        analysis: { model: 'fallback-angry', timestamp: new Date().toISOString() }
      };
    }

    if (messageLower.includes('happy') || messageLower.includes('good') || messageLower.includes('great')) {
      return {
        text: "It's wonderful to hear that you're feeling good! Those positive moments are so important to celebrate and remember. Happiness can be a great foundation for building resilience. What's contributing to these good feelings today? I'd love to hear more about what's going well for you.",
        analysis: { model: 'fallback-happy', timestamp: new Date().toISOString() }
      };
    }

    // Default supportive responses
    const defaultResponses = [
      "Thank you for sharing with me. I'm here to listen and support you. How are you feeling in this moment?",
      "I appreciate you taking the time to check in. Your emotional well-being matters. What's on your mind today?",
      "It takes courage to reach out and share your thoughts. I'm here with you. Can you tell me more about what you're experiencing?",
      "I'm glad you're here. Sometimes just talking about our feelings can help us understand them better. What would you like to explore together?",
      "Your feelings are valid, whatever they may be. I'm here to listen without judgment. What's been on your heart lately?"
    ];

    return {
      text: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
      analysis: { 
        model: 'fallback-default', 
        timestamp: new Date().toISOString(),
        note: 'AI service using fallback responses - API key may need configuration'
      }
    };
  },

  // Detect crisis indicators in user message
  detectCrisisIndicators(message) {
    const crisisKeywords = [
      // Suicide ideation
      'kill myself', 'end my life', 'want to die', 'suicide', 'suicidal',
      'not worth living', 'better off dead', 'end it all', 'take my own life',
      
      // Self-harm
      'hurt myself', 'cut myself', 'harm myself', 'self harm', 'self-harm',
      
      // Hopelessness
      'no point', 'give up', 'hopeless', 'can\'t go on', 'nothing matters',
      'no way out', 'trapped', 'can\'t take it anymore',
      
      // Immediate danger
      'right now', 'tonight', 'today', 'going to', 'planning to'
    ];

    const urgentPhrases = [
      'i want to kill myself',
      'i am going to kill myself',
      'i want to die',
      'i am going to hurt myself',
      'i have a plan',
      'i can\'t take it anymore'
    ];

    const messageLower = message.toLowerCase();
    
    // Check for urgent phrases first
    const urgentDetected = urgentPhrases.some(phrase => messageLower.includes(phrase));
    
    // Check for crisis keywords
    const keywordMatches = crisisKeywords.filter(keyword => messageLower.includes(keyword));
    
    const detected = urgentDetected || keywordMatches.length >= 2 || 
                    (keywordMatches.length >= 1 && messageLower.includes('want'));

    return {
      detected,
      confidence: detected ? (urgentDetected ? 95 : Math.min(90, keywordMatches.length * 30)) : 0,
      keywords: keywordMatches,
      urgent: urgentDetected
    };
  },

  // Analyze emotion in user message
  async analyzeEmotion(message) {
    const emotionKeywords = {
      happy: ['happy', 'joy', 'excited', 'great', 'wonderful', 'amazing', 'fantastic', 'good'],
      sad: ['sad', 'depressed', 'down', 'blue', 'miserable', 'unhappy', 'crying'],
      anxious: ['anxious', 'worried', 'nervous', 'scared', 'afraid', 'panic', 'stress'],
      angry: ['angry', 'mad', 'furious', 'irritated', 'frustrated', 'annoyed'],
      confused: ['confused', 'lost', 'don\'t know', 'uncertain', 'mixed up'],
      calm: ['calm', 'peaceful', 'relaxed', 'serene', 'tranquil']
    };

    const messageLower = message.toLowerCase();
    const emotionScores = {};

    // Calculate scores for each emotion
    Object.entries(emotionKeywords).forEach(([emotion, keywords]) => {
      emotionScores[emotion] = keywords.filter(keyword => 
        messageLower.includes(keyword)
      ).length;
    });

    // Find dominant emotion
    const dominantEmotion = Object.entries(emotionScores)
      .reduce((a, b) => emotionScores[a[0]] > emotionScores[b[0]] ? a : b)[0];

    const confidence = Math.min(100, emotionScores[dominantEmotion] * 25);

    return {
      emotion: confidence > 0 ? dominantEmotion : 'neutral',
      confidence,
      scores: emotionScores
    };
  },

  // Generate mood insights
  async generateMoodInsights(userId) {
    try {
      const moodStats = await moodService.getMoodStats(userId, 30);
      const recentMoods = await moodService.getMoodCheckIns(userId, { limit: 10 });

      const prompt = `Analyze this user's mood data and provide insights:

Mood Statistics (last 30 days):
- Total check-ins: ${moodStats.totalCheckIns}
- Average intensity: ${moodStats.averageIntensity.toFixed(1)}/10
- Recent trend: ${moodStats.recentTrend}
- Mood distribution: ${JSON.stringify(moodStats.moodDistribution)}

Recent mood entries:
${recentMoods.map(mood => 
  `${mood.created_at.split('T')[0]}: ${mood.mood_label} (${mood.intensity}/10) - Contexts: ${mood.contexts?.join(', ') || 'none'}`
).join('\n')}

Provide:
1. Key patterns you notice
2. Positive trends to celebrate
3. Areas that might need attention
4. Personalized recommendations
5. Encouragement and validation

Keep the tone supportive and focus on actionable insights.`;

      const response = await this.callGeminiAPI('You are a supportive AI analyzing mood patterns for mental health insights.', prompt, { detected: false });

      return {
        insights: response.text,
        stats: moodStats,
        generatedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error generating mood insights:', error);
      return {
        insights: "I notice you've been tracking your mood regularly, which is a great step for self-awareness. Keep up the good work!",
        stats: await moodService.getMoodStats(userId, 30),
        generatedAt: new Date().toISOString()
      };
    }
  }
};
