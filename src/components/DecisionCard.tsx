import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Scenario, Decision } from '@/types/game';
import { ArrowUp, ArrowDown, Banknote, Heart, Check } from 'lucide-react';

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
    }, 800);
  };

  const getButtonVariant = (decision: Decision) => {
    if (selectedDecision === null) {
      return "outline";
    }
    if (selectedDecision === decision) {
      return "selected";
    }
    return "ghost";
  };

  const getButtonClassName = (decision: Decision) => {
    const baseClasses = "w-full p-4 h-auto text-left justify-start transition-all duration-300 ease-in-out";
    
    if (selectedDecision === null) {
      return `${baseClasses} hover:bg-accent hover:border-primary/50 hover:shadow-sm`;
    }
    
    if (selectedDecision === decision) {
      return `${baseClasses} shadow-lg scale-[1.02]`;
    }
    
    return `${baseClasses} opacity-60 hover:opacity-80`;
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
              variant={getButtonVariant(decision)}
              className={getButtonClassName(decision)}
              onClick={() => handleDecision(decision)}
              disabled={selectedDecision !== null}
            >
              <div className="w-full">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
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
                            className="flex items-center gap-1 transition-colors duration-200"
                          >
                            {getEffectIcon(type, value)}
                            <span className="capitalize">{type.replace(/([A-Z])/g, ' $1').trim()}</span>
                            <span>{formatEffect(type, value)}</span>
                          </Badge>
                        )
                      ))}
                    </div>
                  </div>
                  {selectedDecision === decision && (
                    <div className="ml-3 flex-shrink-0">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
                        <Check className="w-4 h-4 text-primary" />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Button>
          ))}
        </div>
        
        {selectedDecision && (
          <div className="mt-4 p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20 animate-in fade-in duration-300">
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
              <p className="text-sm text-center font-medium">Processing your decision...</p>
              <div className="w-2 h-2 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};