import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameStats } from '@/components/GameStats';
import { ScenarioCard } from '@/components/ScenarioCard';
import { GameOver } from '@/components/GameOver';
import { EventScreen } from '@/components/EventScreen';
import { StatusScreen } from '@/components/StatusScreen';
import { SummaryScreen } from '@/components/SummaryScreen';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ScenarioDebug } from '@/components/ScenarioDebug';
import { gameManager, getAvailableGames } from '@/lib/gameManager';
import { ScenarioSelector } from '@/lib/scenarioSelector';
import { GameState, Decision, ScreenType } from '@/types/game';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw, XCircle } from 'lucide-react';

const Game = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  
  // Get the game config for this game
  const gameConfig = gameId ? gameManager.getGame(gameId) : null;
  
  if (!gameConfig) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Game Not Found</h1>
          <p className="text-muted-foreground mb-6">The game you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/games')}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Button>
        </div>
      </div>
    );
  }

  const [gameState, setGameState] = useState<GameState>({
    ...gameConfig.initialGameState,
    seenScenarios: [],
    scenarioHistory: []
  });
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('decision');
  const [showWelcome, setShowWelcome] = useState(true);

  // Load game state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem(`${gameConfig.id}Game`);
    if (savedState) {
      setGameState(JSON.parse(savedState));
      setShowWelcome(false);
    }
  }, [gameConfig.id]);

  // Save game state to session storage
  useEffect(() => {
    if (!showWelcome) {
      sessionStorage.setItem(`${gameConfig.id}Game`, JSON.stringify(gameState));
    }
  }, [gameState, showWelcome, gameConfig.id]);

  // Handle quitting the game
  const handleQuit = () => {
    // Clear game state from session storage
    sessionStorage.removeItem(`${gameConfig.id}Game`);
    // Navigate back to games page
    navigate('/games');
  };

  const makeDecision = (decision: Decision) => {
    const newState = { ...gameState };
    
    // Apply decision effects
    newState.money += decision.effects.money || 0;
    newState.health += decision.effects.health || 0;
    newState.mentalPeace += decision.effects.mentalPeace || 0;
    newState.teamMorale += decision.effects.teamMorale || 0;
    newState.productQuality += decision.effects.productQuality || 0;
    newState.users += decision.effects.users || 0;
    
    // Advance week
    newState.day += 1;
    
    // Track current scenario in history
    const currentScenarioId = gameConfig.scenarios[gameState.currentScenario].id;
    newState.scenarioHistory.push(currentScenarioId);
    if (!newState.seenScenarios.includes(currentScenarioId)) {
      newState.seenScenarios.push(currentScenarioId);
    }
    
    // Select next scenario using smart selection
    const nextScenario = ScenarioSelector.selectNextScenario(
      gameConfig.scenarios,
      newState,
      {
        biasTowardsUnseen: true,
        // Add some randomness based on game state
        forceRandom: Math.random() < 0.1 // 10% chance for pure random
      }
    );
    
    // Find the index of the selected scenario
    newState.currentScenario = gameConfig.scenarios.findIndex(s => s.id === nextScenario.id);
    
    // Determine next screen type
    const nextScreen = determineNextScreen(newState.day);
    setCurrentScreen(nextScreen);
    
    // Check game over conditions using game config
    const { gameOverConditions, winConditions } = gameConfig;
    
    if (newState.money <= gameOverConditions.money) {
      newState.gameOver = true;
      newState.endReason = 'Your startup ran out of money and had to shut down.';
    } else if (newState.health <= gameOverConditions.health) {
      newState.gameOver = true;
      newState.endReason = 'Your health deteriorated and you had to step down as CEO.';
    } else if (newState.mentalPeace <= gameOverConditions.mentalPeace) {
      newState.gameOver = true;
      newState.endReason = 'The stress became too much and you burned out.';
    } else if (newState.teamMorale <= gameOverConditions.teamMorale) {
      newState.gameOver = true;
      newState.endReason = 'Your entire team quit due to low morale.';
    } else if (newState.money >= winConditions.money && newState.productQuality >= winConditions.productQuality) {
      newState.gameOver = true;
      newState.endReason = `Congratulations! You successfully built ${gameConfig.name.split(':')[0]} and achieved your goals!`;
    }
    
    // Keep stats within bounds
    newState.money = Math.max(0, newState.money);
    newState.health = Math.max(0, Math.min(100, newState.health));
    newState.mentalPeace = Math.max(0, Math.min(100, newState.mentalPeace));
    newState.teamMorale = Math.max(0, Math.min(100, newState.teamMorale));
    newState.productQuality = Math.max(0, Math.min(100, newState.productQuality));
    newState.users = Math.max(0, newState.users);
    
    setGameState(newState);
  };

  const determineNextScreen = (week: number): ScreenType => {
    if (week % 4 === 0) return 'summary'; // Monthly summary
    if (week % 3 === 0) return 'event'; // Random events
    if (week % 2 === 0) return 'status'; // Status updates
    return 'decision'; // Default to decision
  };

  const restartGame = () => {
    setGameState({
      ...gameConfig.initialGameState,
      seenScenarios: [],
      scenarioHistory: []
    });
    setCurrentScreen('decision');
    setShowWelcome(true);
    sessionStorage.removeItem(`${gameConfig.id}Game`);
  };

  const handleContinue = () => {
    setCurrentScreen('decision');
  };

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleGameSelect = () => {
    const availableGames = getAvailableGames();
    const currentIndex = availableGames.findIndex(g => g.id === gameConfig.id);
    const nextIndex = (currentIndex + 1) % availableGames.length;
    const nextGame = availableGames[nextIndex];
    
    // Navigate to the next game
    navigate(`/games/${nextGame.id}`);
  };

  const currentScenario = gameConfig.scenarios[gameState.currentScenario];

  const renderCurrentScreen = () => {
    if (showWelcome) {
      return <WelcomeScreen onStart={handleStart} gameConfig={gameConfig} />;
    }

    if (gameState.gameOver) {
      return (
        <GameOver 
          endReason={gameState.endReason}
          finalStats={gameState}
          onRestart={restartGame}
          gameConfig={gameConfig}
        />
      );
    }

    switch (currentScreen) {
      case 'decision':
        return (
          <ScenarioCard 
            scenario={currentScenario}
            onDecision={makeDecision}
            weekNumber={gameState.day}
          />
        );
      case 'event':
        return <EventScreen onContinue={handleContinue} />;
      case 'status':
        return <StatusScreen gameState={gameState} onContinue={handleContinue} />;
      case 'summary':
        return <SummaryScreen gameState={gameState} onContinue={handleContinue} />;
      default:
        return (
          <ScenarioCard 
            scenario={currentScenario}
            onDecision={makeDecision}
            weekNumber={gameState.day}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex flex-col">
      {/* Header */}
      {!showWelcome && (
        <div className="p-4 flex justify-between items-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/games')}
            className="text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {gameConfig.name}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleQuit}
            className="text-red-400/70 hover:text-red-500/80"
          >
            Quit Game
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4">
        {renderCurrentScreen()}
        
        {/* Debug info - only in development */}
        {!showWelcome && currentScreen === 'decision' && !gameState.gameOver && (
          <ScenarioDebug 
            gameState={gameState}
            currentScenario={currentScenario}
            allScenarios={gameConfig.scenarios}
          />
        )}
      </div>

      {/* Stats - Only show below scenario card and not on game over */}
      {!showWelcome && currentScreen === 'decision' && !gameState.gameOver && (
        <div className="px-4 pb-20">
          <GameStats gameState={gameState} />
        </div>
      )}
    </div>
  );
};

export default Game; 