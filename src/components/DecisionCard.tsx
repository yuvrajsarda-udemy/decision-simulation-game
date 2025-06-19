import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scenario, Decision } from '@/types/game';
import { ArrowUp, ArrowDown, Banknote, Heart } from 'lucide-react';

interface DecisionCardProps {
  scenario: Scenario;
  onDecision: (decision: Decision) => void;
}

export const DecisionCard = ({ scenario, onDecision }: DecisionCardProps) => {
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null);

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

  const handleDecision = (decision: Decision) => {
    setSelectedDecision(decision);
    // Add a small delay for visual feedback
    setTimeout(() => {
      onDecision(decision);
      setSelectedDecision(null);
    }, 500);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">{scenario.title}</CardTitle>
        <CardDescription className="text-base leading-relaxed">
          {scenario.description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {scenario.decisions.map((decision, index) => (
            <Button
              key={index}
              variant={selectedDecision === decision ? "default" : "outline"}
              className="w-full p-4 h-auto text-left justify-start"
              onClick={() => handleDecision(decision)}
              disabled={selectedDecision !== null}
            >
              <div className="w-full">
                <div className="font-medium mb-2 break-words">{decision.text}</div>
                <div className="text-sm text-muted-foreground mb-3 break-words">
                  {decision.description}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(decision.effects).map(([type, value]) => (
                    value !== 0 && (
                      <Badge 
                        key={type} 
                        variant="secondary" 
                        className="flex items-center gap-1"
                      >
                        {getEffectIcon(type, value)}
                        <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                        <span>{formatEffect(type, value)}</span>
                      </Badge>
                    )
                  ))}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {selectedDecision && (
          <div className="mt-4 p-3 bg-primary/10 rounded-md">
            <p className="text-sm text-center">Making decision...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};