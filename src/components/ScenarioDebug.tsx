import { GameState, Scenario } from '@/types/game';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface ScenarioDebugProps {
  gameState: GameState;
  currentScenario: Scenario;
  allScenarios: Scenario[];
}

export const ScenarioDebug = ({ gameState, currentScenario, allScenarios }: ScenarioDebugProps) => {
  if (process.env.NODE_ENV !== 'development') {
    return null; // Don't show in production
  }

  // Handle undefined values safely
  const seenCount = gameState?.seenScenarios?.length ?? 0;
  const totalScenarios = allScenarios?.length ?? 0;
  const seenPercentage = totalScenarios > 0 ? ((seenCount / totalScenarios) * 100).toFixed(1) : '0.0';

  // Ensure currentScenario exists
  if (!currentScenario) {
    return (
      <Card className="mb-4 border-red-200 bg-red-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-red-800">Debug: Error - No Current Scenario</CardTitle>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="mb-4 border-yellow-200 bg-yellow-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-yellow-800">Debug: Scenario Selection (only visible in dev mode)</CardTitle>
      </CardHeader>
      <CardContent className="text-xs text-yellow-700 space-y-1">
        <div>Current Scenario: {currentScenario.id} - {currentScenario.title}</div>
        <div>Category: {currentScenario.category || 'none'}</div>
        <div>Weight: {currentScenario.weight || 1}</div>
        <div>Seen Scenarios: {seenCount}/{totalScenarios} ({seenPercentage}%)</div>
        <div>Day: {gameState?.day ?? 0}</div>
      </CardContent>
    </Card>
  );
}; 