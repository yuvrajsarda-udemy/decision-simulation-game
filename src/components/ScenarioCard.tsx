import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Scenario, Decision } from '@/types/game';
import { ScenarioOptionCard } from '@/components/ScenarioOptionCard';

interface ScenarioCardProps {
  scenario: Scenario;
  onDecision: (decision: Decision) => void;
  weekNumber: number;
}

export const ScenarioCard = ({ scenario, onDecision, weekNumber }: ScenarioCardProps) => {
  const handleDecision = (decision: Decision) => {
    onDecision(decision);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl sm:text-2xl font-bold">
          Week {weekNumber} • {scenario.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-base text-muted-foreground leading-relaxed mb-6">
          {scenario.description}
        </div>
        <div className="space-y-3">
          {scenario.decisions.map((decision, index) => (
            <ScenarioOptionCard
              key={index}
              decision={decision}
              onDecision={handleDecision}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};