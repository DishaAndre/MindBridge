import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

const BreathingExercise = ({ exercise, onComplete, onClose }) => {
  const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale, complete
  const [count, setCount] = useState(0);
  const [cycles, setCycles] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const phases = {
    inhale: { duration: 4, text: 'Breathe In', color: 'bg-blue-400', emoji: '🌬️' },
    hold: { duration: 4, text: 'Hold', color: 'bg-purple-400', emoji: '⏸️' },
    exhale: { duration: 6, text: 'Breathe Out', color: 'bg-green-400', emoji: '🍃' }
  };

  useEffect(() => {
    if (!isActive || phase === 'ready' || phase === 'complete') return;

    const currentPhase = phases?.[phase];
    if (count < currentPhase?.duration) {
      const timer = setTimeout(() => setCount(count + 1), 1000);
      return () => clearTimeout(timer);
    } else {
      // Move to next phase
      if (phase === 'inhale') {
        setPhase('hold');
        setCount(0);
      } else if (phase === 'hold') {
        setPhase('exhale');
        setCount(0);
      } else if (phase === 'exhale') {
        const newCycles = cycles + 1;
        setCycles(newCycles);
        if (newCycles >= exercise?.cycles) {
          setPhase('complete');
          setIsActive(false);
        } else {
          setPhase('inhale');
          setCount(0);
        }
      }
    }
  }, [isActive, phase, count, cycles, exercise?.cycles]);

  const startExercise = () => {
    setPhase('inhale');
    setCount(0);
    setCycles(0);
    setIsActive(true);
  };

  const pauseExercise = () => {
    setIsActive(false);
  };

  const resumeExercise = () => {
    setIsActive(true);
  };

  const resetExercise = () => {
    setPhase('ready');
    setCount(0);
    setCycles(0);
    setIsActive(false);
  };

  const handleComplete = () => {
    onComplete(exercise);
    onClose();
  };

  const getCircleScale = () => {
    if (phase === 'inhale') {
      return 0.5 + (count / phases?.inhale?.duration) * 0.5;
    } else if (phase === 'exhale') {
      return 1 - (count / phases?.exhale?.duration) * 0.5;
    }
    return 1;
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-2xl p-6 md:p-8 lg:p-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <span className="text-3xl md:text-4xl" role="img" aria-label={exercise?.title}>
              {exercise?.emoji}
            </span>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground">
              {exercise?.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <p className="text-sm md:text-base text-muted-foreground mb-6 md:mb-8">
          {exercise?.description}
        </p>

        <div className="flex flex-col items-center justify-center mb-6 md:mb-8">
          {phase === 'ready' && (
            <div className="text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-primary/20 flex items-center justify-center mb-6">
                <span className="text-6xl md:text-7xl lg:text-8xl">🧘</span>
              </div>
              <p className="text-lg md:text-xl text-foreground mb-2">Ready to begin?</p>
              <p className="text-sm md:text-base text-muted-foreground">
                Complete {exercise?.cycles} breathing cycles
              </p>
            </div>
          )}

          {phase !== 'ready' && phase !== 'complete' && (
            <div className="text-center">
              <div
                className={`w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full ${phases?.[phase]?.color || 'bg-primary'} flex items-center justify-center mb-6 transition-transform duration-1000 ease-in-out`}
                style={{ transform: `scale(${getCircleScale()})` }}
              >
                <span className="text-6xl md:text-7xl lg:text-8xl">
                  {phases?.[phase]?.emoji || '🌟'}
                </span>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                {phases?.[phase]?.text}
              </p>
              <p className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-4">
                {count}
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                Cycle {cycles + 1} of {exercise?.cycles}
              </p>
            </div>
          )}

          {phase === 'complete' && (
            <div className="text-center">
              <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full bg-success/20 flex items-center justify-center mb-6 celebrate">
                <span className="text-6xl md:text-7xl lg:text-8xl">🎉</span>
              </div>
              <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2">
                Well Done!
              </p>
              <p className="text-sm md:text-base text-muted-foreground">
                You completed {exercise?.cycles} breathing cycles
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          {phase === 'ready' && (
            <Button
              variant="default"
              fullWidth
              onClick={startExercise}
              iconName="Play"
              iconPosition="left"
            >
              Start Exercise
            </Button>
          )}

          {phase !== 'ready' && phase !== 'complete' && (
            <>
              <Button
                variant={isActive ? "outline" : "default"}
                fullWidth
                onClick={isActive ? pauseExercise : resumeExercise}
                iconName={isActive ? "Pause" : "Play"}
                iconPosition="left"
              >
                {isActive ? "Pause" : "Resume"}
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={resetExercise}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Restart
              </Button>
            </>
          )}

          {phase === 'complete' && (
            <>
              <Button
                variant="success"
                fullWidth
                onClick={handleComplete}
                iconName="Check"
                iconPosition="left"
              >
                Mark Complete
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={resetExercise}
                iconName="RotateCcw"
                iconPosition="left"
              >
                Do Again
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default BreathingExercise;