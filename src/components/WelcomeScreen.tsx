import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScenarioConfig } from '@/types/game';

interface WelcomeScreenProps {
  onStart: () => void;
  scenarioConfig: ScenarioConfig;
}

export const WelcomeScreen = ({ onStart, scenarioConfig }: WelcomeScreenProps) => {
  const getScenarioEmoji = (scenarioId: string) => {
    switch (scenarioId) {
      case 'fitflow':
        return '🏃‍♀️';
      case 'restaurant':
        return '🍽️';
      default:
        return '🎮';
    }
  };

  const getScenarioDescription = (scenarioId: string) => {
    switch (scenarioId) {
      case 'fitflow':
        return {
          vision: "You're launching FitFlow, a revolutionary fitness app that helps people achieve their health goals through personalized workouts and nutrition tracking.",
          mission: "Build a thriving fitness platform while maintaining your health, team morale, and mental peace. Every decision matters in this competitive market.",
          goal: `Reach $${(scenarioConfig.winConditions.money / 1000000).toFixed(1)}M in revenue with a high-quality product (${scenarioConfig.winConditions.productQuality}%+) to achieve startup success.`
        };
      case 'restaurant':
        return {
          vision: "You're opening your dream restaurant, a place where culinary excellence meets business savvy. Create memorable dining experiences while building a profitable business.",
          mission: "Build a successful restaurant empire while managing costs, staff, and customer satisfaction. Every decision affects your restaurant's reputation and profitability.",
          goal: `Reach $${(scenarioConfig.winConditions.money / 1000).toFixed(0)}K in revenue with exceptional food quality (${scenarioConfig.winConditions.productQuality}%+) to become a culinary success.`
        };
      default:
        return {
          vision: "You're embarking on an exciting business journey. Make strategic decisions to grow your venture while managing various aspects of your business.",
          mission: "Build a successful business while maintaining balance across all aspects of your operation. Every choice shapes your path to success.",
          goal: `Reach $${(scenarioConfig.winConditions.money / 1000).toFixed(0)}K in revenue with high-quality products (${scenarioConfig.winConditions.productQuality}%+) to achieve business success.`
        };
    }
  };

  const description = getScenarioDescription(scenarioConfig.id);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {getScenarioEmoji(scenarioConfig.id)} Welcome to {scenarioConfig.name}
          </CardTitle>
          <CardDescription className="text-base">
            {scenarioConfig.description}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p>
              <strong>The Vision:</strong> {description.vision}
            </p>
            <p>
              <strong>Your Mission:</strong> {description.mission}
            </p>
            <p>
              <strong>The Goal:</strong> {description.goal}
            </p>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📊 What You'll Manage:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>💰 Business Finances</div>
              <div>👥 User Growth</div>
              <div>❤️ Your Health</div>
              <div>🧘 Mental Peace</div>
              <div>🤝 Team Morale</div>
              <div>⭐ Product Quality</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>⚠️ <strong>Warning:</strong> Running out of money, losing your health, burning out, or having your entire team quit will end your journey.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🚀 Ready to Start Your Journey?</CardTitle>
          <CardDescription>
            You have ${scenarioConfig.initialGameState.money.toLocaleString()} in initial funding and a small but dedicated team. The market is waiting for your innovation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onStart} className="w-full" size="lg">
            Launch {scenarioConfig.name.split(':')[0]}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
