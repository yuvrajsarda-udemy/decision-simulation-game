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
}

export type ScreenType = 'decision' | 'event' | 'status' | 'summary';

export interface GameScreen {
  type: ScreenType;
  content?: any;
}

export interface ScenarioConfig {
  id: string;
  name: string;
  description: string;
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