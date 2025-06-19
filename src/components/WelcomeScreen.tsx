
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface WelcomeScreenProps {
  onStart: () => void;
}

export const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">🏃‍♀️ Welcome to FitFlow</CardTitle>
          <CardDescription className="text-base">
            Your Journey as a Fitness App Startup Founder
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3 text-sm">
            <p>
              <strong>The Vision:</strong> You're launching FitFlow, a revolutionary fitness app that helps people achieve their health goals through personalized workouts and nutrition tracking.
            </p>
            <p>
              <strong>Your Mission:</strong> Build a thriving fitness platform while maintaining your health, team morale, and mental peace. Every decision matters in this competitive market.
            </p>
            <p>
              <strong>The Goal:</strong> Reach $1,000,000 in revenue with a high-quality product (90%+) to achieve startup success.
            </p>
          </div>
          
          <div className="bg-primary/10 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">📊 What You'll Manage:</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>💰 Company Finances</div>
              <div>👥 User Growth</div>
              <div>❤️ Your Health</div>
              <div>🧘 Mental Peace</div>
              <div>🤝 Team Morale</div>
              <div>⭐ Product Quality</div>
            </div>
          </div>

          <div className="text-xs text-muted-foreground">
            <p>⚠️ <strong>Warning:</strong> Running out of money, losing your health, burning out, or having your entire team quit will end your startup journey.</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">🚀 Ready to Start Your Startup?</CardTitle>
          <CardDescription>
            You have $10,000 in initial funding and a small but dedicated team. The fitness app market is waiting for your innovation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onStart} className="w-full" size="lg">
            Launch FitFlow
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
