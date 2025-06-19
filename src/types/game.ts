export interface GameState {
  money: number;
  health: number;
  stress: number;
  teamMorale: number;
  productQuality: number;
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
    stress?: number;
    teamMorale?: number;
    productQuality?: number;
  };
  description: string;
}

export interface Scenario {
  id: number;
  title: string;
  description: string;
  decisions: Decision[];
}