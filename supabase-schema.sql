-- MindBridge Database Schema for Supabase
-- Run this in your Supabase SQL editor to create all necessary tables

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- User Profiles Table (extends auth.users)
CREATE TABLE user_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    avatar_url TEXT,
    date_of_birth DATE,
    cognitive_disability_type TEXT,
    support_needs TEXT[],
    emergency_contacts JSONB DEFAULT '[]',
    preferences JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caregiver Profiles Table
CREATE TABLE caregiver_profiles (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE UNIQUE NOT NULL,
    relationship_type TEXT NOT NULL CHECK (relationship_type IN ('parent', 'therapist', 'social_worker', 'family', 'professional', 'other')),
    credentials TEXT,
    organization TEXT,
    license_number TEXT,
    specializations TEXT[],
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caregiver Relationships Table
CREATE TABLE caregiver_relationships (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    caregiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    individual_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    relationship_type TEXT NOT NULL,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'pending')),
    permissions JSONB DEFAULT '{"view_mood_data": true, "receive_alerts": true, "view_chat_summaries": false, "view_activity_data": true}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(caregiver_id, individual_id)
);

-- Mood Check-ins Table
CREATE TABLE mood_checkins (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    mood_emoji TEXT NOT NULL,
    mood_label TEXT NOT NULL,
    intensity INTEGER NOT NULL CHECK (intensity >= 1 AND intensity <= 10),
    contexts TEXT[] DEFAULT '{}',
    notes TEXT,
    ai_analysis JSONB,
    is_crisis_detected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Sessions Table
CREATE TABLE chat_sessions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    ended_at TIMESTAMP WITH TIME ZONE,
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'completed', 'abandoned')),
    session_summary TEXT,
    mood_at_start TEXT,
    mood_at_end TEXT,
    total_messages INTEGER DEFAULT 0,
    crisis_detected BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Chat Messages Table
CREATE TABLE chat_messages (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE NOT NULL,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    message_text TEXT NOT NULL,
    is_user_message BOOLEAN NOT NULL,
    mood_context TEXT,
    ai_analysis JSONB,
    emotion_detected TEXT,
    confidence_score FLOAT,
    flagged_for_crisis BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Table
CREATE TABLE activities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL CHECK (category IN ('breathing', 'movement', 'creative', 'sensory', 'mindfulness')),
    emoji TEXT,
    difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
    duration_minutes INTEGER NOT NULL,
    suitable_emotions TEXT[] DEFAULT '{}',
    completion_count INTEGER DEFAULT 0,
    content_type TEXT CHECK (content_type IN ('breathing', 'video', 'activity', 'audio')),
    video_url TEXT,
    audio_url TEXT,
    breathing_cycles INTEGER,
    instructions TEXT NOT NULL,
    is_custom BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activity Completions Table
CREATE TABLE activity_completions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    activity_id UUID REFERENCES activities(id) ON DELETE CASCADE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    duration_seconds INTEGER,
    mood_before TEXT,
    mood_after TEXT,
    user_notes TEXT,
    effectiveness_rating INTEGER CHECK (effectiveness_rating >= 1 AND effectiveness_rating <= 5)
);

-- Alerts Table
CREATE TABLE alerts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    individual_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    caregiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    alert_type TEXT NOT NULL CHECK (alert_type IN ('mood_decline', 'missed_checkin', 'crisis_detected', 'positive_milestone', 'pattern_detected')),
    priority TEXT NOT NULL CHECK (priority IN ('low', 'medium', 'high', 'critical')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    data JSONB DEFAULT '{}',
    is_acknowledged BOOLEAN DEFAULT FALSE,
    acknowledged_at TIMESTAMP WITH TIME ZONE,
    acknowledged_by UUID REFERENCES auth.users(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Communication Logs Table
CREATE TABLE communication_logs (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    individual_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    caregiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    communication_type TEXT NOT NULL CHECK (communication_type IN ('message', 'call', 'note', 'alert', 'visit')),
    content TEXT NOT NULL,
    duration_seconds INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Caregiver Invitations Table
CREATE TABLE caregiver_invitations (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    caregiver_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    individual_email TEXT NOT NULL,
    relationship_type TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'declined', 'expired')),
    expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
    accepted_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievement Badges Table
CREATE TABLE achievement_badges (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    emoji TEXT NOT NULL,
    description TEXT NOT NULL,
    criteria JSONB NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Achievements Table
CREATE TABLE user_achievements (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    badge_id UUID REFERENCES achievement_badges(id) ON DELETE CASCADE NOT NULL,
    earned_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    progress JSONB DEFAULT '{}',
    UNIQUE(user_id, badge_id)
);

-- Create indexes for better performance
CREATE INDEX idx_mood_checkins_user_id_created_at ON mood_checkins(user_id, created_at DESC);
CREATE INDEX idx_chat_messages_session_id_created_at ON chat_messages(session_id, created_at);
CREATE INDEX idx_alerts_caregiver_id_created_at ON alerts(caregiver_id, created_at DESC);
CREATE INDEX idx_alerts_individual_id_created_at ON alerts(individual_id, created_at DESC);
CREATE INDEX idx_activity_completions_user_id_completed_at ON activity_completions(user_id, completed_at DESC);
CREATE INDEX idx_caregiver_relationships_caregiver_id ON caregiver_relationships(caregiver_id);
CREATE INDEX idx_caregiver_relationships_individual_id ON caregiver_relationships(individual_id);

-- Create RLS (Row Level Security) policies
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE caregiver_relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE mood_checkins ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_completions ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE communication_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_achievements ENABLE ROW LEVEL SECURITY;

-- User Profiles Policies
CREATE POLICY "Users can view own profile" ON user_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON user_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON user_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Caregivers can view their individuals' profiles" ON user_profiles FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM caregiver_relationships 
        WHERE caregiver_id = auth.uid() 
        AND individual_id = user_profiles.user_id 
        AND status = 'active'
    )
);

-- Caregiver Profiles Policies
CREATE POLICY "Users can view own caregiver profile" ON caregiver_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own caregiver profile" ON caregiver_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own caregiver profile" ON caregiver_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Mood Check-ins Policies
CREATE POLICY "Users can manage own mood checkins" ON mood_checkins FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Caregivers can view their individuals' mood checkins" ON mood_checkins FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM caregiver_relationships 
        WHERE caregiver_id = auth.uid() 
        AND individual_id = mood_checkins.user_id 
        AND status = 'active'
        AND (permissions->>'view_mood_data')::boolean = true
    )
);

-- Chat Sessions Policies
CREATE POLICY "Users can manage own chat sessions" ON chat_sessions FOR ALL USING (auth.uid() = user_id);

-- Chat Messages Policies
CREATE POLICY "Users can manage own chat messages" ON chat_messages FOR ALL USING (auth.uid() = user_id);

-- Activity Completions Policies
CREATE POLICY "Users can manage own activity completions" ON activity_completions FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Caregivers can view their individuals' activity completions" ON activity_completions FOR SELECT USING (
    EXISTS (
        SELECT 1 FROM caregiver_relationships 
        WHERE caregiver_id = auth.uid() 
        AND individual_id = activity_completions.user_id 
        AND status = 'active'
        AND (permissions->>'view_activity_data')::boolean = true
    )
);

-- Alerts Policies
CREATE POLICY "Caregivers can manage their alerts" ON alerts FOR ALL USING (auth.uid() = caregiver_id);
CREATE POLICY "Individuals can view their own alerts" ON alerts FOR SELECT USING (auth.uid() = individual_id);

-- Communication Logs Policies
CREATE POLICY "Caregivers can manage communication logs" ON communication_logs FOR ALL USING (auth.uid() = caregiver_id);
CREATE POLICY "Individuals can view their communication logs" ON communication_logs FOR SELECT USING (auth.uid() = individual_id);

-- User Achievements Policies
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own achievements" ON user_achievements FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Functions
CREATE OR REPLACE FUNCTION increment_activity_completion(activity_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE activities 
    SET completion_count = completion_count + 1 
    WHERE id = activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to analyze mood patterns (placeholder for future AI integration)
CREATE OR REPLACE FUNCTION analyze_mood_patterns(user_id UUID)
RETURNS JSONB AS $$
DECLARE
    result JSONB;
BEGIN
    -- This is a placeholder function
    -- In a real implementation, this would contain complex pattern analysis
    SELECT jsonb_build_object(
        'patterns_detected', ARRAY['weekly_cycle', 'stress_correlation'],
        'recommendations', ARRAY['Consider regular exercise', 'Monitor sleep patterns'],
        'confidence_score', 0.75,
        'analysis_date', NOW()
    ) INTO result;
    
    RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply update triggers to relevant tables
CREATE TRIGGER update_user_profiles_updated_at BEFORE UPDATE ON user_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_caregiver_profiles_updated_at BEFORE UPDATE ON caregiver_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_mood_checkins_updated_at BEFORE UPDATE ON mood_checkins FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_activities_updated_at BEFORE UPDATE ON activities FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_alerts_updated_at BEFORE UPDATE ON alerts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_caregiver_relationships_updated_at BEFORE UPDATE ON caregiver_relationships FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_communication_logs_updated_at BEFORE UPDATE ON communication_logs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default activities
INSERT INTO activities (title, description, category, emoji, difficulty, duration_minutes, suitable_emotions, instructions, content_type) VALUES
('Deep Breathing Exercise', 'Calm your mind with simple breathing exercises that help reduce anxiety and stress', 'breathing', '🌬️', 'easy', 5, ARRAY['anxious', 'overwhelmed', 'stressed'], 'Sit comfortably and breathe in for 4 counts, hold for 4, exhale for 6. Repeat for 5 minutes.', 'breathing'),
('Progressive Muscle Relaxation', 'Systematically tense and relax different muscle groups to reduce physical tension', 'movement', '🧘', 'medium', 15, ARRAY['anxious', 'tense', 'stressed'], 'Start with your toes and work up to your head, tensing each muscle group for 5 seconds then relaxing.', 'activity'),
('Mindful Coloring', 'Focus your mind through creative coloring activities', 'creative', '🎨', 'easy', 20, ARRAY['anxious', 'restless', 'overwhelmed'], 'Choose colors mindfully and focus on the present moment while coloring intricate patterns.', 'activity'),
('Nature Sounds Meditation', 'Listen to calming nature sounds while practicing mindfulness', 'sensory', '🎵', 'easy', 10, ARRAY['stressed', 'anxious', 'sad'], 'Close your eyes and listen to nature sounds while focusing on your breath and the present moment.', 'audio'),
('Gratitude Journaling', 'Write down things you are grateful for to shift focus to positive aspects', 'mindfulness', '📝', 'easy', 10, ARRAY['sad', 'negative', 'overwhelmed'], 'Write down 3-5 things you are grateful for today, no matter how small.', 'activity'),
('Body Scan Meditation', 'Systematically focus attention on different parts of your body', 'mindfulness', '🧠', 'medium', 20, ARRAY['anxious', 'tense', 'overwhelmed'], 'Lie down and slowly focus on each part of your body from toes to head, noticing sensations without judgment.', 'activity'),
('Gentle Stretching', 'Simple stretches to release physical tension and improve mood', 'movement', '🤸', 'easy', 10, ARRAY['tense', 'restless', 'low energy'], 'Perform gentle stretches for neck, shoulders, back, and legs. Hold each stretch for 30 seconds.', 'activity'),
('Positive Affirmations', 'Repeat positive statements to challenge negative thoughts', 'mindfulness', '💪', 'easy', 5, ARRAY['sad', 'negative', 'low confidence'], 'Repeat positive affirmations about yourself and your capabilities. Believe in the words you speak.', 'activity'),
('Walking Meditation', 'Combine gentle movement with mindfulness practice', 'movement', '🚶', 'easy', 15, ARRAY['restless', 'anxious', 'overwhelmed'], 'Walk slowly and deliberately, focusing on each step and your breathing rhythm.', 'activity'),
('Calming Music Listening', 'Listen to specially selected calming music to reduce stress', 'sensory', '🎶', 'easy', 15, ARRAY['stressed', 'anxious', 'agitated'], 'Sit or lie comfortably and listen to calming instrumental music, letting it wash over you.', 'audio'),
('Visualization Exercise', 'Imagine peaceful scenes to promote relaxation and calm', 'mindfulness', '🌅', 'medium', 12, ARRAY['anxious', 'stressed', 'overwhelmed'], 'Close your eyes and visualize a peaceful place in detail, engaging all your senses in the imagery.', 'activity'),
('Aromatherapy Breathing', 'Combine deep breathing with calming scents', 'sensory', '🌸', 'easy', 8, ARRAY['anxious', 'tense', 'stressed'], 'Use lavender or other calming scents while practicing deep breathing exercises.', 'activity');

-- Insert default achievement badges
INSERT INTO achievement_badges (name, emoji, description, criteria) VALUES
('First Steps', '👶', 'Complete your first mood check-in', '{"type": "mood_checkin", "target_value": 1}'),
('Consistent Tracker', '📅', 'Complete mood check-ins for 7 consecutive days', '{"type": "mood_streak", "target_value": 7}'),
('Activity Explorer', '🎯', 'Try 5 different calming activities', '{"type": "unique_activities", "target_value": 5}'),
('Mindfulness Master', '🧘', 'Complete 10 mindfulness activities', '{"type": "category_activities", "category": "mindfulness", "target_value": 10}'),
('Breathing Expert', '🌬️', 'Complete 15 breathing exercises', '{"type": "category_activities", "category": "breathing", "target_value": 15}'),
('Creative Soul', '🎨', 'Complete 10 creative activities', '{"type": "category_activities", "category": "creative", "target_value": 10}'),
('Movement Enthusiast', '🏃', 'Complete 10 movement activities', '{"type": "category_activities", "category": "movement", "target_value": 10}'),
('Sensory Seeker', '👂', 'Complete 10 sensory activities', '{"type": "category_activities", "category": "sensory", "target_value": 10}'),
('Chat Companion', '💬', 'Have 5 conversations with the AI companion', '{"type": "chat_sessions", "target_value": 5}'),
('Progress Champion', '📈', 'Show improvement in mood patterns over 30 days', '{"type": "mood_improvement", "time_period": 30}');

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated;
GRANT ALL ON ALL FUNCTIONS IN SCHEMA public TO anon, authenticated;