import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAvailableScenarios, setCurrentScenario } from '@/data/scenarioManager';
import { ScenarioConfig } from '@/data/fitflow';

interface ScenarioSelectorProps {
  onScenarioSelect: () => void;
}

export const ScenarioSelector = ({ onScenarioSelect }: ScenarioSelectorProps) => {
  const [selectedScenario, setSelectedScenario] = useState<string>('fitflow');
  const availableScenarios = getAvailableScenarios();

  const handleScenarioSelect = (scenarioId: string) => {
    setSelectedScenario(scenarioId);
  };

  const handleStartGame = () => {
    setCurrentScenario(selectedScenario);
    onScenarioSelect();
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-4">Choose Your Adventure</h1>
        <p className="text-muted-foreground text-lg">
          Select a scenario to begin your decision-making journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {availableScenarios.map((scenario) => (
          <Card 
            key={scenario.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedScenario === scenario.id 
                ? 'ring-2 ring-primary border-primary' 
                : 'hover:border-primary/50'
            }`}
            onClick={() => handleScenarioSelect(scenario.id)}
          >
            <CardHeader>
              <CardTitle className="text-xl">{scenario.name}</CardTitle>
              <CardDescription className="text-sm">
                {scenario.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Starting Money:</span>
                  <span className="font-medium">${scenario.initialGameState.money.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Scenarios:</span>
                  <span className="font-medium">{scenario.scenarios.length}</span>
                </div>
                <div className="flex justify-between">
                  <span>Win Target:</span>
                  <span className="font-medium">${scenario.winConditions.money.toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Button 
          size="lg" 
          onClick={handleStartGame}
          className="px-8 py-3 text-lg"
        >
          Start {availableScenarios.find(s => s.id === selectedScenario)?.name}
        </Button>
      </div>
    </div>
  );
}; 