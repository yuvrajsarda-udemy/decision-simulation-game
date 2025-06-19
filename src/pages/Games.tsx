import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAvailableScenarios } from '@/lib/scenarioManager';
import { Link } from 'react-router-dom';
import { RotateCcw, Play, ArrowRight } from 'lucide-react';

const Games = () => {
  const availableScenarios = getAvailableScenarios();

  const getScenarioEmoji = (scenarioId: string) => {
    switch (scenarioId) {
      case 'fitflow':
        return '🏃‍♀️';
      case 'restaurant':
        return '🍽️';
      default:
        return '🎮';
    }
  };

  const getScenarioColor = (scenarioId: string) => {
    switch (scenarioId) {
      case 'fitflow':
        return 'from-blue-500/10 to-purple-500/10 border-blue-200';
      case 'restaurant':
        return 'from-orange-500/10 to-red-500/10 border-orange-200';
      default:
        return 'from-gray-500/10 to-gray-600/10 border-gray-200';
    }
  };

  const hasSavedGame = (scenarioId: string) => {
    return sessionStorage.getItem(`${scenarioId}Game`) !== null;
  };

  const handleRestartGame = (scenarioId: string, e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem(`${scenarioId}Game`);
    window.location.href = `/games/${scenarioId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">🎮 Decision Games</h1>
          <p className="text-muted-foreground text-lg">
            Choose your adventure and test your decision-making skills
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableScenarios.map((scenario) => {
            const savedGame = hasSavedGame(scenario.id);
            return (
              <Card 
                key={scenario.id}
                className={`transition-all duration-200 hover:shadow-lg bg-gradient-to-br ${getScenarioColor(scenario.id)}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getScenarioEmoji(scenario.id)}</span>
                    <div>
                      <CardTitle className="text-xl">{scenario.name}</CardTitle>
                      <CardDescription className="text-sm">
                        {scenario.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
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
                    <div className="pt-2 space-y-2">
                      {savedGame ? (
                        <>
                          <Link to={`/games/${scenario.id}`}>
                            <Button className="w-full" variant="default">
                              <Play className="w-4 h-4 mr-2" />
                              Continue Game
                            </Button>
                          </Link>
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={(e) => handleRestartGame(scenario.id, e)}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Start Fresh
                          </Button>
                        </>
                      ) : (
                        <Link to={`/games/${scenario.id}`}>
                          <Button className="w-full" variant="default">
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Start Game
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">More Games Coming Soon</h2>
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="text-lg">🚀 Tech Startup</CardTitle>
                <CardDescription>Build the next unicorn</CardDescription>
              </CardHeader>
            </Card>
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="text-lg">🏥 Hospital Management</CardTitle>
                <CardDescription>Run a healthcare facility</CardDescription>
              </CardHeader>
            </Card>
            <Card className="opacity-50">
              <CardHeader>
                <CardTitle className="text-lg">🏫 School Principal</CardTitle>
                <CardDescription>Lead an educational institution</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Games; 