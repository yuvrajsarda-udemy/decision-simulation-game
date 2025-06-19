import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';

interface SummaryScreenProps {
  gameState: GameState;
  onContinue: () => void;
}

export const SummaryScreen = ({ gameState, onContinue }: SummaryScreenProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>📊 Monthly Summary</CardTitle>
        <CardDescription>Here's how your fitness app performed this month</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>💰 Money: ${gameState.money.toLocaleString()}</div>
          <div>👥 Users: {gameState.users.toLocaleString()}</div>
          <div>❤️ Health: {gameState.health}%</div>
          <div>🧘 Mental Peace: {gameState.mentalPeace}%</div>
        </div>
        <Button onClick={onContinue} className="w-full">
          Continue to Next Month
        </Button>
      </CardContent>
    </Card>
  );
};