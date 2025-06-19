import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScenarioConfig } from '@/types/game';

interface WelcomeScreenProps {
  onStart: () => void;
  scenarioConfig: ScenarioConfig;
}

export const WelcomeScreen = ({ onStart, scenarioConfig }: WelcomeScreenProps) => {
  const getScenarioEmoji = (scenarioId: string) => {
    return scenarioConfig.emoji || '🎮';
  };

  const getScenarioDescription = (scenarioId: string) => {
    return {
      vision: scenarioConfig.vision,
      mission: scenarioConfig.mission,
      goal: scenarioConfig.goal(scenarioConfig.winConditions.money, scenarioConfig.winConditions.productQuality)
    };
  };

  const description = getScenarioDescription(scenarioConfig.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="text-6xl mb-4">{getScenarioEmoji(scenarioConfig.id)}</div>
          <CardTitle className="text-3xl mb-2">{scenarioConfig.name}</CardTitle>
          <CardDescription className="text-lg">{scenarioConfig.description}</CardDescription>
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
