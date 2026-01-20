import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const VideoPlayer = ({ video, onComplete, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying && progress === 0) {
      // Simulate video progress
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsPlaying(false);
            setIsCompleted(true);
            return 100;
          }
          return prev + 2;
        });
      }, 100);
    }
  };

  const handleComplete = () => {
    onComplete(video);
    onClose();
  };

  const handleRestart = () => {
    setProgress(0);
    setIsPlaying(false);
    setIsCompleted(false);
  };

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-card rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden">
        <div className="flex items-center justify-between p-4 md:p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <span className="text-2xl md:text-3xl" role="img" aria-label={video?.title}>
              {video?.emoji}
            </span>
            <h2 className="text-lg md:text-xl lg:text-2xl font-bold text-foreground">
              {video?.title}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
          />
        </div>

        <div className="relative aspect-video bg-muted">
          <div className="absolute inset-0 flex items-center justify-center">
            {!isCompleted ? (
              <div className="text-center">
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-6xl md:text-7xl lg:text-8xl">
                    {video?.emoji}
                  </span>
                </div>
                <p className="text-base md:text-lg text-muted-foreground mb-4">
                  {video?.description}
                </p>
                {progress > 0 && (
                  <div className="w-64 md:w-80 mx-auto">
                    <div className="w-full bg-muted rounded-full h-2 overflow-hidden mb-2">
                      <div
                        className="bg-primary h-full rounded-full transition-all duration-300"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {Math.round(progress)}% complete
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center celebrate">
                <div className="w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-success/20 flex items-center justify-center mb-4 mx-auto">
                  <span className="text-6xl md:text-7xl lg:text-8xl">🎉</span>
                </div>
                <p className="text-xl md:text-2xl font-bold text-foreground mb-2">
                  Great job!
                </p>
                <p className="text-sm md:text-base text-muted-foreground">
                  You completed the video
                </p>
              </div>
            )}
          </div>

          {!isCompleted && (
            <button
              onClick={handlePlayPause}
              className="absolute inset-0 flex items-center justify-center bg-background/50 hover:bg-background/60 transition-all duration-300"
              aria-label={isPlaying ? "Pause video" : "Play video"}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300">
                <Icon name={isPlaying ? "Pause" : "Play"} size={32} />
              </div>
            </button>
          )}
        </div>

        <div className="p-4 md:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{video?.duration}</span>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            {isCompleted ? (
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
                  onClick={handleRestart}
                  iconName="RotateCcw"
                  iconPosition="left"
                >
                  Watch Again
                </Button>
              </>
            ) : (
              <Button
                variant="outline"
                fullWidth
                onClick={onClose}
              >
                Close
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;