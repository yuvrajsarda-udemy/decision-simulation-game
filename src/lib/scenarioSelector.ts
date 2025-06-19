import { Scenario, GameState } from '@/types/game';

export interface ScenarioSelectionOptions {
  forceRandom?: boolean;
  biasTowardsUnseen?: boolean;
  categoryPreference?: 'early' | 'mid' | 'late' | 'crisis' | 'opportunity' | 'growth' | 'status';
}

export class ScenarioSelector {
  /**
   * Selects the next scenario based on game state and conditions
   */
  static selectNextScenario(
    scenarios: Scenario[],
    gameState: GameState,
    options: ScenarioSelectionOptions = {}
  ): Scenario {
    const { forceRandom = false, biasTowardsUnseen = true, categoryPreference } = options;

    // Get available scenarios based on conditions
    const availableScenarios = this.getAvailableScenarios(scenarios, gameState);
    
    if (availableScenarios.length === 0) {
      console.log('No scenarios available, falling back to random selection'); // this shouldn't happen usually
      return scenarios[Math.floor(Math.random() * scenarios.length)];
    }

    // If forcing random selection
    if (forceRandom) {
      return this.selectRandomScenario(availableScenarios, gameState, biasTowardsUnseen);
    }

    // Apply category preference if specified
    let filteredScenarios = availableScenarios;
    if (categoryPreference) {
      const categoryScenarios = availableScenarios.filter(s => s.category === categoryPreference);
      if (categoryScenarios.length > 0) {
        filteredScenarios = categoryScenarios;
      }
    }

    // Determine if we should show a crisis or opportunity based on game state
    const shouldShowCrisis = this.shouldShowCrisis(gameState);
    const shouldShowOpportunity = this.shouldShowOpportunity(gameState);

    if (shouldShowCrisis) {
      const crisisScenarios = filteredScenarios.filter(s => s.category === 'crisis');
      if (crisisScenarios.length > 0) {
        return this.selectRandomScenario(crisisScenarios, gameState, biasTowardsUnseen);
      }
    }

    if (shouldShowOpportunity) {
      const opportunityScenarios = filteredScenarios.filter(s => s.category === 'opportunity');
      if (opportunityScenarios.length > 0) {
        return this.selectRandomScenario(opportunityScenarios, gameState, biasTowardsUnseen);
      }
    }

    // Default to weighted random selection
    return this.selectWeightedRandomScenario(filteredScenarios, gameState, biasTowardsUnseen);
  }

  /**
   * Gets scenarios that match current game state conditions
   */
  private static getAvailableScenarios(scenarios: Scenario[], gameState: GameState): Scenario[] {
    return scenarios.filter(scenario => {
      const conditions = scenario.conditions;
      if (!conditions) return true;

      // Check money conditions
      if (conditions.minMoney !== undefined && gameState.money < conditions.minMoney) return false;
      if (conditions.maxMoney !== undefined && gameState.money > conditions.maxMoney) return false;

      // Check users conditions
      if (conditions.minUsers !== undefined && gameState.users < conditions.minUsers) return false;
      if (conditions.maxUsers !== undefined && gameState.users > conditions.maxUsers) return false;

      // Check health conditions
      if (conditions.minHealth !== undefined && gameState.health < conditions.minHealth) return false;
      if (conditions.maxHealth !== undefined && gameState.health > conditions.maxHealth) return false;

      // Check mental peace conditions
      if (conditions.minMentalPeace !== undefined && gameState.mentalPeace < conditions.minMentalPeace) return false;
      if (conditions.maxMentalPeace !== undefined && gameState.mentalPeace > conditions.maxMentalPeace) return false;

      // Check team morale conditions
      if (conditions.minTeamMorale !== undefined && gameState.teamMorale < conditions.minTeamMorale) return false;
      if (conditions.maxTeamMorale !== undefined && gameState.teamMorale > conditions.maxTeamMorale) return false;

      // Check product quality conditions
      if (conditions.minProductQuality !== undefined && gameState.productQuality < conditions.minProductQuality) return false;
      if (conditions.maxProductQuality !== undefined && gameState.productQuality > conditions.maxProductQuality) return false;

      // Check time unit conditions
      if (conditions.minTimeUnit !== undefined && gameState.timeUnit < conditions.minTimeUnit) return false;
      if (conditions.maxTimeUnit !== undefined && gameState.timeUnit > conditions.maxTimeUnit) return false;

      // Check required previous scenarios
      if (conditions.requiredPreviousScenarios && conditions.requiredPreviousScenarios.length > 0) {
        const hasRequired = conditions.requiredPreviousScenarios.some(id => 
          gameState.scenarioHistory.includes(id)
        );
        if (!hasRequired) return false;
      }

      // Check excluded previous scenarios
      if (conditions.excludedPreviousScenarios && conditions.excludedPreviousScenarios.length > 0) {
        const hasExcluded = conditions.excludedPreviousScenarios.some(id => 
          gameState.scenarioHistory.includes(id)
        );
        if (hasExcluded) return false;
      }

      return true;
    });
  }

  /**
   * Selects a random scenario with bias towards unseen scenarios
   */
  private static selectRandomScenario(
    scenarios: Scenario[],
    gameState: GameState,
    biasTowardsUnseen: boolean
  ): Scenario {
    if (!biasTowardsUnseen) {
      return scenarios[Math.floor(Math.random() * scenarios.length)];
    }

    const unseenScenarios = scenarios.filter(s => !gameState.seenScenarios.includes(s.id));
    const seenScenarios = scenarios.filter(s => gameState.seenScenarios.includes(s.id));

    // 70% chance to select from unseen scenarios if available
    if (unseenScenarios.length > 0 && Math.random() < 0.7) {
      return unseenScenarios[Math.floor(Math.random() * unseenScenarios.length)];
    }

    // Otherwise select from all available scenarios
    return scenarios[Math.floor(Math.random() * scenarios.length)];
  }

  /**
   * Selects a scenario using weighted random selection
   */
  private static selectWeightedRandomScenario(
    scenarios: Scenario[],
    gameState: GameState,
    biasTowardsUnseen: boolean
  ): Scenario {
    const weights = scenarios.map(scenario => {
      let weight = scenario.weight || 1;

      // Boost weight for unseen scenarios
      if (biasTowardsUnseen && !gameState.seenScenarios.includes(scenario.id)) {
        weight *= 2;
      }

      // Check if scenario was seen recently
      const recentIndex = gameState.scenarioHistory.lastIndexOf(scenario.id);
      if (recentIndex !== -1) {
        const timeUnitsSinceSeen = gameState.scenarioHistory.length - recentIndex;
        if (timeUnitsSinceSeen < 5) {
          // Reduce weight for recently seen scenarios
          weight *= 0.3;
        }
      }

      // Adjust weight based on game state
      weight = this.adjustWeightForGameState(scenario, gameState, weight);

      return weight;
    });

    return this.selectByWeight(scenarios, weights);
  }

  /**
   * Adjusts scenario weight based on current game state
   */
  private static adjustWeightForGameState(scenario: Scenario, gameState: GameState, baseWeight: number): number {
    let weight = baseWeight;

    // Boost scenarios that address current problems
    if (gameState.health < 30 && scenario.category === 'crisis') weight *= 1.5;
    if (gameState.money < 1000 && scenario.category === 'crisis') weight *= 1.5;
    if (gameState.teamMorale < 30 && scenario.category === 'crisis') weight *= 1.5;

    // Boost growth scenarios when doing well
    if (gameState.money > 5000 && gameState.users > 100 && scenario.category === 'growth') weight *= 1.3;

    // Boost opportunity scenarios when stable
    if (gameState.health > 70 && gameState.mentalPeace > 70 && scenario.category === 'opportunity') weight *= 1.2;

    return weight;
  }

  /**
   * Selects an item from an array using weighted random selection
   */
  private static selectByWeight<T>(items: T[], weights: number[]): T {
    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    let random = Math.random() * totalWeight;

    for (let i = 0; i < items.length; i++) {
      random -= weights[i];
      if (random <= 0) {
        return items[i];
      }
    }

    return items[items.length - 1];
  }

  /**
   * Determines if a crisis scenario should be shown
   */
  private static shouldShowCrisis(gameState: GameState): boolean {
    const crisisThresholds = {
      health: 30,
      mentalPeace: 30,
      teamMorale: 30,
      money: 1000,
      productQuality: 30
    };

    return (
      gameState.health < crisisThresholds.health ||
      gameState.mentalPeace < crisisThresholds.mentalPeace ||
      gameState.teamMorale < crisisThresholds.teamMorale ||
      gameState.money < crisisThresholds.money ||
      gameState.productQuality < crisisThresholds.productQuality
    );
  }

  /**
   * Determines if an opportunity scenario should be shown
   */
  private static shouldShowOpportunity(gameState: GameState): boolean {
    const opportunityThresholds = {
      health: 70,
      mentalPeace: 70,
      teamMorale: 70,
      money: 5000,
      productQuality: 70
    };

    return (
      gameState.health > opportunityThresholds.health &&
      gameState.mentalPeace > opportunityThresholds.mentalPeace &&
      gameState.teamMorale > opportunityThresholds.teamMorale &&
      gameState.money > opportunityThresholds.money &&
      gameState.productQuality > opportunityThresholds.productQuality
    );
  }
} 