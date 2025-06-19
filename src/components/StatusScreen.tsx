import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';

interface StatusScreenProps {
  gameState: GameState;
  onContinue: () => void;
}

export const StatusScreen = ({ gameState, onContinue }: StatusScreenProps) => {
  const getStatusMessage = () => {
    if (gameState.users > 500) return "🚀 Your user base is growing rapidly!";
    if (gameState.money > 50000) return "💰 Funding situation is looking good.";
    if (gameState.productQuality > 80) return "⭐ Your product quality is excellent!";
    if (gameState.teamMorale > 80) return "😊 Team morale is at an all-time high.";
    return "📊 Things are progressing steadily.";
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>📈 Status Update</CardTitle>
        <CardDescription>{getStatusMessage()}</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={onContinue} className="w-full">
          Continue
        </Button>
      </CardContent>
    </Card>
  );
};