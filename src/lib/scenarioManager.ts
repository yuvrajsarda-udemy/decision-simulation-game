import { ScenarioConfig } from '../data/fitflow';
import { fitflowConfig } from '../data/fitflow';
import { restaurantConfig } from '../data/restaurant';

export interface ScenarioManager {
  getAvailableScenarios(): ScenarioConfig[];
  getScenario(id: string): ScenarioConfig | null;
  getCurrentScenario(): ScenarioConfig;
  setCurrentScenario(id: string): void;
}

class GameScenarioManager implements ScenarioManager {
  private scenarios: Map<string, ScenarioConfig> = new Map();
  private currentScenarioId: string = 'fitflow';

  constructor() {
    // Register all available scenarios
    this.scenarios.set('fitflow', fitflowConfig);
    this.scenarios.set('restaurant', restaurantConfig);
    
    // Set default scenario
    this.currentScenarioId = 'fitflow';
  }

  getAvailableScenarios(): ScenarioConfig[] {
    return Array.from(this.scenarios.values());
  }

  getScenario(id: string): ScenarioConfig | null {
    return this.scenarios.get(id) || null;
  }

  getCurrentScenario(): ScenarioConfig {
    const scenario = this.scenarios.get(this.currentScenarioId);
    if (!scenario) {
      throw new Error(`Scenario ${this.currentScenarioId} not found`);
    }
    return scenario;
  }

  setCurrentScenario(id: string): void {
    if (!this.scenarios.has(id)) {
      throw new Error(`Scenario ${id} not found`);
    }
    this.currentScenarioId = id;
  }

  // Method to add new scenarios dynamically
  registerScenario(config: ScenarioConfig): void {
    this.scenarios.set(config.id, config);
  }
}

// Create and export a singleton instance
export const scenarioManager = new GameScenarioManager();

// Helper functions for easy access
export const getCurrentScenario = () => scenarioManager.getCurrentScenario();
export const getAvailableScenarios = () => scenarioManager.getAvailableScenarios();
export const setCurrentScenario = (id: string) => scenarioManager.setCurrentScenario(id); 