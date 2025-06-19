import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { getAvailableGames } from '@/lib/gameManager';
import { Link } from 'react-router-dom';
import { RotateCcw, Play, ArrowRight } from 'lucide-react';

const Games = () => {
  const availableGames = getAvailableGames();

  const getGameEmoji = (gameId: string) => {
    const game = availableGames.find(g => g.id === gameId);
    return game?.emoji || '🎮';
  };

  const getGameColor = (gameId: string) => {
    const game = availableGames.find(g => g.id === gameId);
    return game?.colors || 'from-gray-500/10 to-gray-600/10 border-gray-200';
  };

  const hasSavedGame = (gameId: string) => {
    return sessionStorage.getItem(`${gameId}Game`) !== null;
  };

  const handleRestartGame = (gameId: string, e: React.MouseEvent) => {
    e.preventDefault();
    sessionStorage.removeItem(`${gameId}Game`);
    window.location.href = `/games/${gameId}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center my-8">
          <h1 className="text-3xl font-bold mb-4">🎮 Games</h1>
          <p className="text-muted-foreground text-lg">
            Learn through fun, interactive games!
          </p>
        </div>

        {/* Games Grid */}
        <h2 className='text-2xl font-bold mb-4'>
          Life Simulation Games
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {availableGames.map((game) => {
            const savedGame = hasSavedGame(game.id);
            return (
              <Card 
                key={game.id}
                className={`transition-all duration-200 hover:shadow-lg bg-gradient-to-br ${getGameColor(game.id)}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{getGameEmoji(game.id)}</span>
                    <CardTitle className="text-xl">{game.name}</CardTitle>
                  </div>
                  <CardDescription className="text-sm">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>Starting Money:</span>
                      <span className="font-medium">${game.initialGameState.money.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Scenarios:</span>
                      <span className="font-medium">{game.scenarios.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Win Target:</span>
                      <span className="font-medium">${game.winConditions.money.toLocaleString()}</span>
                    </div>
                    <div className="pt-2 space-y-2">
                      {savedGame ? (
                        <>
                          <Link to={`/games/${game.id}`}>
                            <Button className="w-full" variant="default">
                              <Play className="w-4 h-4 mr-2" />
                              Continue Game
                            </Button>
                          </Link>
                          <Button 
                            className="w-full" 
                            variant="outline"
                            onClick={(e) => handleRestartGame(game.id, e)}
                          >
                            <RotateCcw className="w-4 h-4 mr-2" />
                            Start Fresh
                          </Button>
                        </>
                      ) : (
                        <Link to={`/games/${game.id}`}>
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
          <h2 className="text-2xl font-bold mb-6">More Games Coming Soon</h2>
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