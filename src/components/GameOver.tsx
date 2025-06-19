import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GameState } from '@/types/game';
import { Banknote, Heart, ArrowUp } from 'lucide-react';

interface GameOverProps {
  endReason: string;
  finalStats: GameState;
  onRestart: () => void;
}

export const GameOver = ({ endReason, finalStats, onRestart }: GameOverProps) => {
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
    const stressScore = 100 - finalStats.stress;
    const moraleScore = finalStats.teamMorale;
    const qualityScore = finalStats.productQuality;
    
    return Math.round((moneyScore + healthScore + stressScore + moraleScore + qualityScore) / 5);
  };

  const getScoreRating = (score: number) => {
    if (score >= 90) return { text: 'Legendary Founder', color: 'text-primary' };
    if (score >= 80) return { text: 'Successful CEO', color: 'text-primary' };
    if (score >= 70) return { text: 'Good Leader', color: 'text-foreground' };
    if (score >= 60) return { text: 'Average Manager', color: 'text-muted-foreground' };
    return { text: 'Struggling Entrepreneur', color: 'text-destructive' };
  };

  const score = getScore();
  const rating = getScoreRating(score);

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
              <span>Stress: {finalStats.stress}%</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Team: {finalStats.teamMorale}%</span>
            </div>
            <div className="flex items-center gap-2 col-span-2">
              <ArrowUp className="w-4 h-4" />
              <span>Product Quality: {finalStats.productQuality}%</span>
            </div>
          </div>
        </div>

        <Button 
          onClick={onRestart} 
          className="w-full"
          size="lg"
        >
          Start New Company
        </Button>
      </CardContent>
    </Card>
  );
};