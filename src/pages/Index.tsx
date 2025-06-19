import { useState, useEffect } from 'react';
import { GameStats } from '@/components/GameStats';
import { DecisionCard } from '@/components/DecisionCard';
import { GameOver } from '@/components/GameOver';
import { scenarios } from '@/data/scenarios';
import { GameState, Decision } from '@/types/game';

const Index = () => {
  const [gameState, setGameState] = useState<GameState>({
    money: 10000,
    health: 80,
    stress: 20,
    teamMorale: 70,
    productQuality: 50,
    day: 1,
    currentScenario: 0,
    gameOver: false,
    endReason: ''
  });

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
    newState.stress += decision.effects.stress || 0;
    newState.teamMorale += decision.effects.teamMorale || 0;
    newState.productQuality += decision.effects.productQuality || 0;
    
    // Advance day and scenario
    newState.day += 1;
    newState.currentScenario = (newState.currentScenario + 1) % scenarios.length;
    
    // Check game over conditions
    if (newState.money <= 0) {
      newState.gameOver = true;
      newState.endReason = 'Your startup ran out of money and had to shut down.';
    } else if (newState.health <= 0) {
      newState.gameOver = true;
      newState.endReason = 'Your health deteriorated and you had to step down as CEO.';
    } else if (newState.stress >= 100) {
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
    newState.stress = Math.max(0, Math.min(100, newState.stress));
    newState.teamMorale = Math.max(0, Math.min(100, newState.teamMorale));
    newState.productQuality = Math.max(0, Math.min(100, newState.productQuality));
    
    setGameState(newState);
  };

  const restartGame = () => {
    const newState: GameState = {
      money: 10000,
      health: 80,
      stress: 20,
      teamMorale: 70,
      productQuality: 50,
      day: 1,
      currentScenario: 0,
      gameOver: false,
      endReason: ''
    };
    setGameState(newState);
    sessionStorage.removeItem('startupGame');
  };

  const currentScenario = scenarios[gameState.currentScenario];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 p-4">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Startup Founder
          </h1>
          <p className="text-muted-foreground">
            Day {gameState.day} • Build your empire
          </p>
        </div>

        <GameStats gameState={gameState} />
        
        {gameState.gameOver ? (
          <GameOver 
            endReason={gameState.endReason}
            finalStats={gameState}
            onRestart={restartGame}
          />
        ) : (
          <DecisionCard 
            scenario={currentScenario}
            onDecision={makeDecision}
          />
        )}
      </div>
    </div>
  );
};

export default Index;
