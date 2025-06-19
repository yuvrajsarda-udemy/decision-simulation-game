import { GameState } from '@/types/game';
import { fitflowScenarios } from './scenarios';

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
  initialGameState: GameState;
  scenarios: typeof fitflowScenarios;
  gameOverConditions: {
    money: number;
    health: number;
    mentalPeace: number;
    teamMorale: number;
    productQuality: number;
    users: number;
  };
  winConditions: {
    money: number;
    productQuality: number;
  };
}

export const fitflowConfig: ScenarioConfig = {
  id: 'fitflow',
  name: 'FitFlow: Fitness App Startup',
  description: 'Build and grow your fitness tracking app from a solo developer to a successful startup.',
  initialGameState: {
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
  },
  scenarios: fitflowScenarios,
  gameOverConditions: {
    money: 0,
    health: 0,
    mentalPeace: 0,
    teamMorale: 0,
    productQuality: 0,
    users: 0
  },
  winConditions: {
    money: 1000000,
    productQuality: 90
  }
}; 