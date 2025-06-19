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
  effects: {
    money?: number;
    health?: number;
    mentalPeace?: number;
    teamMorale?: number;
    productQuality?: number;
    users?: number;
  };
  description: string;
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