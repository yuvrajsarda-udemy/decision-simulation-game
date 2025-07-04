import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Decision } from '@/types/game';
import { ArrowUp, ArrowDown, Banknote, Heart } from 'lucide-react';

interface ScenarioOptionCardProps {
  decision: Decision;
  onDecision: (decision: Decision) => void;
}

export const ScenarioOptionCard = ({ decision, onDecision }: ScenarioOptionCardProps) => {
  const getEffectIcon = (type: string, value: number) => {
    const isPositive = value > 0;
    const iconClass = `w-4 h-4 ${isPositive ? 'text-primary' : 'text-destructive'}`;
    
    switch (type) {
      case 'money':
        return <Banknote className={iconClass} />;
      case 'health':
      case 'teamMorale':
        return <Heart className={iconClass} />;
      case 'stress':
        return isPositive ? <ArrowUp className="w-4 h-4 text-destructive" /> : <ArrowDown className="w-4 h-4 text-primary" />;
      case 'productQuality':
        return isPositive ? <ArrowUp className={iconClass} /> : <ArrowDown className={iconClass} />;
      default:
        return null;
    }
  };

  const formatEffect = (type: string, value: number) => {
    if (type === 'money') {
      return value > 0 ? `+$${value}` : `-$${Math.abs(value)}`;
    }
    return value > 0 ? `+${value}` : `${value}`;
  };

  const handleDecision = () => {
    setTimeout(() => {
      onDecision(decision);
    }, 100);
  };

  return (
    <Button
      variant="outline"
      className="w-full p-4 h-auto text-left justify-start hover:bg-accent hover:border-primary/50"
      onClick={handleDecision}
    >
      <div className="w-full">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="font-medium mb-2 break-words whitespace-normal">{decision.text}</div>
            <div className="text-sm text-muted-foreground mb-3 break-words whitespace-normal overflow-hidden">
              {decision.description}
            </div>
            <div className="flex flex-wrap gap-2">
              {Object.entries(decision.effects).map(([type, value]) => (
                value !== 0 && (
                  <Badge 
                    key={type} 
                    variant="secondary" 
                    className="flex items-center gap-1 whitespace-nowrap"
                  >
                    {getEffectIcon(type, value)}
                    <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                    <span>{formatEffect(type, value)}</span>
                  </Badge>
                )
              ))}
            </div>
          </div>
        </div>
      </div>
    </Button>
  );
}; 