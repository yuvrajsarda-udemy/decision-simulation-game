import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Game } from '@/types/game';

interface WelcomeScreenProps {
  onStart: () => void;
  gameConfig: Game;
}

export const WelcomeScreen = ({ onStart, gameConfig }: WelcomeScreenProps) => {
  const getGameEmoji = (gameId: string) => {
    return gameConfig.emoji || '🎮';
  };

  const getGameDescription = (gameId: string) => {
    return {
      vision: gameConfig.vision,
      mission: gameConfig.mission,
      goal: gameConfig.goal(gameConfig.winConditions.money, gameConfig.winConditions.productQuality)
    };
  };

  const description = getGameDescription(gameConfig.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getGameEmoji(gameConfig.id)}</div>
          <CardTitle className="text-3xl mb-2">{gameConfig.name}</CardTitle>
          <CardDescription className="text-lg">{gameConfig.description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-lg mb-2">🎯 Your Vision</h3>
              <p className="text-muted-foreground">{description.vision}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">⚡ Your Mission</h3>
              <p className="text-muted-foreground">{description.mission}</p>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">🏆 Your Goal</h3>
              <p className="text-muted-foreground">{description.goal}</p>
            </div>
          </div>
          
          <div className="pt-4">
            <Button 
              onClick={onStart} 
              className="w-full text-lg py-6"
              size="lg"
            >
              Start Your Journey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
