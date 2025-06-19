import { GameState } from '@/types/game';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Banknote, Heart, ArrowUp, ArrowDown } from 'lucide-react';

interface GameStatsProps {
  gameState: GameState;
}

export const GameStats = ({ gameState }: GameStatsProps) => {
  const formatMoney = (amount: number) => {
    if (amount >= 1000000) {
      return `$${(amount / 1000000).toFixed(1)}M`;
    } else if (amount >= 1000) {
      return `$${(amount / 1000).toFixed(0)}K`;
    }
    return `$${amount}`;
  };

  const getStatColor = (value: number, reverse: boolean = false) => {
    if (reverse) {
      if (value >= 70) return 'text-destructive';
      if (value >= 40) return 'text-muted-foreground';
      return 'text-primary';
    } else {
      if (value >= 70) return 'text-primary';
      if (value >= 40) return 'text-muted-foreground';
      return 'text-destructive';
    }
  };

  return (
    <Card className="p-4 mb-6">
      <div className="space-y-4">
        {/* Money */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Banknote className="w-5 h-5 text-primary" />
            <span className="font-medium">Money</span>
          </div>
          <span className="text-lg font-bold">{formatMoney(gameState.money)}</span>
        </div>

        {/* Health */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium">Health</span>
            </div>
            <span className={`font-semibold ${getStatColor(gameState.health)}`}>
              {gameState.health}%
            </span>
          </div>
          <Progress value={gameState.health} className="h-2" />
        </div>

        {/* Stress */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-destructive" />
              <span className="font-medium">Stress</span>
            </div>
            <span className={`font-semibold ${getStatColor(gameState.stress, true)}`}>
              {gameState.stress}%
            </span>
          </div>
          <Progress value={gameState.stress} className="h-2" />
        </div>

        {/* Team Morale */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-primary" />
              <span className="font-medium">Team Morale</span>
            </div>
            <span className={`font-semibold ${getStatColor(gameState.teamMorale)}`}>
              {gameState.teamMorale}%
            </span>
          </div>
          <Progress value={gameState.teamMorale} className="h-2" />
        </div>

        {/* Product Quality */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ArrowUp className="w-5 h-5 text-primary" />
              <span className="font-medium">Product Quality</span>
            </div>
            <span className={`font-semibold ${getStatColor(gameState.productQuality)}`}>
              {gameState.productQuality}%
            </span>
          </div>
          <Progress value={gameState.productQuality} className="h-2" />
        </div>
      </div>
    </Card>
  );
};