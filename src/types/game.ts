export interface GameState {
  money: number;
  health: number;
  mentalPeace: number;
  teamMorale: number;
  productQuality: number;
  users: number;
  day: number;
  currentScenario: number;
  gameOver: boolean;
  endReason: string;
  seenScenarios: number[];
  scenarioHistory: number[];
}

export interface Decision {
  text: string;
  description: string;
  effects: {
    money?: number;
    health?: number;
    mentalPeace?: number;
    teamMorale?: number;
    productQuality?: number;
    users?: number;
  };
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  decisions: Decision[];
  conditions?: {
    minMoney?: number;
    maxMoney?: number;
    minUsers?: number;
    maxUsers?: number;
    minHealth?: number;
    maxHealth?: number;
    minMentalPeace?: number;
    maxMentalPeace?: number;
    minTeamMorale?: number;
    maxTeamMorale?: number;
    minProductQuality?: number;
    maxProductQuality?: number;
    minDay?: number;
    maxDay?: number;
    requiredPreviousScenarios?: number[];
    excludedPreviousScenarios?: number[];
  };
  weight?: number;
  category?: 'early' | 'mid' | 'late' | 'crisis' | 'opportunity' | 'growth';
}

export type ScreenType = 'decision' | 'event' | 'status' | 'summary';

export interface GameScreen {
  type: ScreenType;
  content?: any;
}

export interface Game {
  id: string;
  name: string;
  description: string;
  // UI Metadata
  emoji: string;
  colors: string;
  vision: string;
  mission: string;
  goal: (winMoney: number, winQuality: number) => string;
  // Game Configuration
  initialGameState: GameState;
  scenarios: Scenario[];
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