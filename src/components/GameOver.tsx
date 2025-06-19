import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState, Game } from '@/types/game';
import { Banknote, Heart, ArrowUp } from 'lucide-react';

interface GameOverProps {
  endReason: string;
  finalStats: GameState;
  onRestart: () => void;
  gameConfig: Game;
}

export const GameOver = ({ endReason, finalStats, onRestart, gameConfig }: GameOverProps) => {
  const isSuccess = endReason.includes('Congratulations');
  
  const formatMoney = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getScore = () => {
    const moneyScore = Math.min(finalStats.money / 10000, 100);
    const healthScore = finalStats.health;
    const mentalPeaceScore = finalStats.mentalPeace;
    const moraleScore = finalStats.teamMorale;
    const qualityScore = finalStats.productQuality;
    const usersScore = Math.min(finalStats.users / 100, 100);
    
    return Math.round((moneyScore + healthScore + mentalPeaceScore + moraleScore + qualityScore + usersScore) / 6);
  };

  const getScoreRating = (score: number, gameId: string) => {
    if (gameId === 'fitflow') {
      if (score >= 90) return { text: 'Legendary Founder', color: 'text-primary' };
      if (score >= 80) return { text: 'Successful CEO', color: 'text-primary' };
      if (score >= 70) return { text: 'Good Leader', color: 'text-foreground' };
      if (score >= 60) return { text: 'Average Manager', color: 'text-muted-foreground' };
      return { text: 'Struggling Entrepreneur', color: 'text-destructive' };
    } else if (gameId === 'restaurant') {
      if (score >= 90) return { text: 'Master Chef', color: 'text-primary' };
      if (score >= 80) return { text: 'Successful Restaurateur', color: 'text-primary' };
      if (score >= 70) return { text: 'Good Owner', color: 'text-foreground' };
      if (score >= 60) return { text: 'Average Manager', color: 'text-muted-foreground' };
      return { text: 'Struggling Owner', color: 'text-destructive' };
    } else {
      if (score >= 90) return { text: 'Legendary Leader', color: 'text-primary' };
      if (score >= 80) return { text: 'Successful Manager', color: 'text-primary' };
      if (score >= 70) return { text: 'Good Leader', color: 'text-foreground' };
      if (score >= 60) return { text: 'Average Manager', color: 'text-muted-foreground' };
      return { text: 'Struggling Entrepreneur', color: 'text-destructive' };
    }
  };

  const getRestartButtonText = (gameId: string) => {
    switch (gameId) {
      case 'fitflow':
        return 'Start New Company';
      case 'restaurant':
        return 'Open New Restaurant';
      default:
        return 'Start New Journey';
    }
  };

  const score = getScore();
  const rating = getScoreRating(score, gameConfig.id);

  return (
    <Card className={`border-2 ${isSuccess ? 'border-primary' : 'border-destructive'}`}>
      <CardHeader className="text-center">
        <CardTitle className={`text-2xl ${isSuccess ? 'text-primary' : 'text-destructive'}`}>
          {isSuccess ? '🎉 Success!' : '💔 Game Over'}
        </CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {endReason}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-3xl font-bold mb-2">Day {finalStats.day}</div>
          <div className="text-lg mb-4">
            Final Score: <span className={`font-bold ${rating.color}`}>{score}</span>
          </div>
          <div className={`text-sm font-medium ${rating.color}`}>
            {rating.text}
          </div>
        </div>

        <div className="bg-muted/50 rounded-lg p-4 space-y-3">
          <h3 className="font-semibold text-center mb-3">Final Stats</h3>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Banknote className="w-4 h-4" />
              <span>Money: {formatMoney(finalStats.money)}</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Health: {finalStats.health}%</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              <span>Mental Peace: {finalStats.mentalPeace}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Team: {finalStats.teamMorale}%</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              <span>Product Quality: {finalStats.productQuality}%</span>
            </div>
            <div className="flex items-center gap-2">
              <ArrowUp className="w-4 h-4" />
              <span>Users: {finalStats.users.toLocaleString()}</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={onRestart} 
          className="w-full"
          size="lg"
        >
          {getRestartButtonText(gameConfig.id)}
        </Button>
      </CardContent>
    </Card>
  );
};