import React, { useState } from 'react';
import NavigationLayout from '../../components/navigation/NavigationLayout';
import Breadcrumbs from '../../components/navigation/Breadcrumbs';
import Icon from '../../components/AppIcon';
import ActivityCard from './components/ActivityCard';
import BreathingExercise from './components/BreathingExercise';
import CategoryFilter from './components/CategoryFilter';
import ProgressTracker from './components/ProgressTracker';
import EmotionSelector from './components/EmotionSelector';
import VideoPlayer from './components/VideoPlayer';

const CalmingActivitiesHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [completedActivities, setCompletedActivities] = useState([]);
  const [activeExercise, setActiveExercise] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const emotions = [
  { id: 'anxious', name: 'Anxious', emoji: '😰' },
  { id: 'sad', name: 'Sad', emoji: '😔' },
  { id: 'frustrated', name: 'Frustrated', emoji: '😡' },
  { id: 'overwhelmed', name: 'Overwhelmed', emoji: '😵' },
  { id: 'calm', name: 'Calm', emoji: '😌' }];


  const categories = [
  { id: 'breathing', name: 'Breathing', emoji: '🌬️' },
  { id: 'movement', name: 'Movement', emoji: '🧘' },
  { id: 'creative', name: 'Creative', emoji: '🎨' },
  { id: 'sensory', name: 'Sensory', emoji: '🎵' },
  { id: 'mindfulness', name: 'Mindfulness', emoji: '🧠' }];


  const activities = [
  {
    id: 1,
    title: "Deep Breathing",
    description: "Calm your mind with simple breathing exercises that help reduce anxiety and stress",
    category: "breathing",
    emoji: "🌬️",
    difficulty: "easy",
    duration: "5 min",
    emotions: ["anxious", "overwhelmed"],
    completions: 1247,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_19c5e7dc7-1768252373725.png",
    imageAlt: "Peaceful woman with closed eyes practicing deep breathing meditation in serene outdoor setting with soft natural lighting",
    type: "breathing",
    cycles: 5
  },
  {
    id: 2,
    title: "Gentle Stretching",
    description: "Easy stretches to release tension from your body and feel more relaxed",
    category: "movement",
    emoji: "🧘",
    difficulty: "easy",
    duration: "10 min",
    emotions: ["frustrated", "overwhelmed"],
    completions: 892,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_106c913e1-1767838378128.png",
    imageAlt: "Young woman in comfortable athletic wear performing gentle stretching exercises on yoga mat in bright minimalist room",
    type: "video"
  },
  {
    id: 3,
    title: "Color Therapy",
    description: "Choose colors that make you feel good and create beautiful patterns",
    category: "creative",
    emoji: "🎨",
    difficulty: "easy",
    duration: "15 min",
    emotions: ["sad", "anxious"],
    completions: 1534,
    image: "https://images.unsplash.com/photo-1526228916456-0eeb2181b013",
    imageAlt: "Colorful art supplies including vibrant markers, colored pencils, and paint tubes arranged on white desk with blank paper",
    type: "activity"
  },
  {
    id: 4,
    title: "Nature Sounds",
    description: "Listen to calming sounds from nature like rain, ocean waves, or forest birds",
    category: "sensory",
    emoji: "🎵",
    difficulty: "easy",
    duration: "20 min",
    emotions: ["anxious", "overwhelmed", "frustrated"],
    completions: 2103,
    image: "https://images.unsplash.com/photo-1628337467896-62ed918deedb",
    imageAlt: "Person wearing comfortable headphones with closed eyes relaxing peacefully while listening to calming nature sounds",
    type: "video"
  },
  {
    id: 5,
    title: "Body Scan",
    description: "Notice how different parts of your body feel and release any tension",
    category: "mindfulness",
    emoji: "🧠",
    difficulty: "medium",
    duration: "12 min",
    emotions: ["anxious", "overwhelmed"],
    completions: 756,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_176fb52c6-1767679560960.png",
    imageAlt: "Serene person lying down in comfortable position on soft mat practicing mindful body scan meditation with peaceful expression",
    type: "breathing",
    cycles: 4
  },
  {
    id: 6,
    title: "Happy Dance",
    description: "Move your body to fun music and let yourself feel joy",
    category: "movement",
    emoji: "💃",
    difficulty: "easy",
    duration: "8 min",
    emotions: ["sad", "frustrated"],
    completions: 1876,
    image: "https://images.unsplash.com/photo-1667243788380-316845681cce",
    imageAlt: "Joyful person dancing freely with arms raised in bright room with natural sunlight streaming through windows",
    type: "video"
  },
  {
    id: 7,
    title: "Gratitude Journal",
    description: "Write or draw three things that made you smile today",
    category: "creative",
    emoji: "📝",
    difficulty: "easy",
    duration: "10 min",
    emotions: ["sad", "calm"],
    completions: 1342,
    image: "https://images.unsplash.com/photo-1731667380029-79e1853c96b0",
    imageAlt: "Open gratitude journal with handwritten entries and colorful pen on wooden desk with warm morning light",
    type: "activity"
  },
  {
    id: 8,
    title: "Bubble Breathing",
    description: "Imagine blowing bubbles as you breathe out slowly and gently",
    category: "breathing",
    emoji: "🫧",
    difficulty: "easy",
    duration: "6 min",
    emotions: ["anxious", "frustrated"],
    completions: 2456,
    image: "https://images.unsplash.com/photo-1618085249444-1b2342b7917b",
    imageAlt: "Child blowing colorful soap bubbles outdoors with peaceful focused expression demonstrating breathing exercise technique",
    type: "breathing",
    cycles: 6
  },
  {
    id: 9,
    title: "Texture Touch",
    description: "Feel different textures like soft fabric, smooth stones, or fuzzy toys",
    category: "sensory",
    emoji: "✋",
    difficulty: "easy",
    duration: "7 min",
    emotions: ["anxious", "overwhelmed"],
    completions: 987,
    image: "https://images.unsplash.com/photo-1661010222198-d2aab7bad689",
    imageAlt: "Hands gently touching various textured materials including soft fabric, smooth stones, and natural elements for sensory therapy",
    type: "activity"
  },
  {
    id: 10,
    title: "Progressive Relaxation",
    description: "Tense and relax different muscle groups to release physical stress",
    category: "mindfulness",
    emoji: "💆",
    difficulty: "medium",
    duration: "15 min",
    emotions: ["frustrated", "overwhelmed"],
    completions: 634,
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_199e60576-1767666567880.png",
    imageAlt: "Person lying comfortably on massage table in peaceful spa setting practicing progressive muscle relaxation technique",
    type: "breathing",
    cycles: 3
  },
  {
    id: 11,
    title: "Guided Imagery",
    description: "Imagine yourself in a peaceful place like a beach or garden",
    category: "mindfulness",
    emoji: "🏖️",
    difficulty: "medium",
    duration: "10 min",
    emotions: ["anxious", "sad", "overwhelmed"],
    completions: 1123,
    image: "https://images.unsplash.com/photo-1427029435139-bc50d22c9745",
    imageAlt: "Tranquil tropical beach scene with crystal clear turquoise water, white sand, and palm trees swaying in gentle breeze",
    type: "video"
  },
  {
    id: 12,
    title: "Silly Faces",
    description: "Make funny faces in the mirror and let yourself laugh",
    category: "movement",
    emoji: "😜",
    difficulty: "easy",
    duration: "5 min",
    emotions: ["sad", "frustrated"],
    completions: 2789,
    image: "https://images.unsplash.com/photo-1639931681201-9fe540cf1a6b",
    imageAlt: "Happy person making playful silly faces in mirror with genuine smile showing joy and lighthearted mood",
    type: "activity"
  }];


  const filteredActivities = activities?.filter((activity) => {
    const categoryMatch = selectedCategory === 'all' || activity?.category === selectedCategory;
    const emotionMatch = !selectedEmotion || activity?.emotions?.includes(selectedEmotion);
    return categoryMatch && emotionMatch;
  });

  const handleStartActivity = (activity) => {
    if (activity?.type === 'breathing') {
      setActiveExercise(activity);
    } else if (activity?.type === 'video') {
      setActiveVideo(activity);
    } else {
      // For regular activities, mark as started
      if (!completedActivities?.includes(activity?.id)) {
        // In production, this would start the actual activity
        console.log(`Starting ${activity?.title}`);
      }
    }
  };

  const handleCompleteActivity = (activity) => {
    if (!completedActivities?.includes(activity?.id)) {
      setCompletedActivities([...completedActivities, activity?.id]);
    }
  };

  const totalActivities = activities?.length;
  const todayCompleted = completedActivities?.length;
  const weeklyGoal = 5;

  return (
    <NavigationLayout>
      <div className="min-h-screen bg-background">
        <Breadcrumbs />

        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-4xl md:text-5xl lg:text-6xl" role="img" aria-label="Calming Activities">
              🧘
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Calming Activities
            </h1>
          </div>
          <p className="text-base md:text-lg text-muted-foreground">
            Choose activities that help you feel calm, happy, and peaceful
          </p>
        </div>

        <ProgressTracker
          completedActivities={todayCompleted}
          totalActivities={totalActivities}
          todayCompleted={todayCompleted}
          weeklyGoal={weeklyGoal} />


        <EmotionSelector
          emotions={emotions}
          selectedEmotion={selectedEmotion}
          onSelectEmotion={setSelectedEmotion} />


        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory} />


        {filteredActivities?.length === 0 ?
        <div className="bg-card rounded-2xl shadow-md p-8 md:p-12 text-center">
            <span className="text-6xl md:text-7xl lg:text-8xl mb-4 block" role="img" aria-label="No activities">
              🔍
            </span>
            <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
              No activities found
            </h3>
            <p className="text-sm md:text-base text-muted-foreground mb-6">
              Try selecting a different category or emotion
            </p>
            <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedEmotion(null);
            }}
            className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-300">

              Show All Activities
            </button>
          </div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {filteredActivities?.map((activity) =>
          <ActivityCard
            key={activity?.id}
            activity={activity}
            onStart={handleStartActivity}
            onComplete={handleCompleteActivity}
            isCompleted={completedActivities?.includes(activity?.id)} />

          )}
          </div>
        }

        {activeExercise &&
        <BreathingExercise
          exercise={activeExercise}
          onComplete={handleCompleteActivity}
          onClose={() => setActiveExercise(null)} />

        }

        {activeVideo &&
        <VideoPlayer
          video={activeVideo}
          onComplete={handleCompleteActivity}
          onClose={() => setActiveVideo(null)} />

        }

        <div className="mt-8 md:mt-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl shadow-md p-6 md:p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Icon name="Heart" size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="text-lg md:text-xl font-bold text-foreground mb-2">
                Need Help Choosing?
              </h3>
              <p className="text-sm md:text-base text-muted-foreground mb-4">
                Our AI companion can suggest activities based on how you're feeling right now. Just tell us your mood and we'll help you find the perfect activity!
              </p>
              <button
                onClick={() => window.location.href = '/ai-companion-chat'}
                className="px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-all duration-300 flex items-center gap-2">

                <Icon name="MessageCircle" size={20} />
                <span>Talk to AI Companion</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </NavigationLayout>);

};

export default CalmingActivitiesHub;