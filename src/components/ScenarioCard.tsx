import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scenario, Decision } from '@/types/game';
import { ScenarioOptionCard } from '@/components/ScenarioOptionCard';

interface ScenarioCardProps {
  scenario: Scenario;
  onDecision: (decision: Decision) => void;
  timeUnit: number;
  timeUnitType: string;
}

export const ScenarioCard = ({ scenario, onDecision, timeUnit, timeUnitType }: ScenarioCardProps) => {
  const handleDecision = (decision: Decision) => {
    onDecision(decision);
  };

  const handleContinue = () => {
    // For status scenarios with no decisions, create a dummy decision with no effects
    const dummyDecision: Decision = {
      text: "Continue",
      description: "Continue to the next scenario",
      effects: {}
    };
    onDecision(dummyDecision);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">
          {timeUnitType} {timeUnit} • {scenario.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-base text-muted-foreground leading-relaxed mb-6">
          {scenario.description}
        </div>
        <div className="space-y-3">
          {scenario.decisions.length > 0 ? (
            scenario.decisions.map((decision, index) => (
              <ScenarioOptionCard
                key={index}
                decision={decision}
                onDecision={handleDecision}
              />
            ))
          ) : (
            <Button 
              onClick={handleContinue}
              className="w-full"
              size="lg"
            >
              Continue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};