import { GameState } from '@/types/game';
import { restaurantScenarios } from './scenarios';

export const restaurantConfig = {
  id: 'restaurant',
  name: 'Restaurant Empire',
  description: 'Build your restaurant from a small eatery to a culinary empire.',
  initialGameState: {
    money: 20000,
    health: 100,
    mentalPeace: 100,
    teamMorale: 100,
    productQuality: 50,
    users: 0,
    day: 1,
    currentScenario: 0,
    gameOver: false,
    endReason: ''
  },
  scenarios: restaurantScenarios,
  gameOverConditions: {
    money: 0,
    health: 0,
    mentalPeace: 0,
    teamMorale: 0,
    productQuality: 0,
    users: 0
  },
  winConditions: {
    money: 500000,
    productQuality: 90
  }
}; 