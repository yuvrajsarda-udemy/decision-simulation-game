import { useState, useEffect } from 'react';
import { GameStats } from '@/components/GameStats';
import { DecisionCard } from '@/components/DecisionCard';
import { GameOver } from '@/components/GameOver';
import { EventScreen } from '@/components/EventScreen';
import { StatusScreen } from '@/components/StatusScreen';
import { SummaryScreen } from '@/components/SummaryScreen';
import { scenarios } from '@/data/scenarios';
import { GameState, Decision, ScreenType } from '@/types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    money: 10000,
    health: 80,
    mentalPeace: 80,
    teamMorale: 70,
    productQuality: 50,
    users: 100,
    day: 1,
    currentScenario: 0,
    gameOver: false,
    endReason: ''
  });
  
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('decision');

  // Load game state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem('startupGame');
    if (savedState) {
      setGameState(JSON.parse(savedState));
    }
  }, []);

  // Save game state to session storage
  useEffect(() => {
    sessionStorage.setItem('startupGame', JSON.stringify(gameState));
  }, [gameState]);

  const makeDecision = (decision: Decision) => {
    const newState = { ...gameState };
    
    // Apply decision effects
    newState.money += decision.effects.money || 0;
    newState.health += decision.effects.health || 0;
    newState.mentalPeace += decision.effects.mentalPeace || 0;
    newState.teamMorale += decision.effects.teamMorale || 0;
    newState.productQuality += decision.effects.productQuality || 0;
    newState.users += decision.effects.users || 0;
    
    // Advance day and scenario
    newState.day += 1;
    newState.currentScenario = (newState.currentScenario + 1) % scenarios.length;
    
    // Determine next screen type
    const nextScreen = determineNextScreen(newState.day);
    setCurrentScreen(nextScreen);
    
    // Check game over conditions
    if (newState.money <= 0) {
      newState.gameOver = true;
      newState.endReason = 'Your startup ran out of money and had to shut down.';
    } else if (newState.health <= 0) {
      newState.gameOver = true;
      newState.endReason = 'Your health deteriorated and you had to step down as CEO.';
    } else if (newState.mentalPeace <= 0) {
      newState.gameOver = true;
      newState.endReason = 'The stress became too much and you burned out.';
    } else if (newState.teamMorale <= 0) {
      newState.gameOver = true;
      newState.endReason = 'Your entire team quit due to low morale.';
    } else if (newState.money >= 1000000 && newState.productQuality >= 90) {
      newState.gameOver = true;
      newState.endReason = 'Congratulations! You built a million-dollar company with an amazing product!';
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

  const determineNextScreen = (day: number): ScreenType => {
    if (day % 7 === 0) return 'summary'; // Weekly summary
    if (day % 5 === 0) return 'event'; // Random events
    if (day % 3 === 0) return 'status'; // Status updates
    return 'decision'; // Default to decision
  };

  const restartGame = () => {
    const newState: GameState = {
      money: 10000,
      health: 80,
      mentalPeace: 80,
      teamMorale: 70,
      productQuality: 50,
      users: 100,
      day: 1,
      currentScenario: 0,
      gameOver: false,
      endReason: ''
    };
    setGameState(newState);
    setCurrentScreen('decision');
    sessionStorage.removeItem('startupGame');
  };

  const handleContinue = () => {
    setCurrentScreen('decision');
  };

  const currentScenario = scenarios[gameState.currentScenario];

  const getDayName = (day: number) => {
    const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    return dayNames[(day - 1) % 7];
  };

  const renderCurrentScreen = () => {
    if (gameState.gameOver) {
      return (
        <GameOver 
          endReason={gameState.endReason}
          finalStats={gameState}
          onRestart={restartGame}
        />
      );
    }

    switch (currentScreen) {
      case 'decision':
        return (
          <DecisionCard 
            scenario={currentScenario}
            onDecision={makeDecision}
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
          <DecisionCard 
            scenario={currentScenario}
            onDecision={makeDecision}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex flex-col">
      {/* Header */}
      <div className="p-4 text-center">
        <p className="text-sm text-primary font-medium mb-1">Simulation: Startup Founder</p>
        <h1 className="text-2xl font-bold text-foreground">
          Day {gameState.day} • {getDayName(gameState.day)}
        </h1>
      </div>

      {/* Stats - Compact */}
      <div className="px-4">
        <GameStats gameState={gameState} />
      </div>

      {/* Main Content - 70% of remaining space */}
      <div className="flex-1 px-4 pb-4">
        {renderCurrentScreen()}
      </div>
    </div>
  );
};

export default Index;
