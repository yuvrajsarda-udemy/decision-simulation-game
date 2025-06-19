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
    <Card className="p-3 mb-4">
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Money</div>
          <div className="font-bold">{formatMoney(gameState.money)}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Users</div>
          <div className="font-bold">{gameState.users.toLocaleString()}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Health</div>
          <div className={`font-bold ${getStatColor(gameState.health)}`}>{gameState.health}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Mental Peace</div>
          <div className={`font-bold ${getStatColor(gameState.mentalPeace)}`}>{gameState.mentalPeace}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Team Morale</div>
          <div className={`font-bold ${getStatColor(gameState.teamMorale)}`}>{gameState.teamMorale}%</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-muted-foreground">Product Quality</div>
          <div className={`font-bold ${getStatColor(gameState.productQuality)}`}>{gameState.productQuality}%</div>
        </div>
      </div>
    </Card>
  );
};