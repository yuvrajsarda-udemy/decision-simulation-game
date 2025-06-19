
import { useState, useEffect } from 'react';
import { GameStats } from '@/components/GameStats';
import { DecisionCard } from '@/components/DecisionCard';
import { GameOver } from '@/components/GameOver';
import { EventScreen } from '@/components/EventScreen';
import { StatusScreen } from '@/components/StatusScreen';
import { SummaryScreen } from '@/components/SummaryScreen';
import { WelcomeScreen } from '@/components/WelcomeScreen';
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
  const [showWelcome, setShowWelcome] = useState(true);

  // Load game state from session storage
  useEffect(() => {
    const savedState = sessionStorage.getItem('startupGame');
    if (savedState) {
      setGameState(JSON.parse(savedState));
      setShowWelcome(false);
    }
  }, []);

  // Save game state to session storage
  useEffect(() => {
    if (!showWelcome) {
      sessionStorage.setItem('startupGame', JSON.stringify(gameState));
    }
  }, [gameState, showWelcome]);

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

  const determineNextScreen = (week: number): ScreenType => {
    if (week % 4 === 0) return 'summary'; // Monthly summary
    if (week % 3 === 0) return 'event'; // Random events
    if (week % 2 === 0) return 'status'; // Status updates
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
    setShowWelcome(true);
    sessionStorage.removeItem('startupGame');
  };

  const handleContinue = () => {
    setCurrentScreen('decision');
  };

  const handleStart = () => {
    setShowWelcome(false);
  };

  const currentScenario = scenarios[gameState.currentScenario];

  const renderCurrentScreen = () => {
    if (showWelcome) {
      return <WelcomeScreen onStart={handleStart} />;
    }

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
      {!showWelcome && (
        <div className="p-4 text-left">
          <p className="text-sm text-primary font-medium mb-1">Simulation: Startup Founder</p>
          <h1 className="text-2xl font-bold text-foreground">
            Week {gameState.day} • {currentScenario.title}
          </h1>
        </div>
      )}

      {/* Stats - Compact */}
      {!showWelcome && (
        <div className="px-4">
          <GameStats gameState={gameState} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 pb-20">
        {renderCurrentScreen()}
      </div>

      {/* Bottom Navigation */}
      {!showWelcome && (
        <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border">
          <div className="flex justify-around items-center py-2">
            <div className="flex flex-col items-center p-2">
              <div className="w-6 h-6 rounded-full bg-primary"></div>
              <span className="text-xs text-primary font-medium mt-1">Games</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <div className="w-6 h-6 rounded-full bg-muted"></div>
              <span className="text-xs text-muted-foreground mt-1">Courses</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <div className="w-6 h-6 rounded-full bg-muted"></div>
              <span className="text-xs text-muted-foreground mt-1">Home</span>
            </div>
            <div className="flex flex-col items-center p-2">
              <div className="w-6 h-6 rounded-full bg-muted"></div>
              <span className="text-xs text-muted-foreground mt-1">Profile</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
