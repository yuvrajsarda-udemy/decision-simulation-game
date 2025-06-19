import { Game } from '@/types/game';
import { fitflowGame } from '../data/fitflow';
import { restaurantGame } from '../data/restaurant';

export interface GameManager {
  getAvailableGames(): Game[];
  getGame(id: string): Game | null;
  getCurrentGame(): Game;
  setCurrentGame(id: string): void;
}

class GameManagerImpl implements GameManager {
  private games: Map<string, Game> = new Map();
  private currentGameId: string = 'fitflow';

  constructor() {
    // Register all available games
    this.games.set('fitflow', fitflowGame);
    this.games.set('restaurant', restaurantGame);
    
    // Set default game
    this.currentGameId = 'fitflow';
  }

  getAvailableGames(): Game[] {
    return Array.from(this.games.values());
  }

  getGame(id: string): Game | null {
    return this.games.get(id) || null;
  }

  getCurrentGame(): Game {
    const game = this.games.get(this.currentGameId);
    if (!game) {
      throw new Error(`Game ${this.currentGameId} not found`);
    }
    return game;
  }

  setCurrentGame(id: string): void {
    if (!this.games.has(id)) {
      throw new Error(`Game ${id} not found`);
    }
    this.currentGameId = id;
  }

  // Method to add new games dynamically
  registerGame(game: Game): void {
    this.games.set(game.id, game);
  }
}

// Create and export a singleton instance
export const gameManager = new GameManagerImpl();

// Helper functions for easy access
export const getCurrentGame = () => gameManager.getCurrentGame();
export const getAvailableGames = () => gameManager.getAvailableGames();
export const setCurrentGame = (id: string) => gameManager.setCurrentGame(id); 