import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { GameStats } from '@/components/GameStats';
import { ScenarioCard } from '@/components/ScenarioCard';
import { GameOver } from '@/components/GameOver';
import { EventScreen } from '@/components/EventScreen';
import { StatusScreen } from '@/components/StatusScreen';
import { SummaryScreen } from '@/components/SummaryScreen';
import { WelcomeScreen } from '@/components/WelcomeScreen';
import { ScenarioSelector } from '@/components/ScenarioSelector';
import { scenarioManager, getAvailableScenarios } from '@/lib/scenarioManager';
import { GameState, Decision, ScreenType } from '@/types/game';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RotateCcw } from 'lucide-react';

const Game = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const navigate = useNavigate();
  
  // Get the scenario config for this game
  const scenarioConfig = gameId ? scenarioManager.getScenario(gameId) : null;
  
  if (!scenarioConfig) {
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

  const [gameState, setGameState] = useState<GameState>(scenarioConfig.initialGameState);
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('decision');
  const [showWelcome, setShowWelcome] = useState(true);
  const [showScenarioSelector, setShowScenarioSelector] = useState(false);

  // Load game state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem(`${scenarioConfig.id}Game`);
    if (savedState) {
      setGameState(JSON.parse(savedState));
      setShowWelcome(false);
    }
  }, [scenarioConfig.id]);

  // Save game state to session storage
  useEffect(() => {
    if (!showWelcome) {
      sessionStorage.setItem(`${scenarioConfig.id}Game`, JSON.stringify(gameState));
    }
  }, [gameState, showWelcome, scenarioConfig.id]);

  const makeDecision = (decision: Decision) => {
    const newState = { ...gameState };
    
    // Apply decision effects
    newState.money += decision.effects.money || 0;
    newState.health += decision.effects.health || 0;
    newState.mentalPeace += decision.effects.mentalPeace || 0;
    newState.teamMorale += decision.effects.teamMorale || 0;
    newState.productQuality += decision.effects.productQuality || 0;
    newState.users += decision.effects.users || 0;
    
    // Advance week and scenario
    newState.day += 1;
    newState.currentScenario = (newState.currentScenario + 1) % scenarioConfig.scenarios.length;
    
    // Determine next screen type
    const nextScreen = determineNextScreen(newState.day);
    setCurrentScreen(nextScreen);
    
    // Check game over conditions using scenario config
    const { gameOverConditions, winConditions } = scenarioConfig;
    
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
      newState.endReason = `Congratulations! You successfully built ${scenarioConfig.name.split(':')[0]} and achieved your goals!`;
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
    setGameState(scenarioConfig.initialGameState);
    setCurrentScreen('decision');
    setShowWelcome(true);
    sessionStorage.removeItem(`${scenarioConfig.id}Game`);
  };

  const handleContinue = () => {
    setCurrentScreen('decision');
  };

  const handleStart = () => {
    setShowWelcome(false);
  };

  const handleScenarioSelect = () => {
    const availableScenarios = getAvailableScenarios();
    const currentIndex = availableScenarios.findIndex(s => s.id === scenarioConfig.id);
    const nextIndex = (currentIndex + 1) % availableScenarios.length;
    const nextScenario = availableScenarios[nextIndex];
    
    // Navigate to the next scenario
    navigate(`/games/${nextScenario.id}`);
  };

  const handleShowScenarioSelector = () => {
    setShowScenarioSelector(true);
  };

  const currentScenario = scenarioConfig.scenarios[gameState.currentScenario];

  const renderCurrentScreen = () => {
    if (showScenarioSelector) {
      return <ScenarioSelector onScenarioSelect={handleScenarioSelect} />;
    }

    if (showWelcome) {
      return <WelcomeScreen onStart={handleStart} scenarioConfig={scenarioConfig} />;
    }

    if (gameState.gameOver) {
      return (
        <GameOver 
          endReason={gameState.endReason}
          finalStats={gameState}
          onRestart={restartGame}
          scenarioConfig={scenarioConfig}
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
      {!showWelcome && !showScenarioSelector && (
        <div className="p-4 text-left">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/games')}
            className="text-muted-foreground hover:text-foreground self-start"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {scenarioConfig.name}
          </Button>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4">
        {renderCurrentScreen()}
      </div>

      {/* Stats - Only show below scenario card and not on game over */}
      {!showWelcome && !showScenarioSelector && currentScreen === 'decision' && !gameState.gameOver && (
        <div className="px-4 pb-20 pt-4">
          <GameStats gameState={gameState} />
        </div>
      )}
    </div>
  );
};

export default Game; 