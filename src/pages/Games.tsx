import { Link } from 'react-router-dom';
import { getAvailableGames } from '@/lib/gameManager';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Choose Your Adventure</h1>
          <p className="text-xl text-muted-foreground">
            Select a simulation to start your entrepreneurial journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {availableGames.map((game) => {
            const savedGame = hasSavedGame(game.id);
            
            return (
              <Card 
                key={game.id}
                className={`transition-all duration-200 hover:shadow-lg bg-gradient-to-br ${getGameColor(game.id)}`}
              >
                <CardHeader className="text-center">
                  <span className="text-3xl">{getGameEmoji(game.id)}</span>
                  <CardTitle className="text-xl">{game.name}</CardTitle>
                  <CardDescription className="text-sm">
                    {game.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span>Starting Money:</span>
                      <span className="font-medium">${game.initialGameState.money.toLocaleString()}</span>
                    </div>
                    <div>
                      <span>Scenarios:</span>
                      <span className="font-medium">{game.scenarios.length}</span>
                    </div>
                    <div>
                      <span>Win Money:</span>
                      <span className="font-medium">${game.winConditions.money.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link to={`/games/${game.id}`} className="flex-1">
                      <Button className="w-full" variant={savedGame ? "secondary" : "default"}>
                        {savedGame ? 'Continue' : 'Start New'}
                      </Button>
                    </Link>
                    {savedGame && (
                      <Button 
                        variant="outline" 
                        size="icon"
                        onClick={(e) => handleRestartGame(game.id, e)}
                        title="Restart Game"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                      </Button>
                    )}
                  </div>
                  
                  <Link to={`/games/${game.id}`} className="block">
                    <Button variant="ghost" className="w-full text-sm">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Games; 