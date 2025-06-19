# Creating New Scenarios

This folder contains a template for creating new scenarios. To add a new scenario:

## 1. Create a new folder under `src/data/`

Create a folder with your scenario name (e.g., `restaurant`, `tech-startup`, `coffee-shop`)

## 2. Create the required files

### `scenarios.ts`
Contains all the decision scenarios for your game:

```typescript
import { Scenario } from '@/types/game';

export const yourScenarioScenarios: Scenario[] = [
  {
    id: 1,
    title: "Your First Decision",
    description: "Description of the scenario...",
    decisions: [
      {
        text: "Option 1",
        description: "What this option does",
        effects: { money: -1000, health: 5, users: 10 }
      },
      // ... more decisions
    ]
  },
  // ... more scenarios
];
```

### `config.ts`
Contains the configuration for your scenario:

```typescript
import { GameState } from '@/types/game';
import { yourScenarioScenarios } from './scenarios';

export const yourScenarioConfig: ScenarioConfig = {
  id: 'your-scenario-id',
  name: 'Your Scenario Name',
  description: 'Description of your scenario',
  initialGameState: {
    money: 5000,
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
  scenarios: yourScenarioScenarios,
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
    productQuality: 85
  }
};
```

### `index.ts`
Export your scenario data:

```typescript
export { yourScenarioScenarios } from './scenarios';
export { yourScenarioConfig, type ScenarioConfig } from './config';
```

## 3. Register your scenario

Add your scenario to the scenario manager in `src/lib/scenarioManager.ts`:

```typescript
import { yourScenarioConfig } from '../data/your-scenario';

// In the constructor:
this.scenarios.set('your-scenario-id', yourScenarioConfig);
```

## 4. Set as current scenario (optional)

To make your scenario the default, change the `currentScenarioId` in the scenario manager:

```typescript
private currentScenarioId: string = 'your-scenario-id';
```

## Example Scenario Structure

```
src/
├── data/
│   ├── fitflow/           # Fitness app scenario
│   │   ├── scenarios.ts
│   │   ├── config.ts
│   │   └── index.ts
│   ├── restaurant/        # Restaurant scenario (example)
│   │   ├── scenarios.ts
│   │   ├── config.ts
│   │   └── index.ts
│   └── template/          # Template for new scenarios
└── lib/
    └── scenarioManager.ts # Manages all scenarios
```

## Game State Properties

The game state includes these properties that you can use in your scenarios:

- `money`: Financial resources
- `health`: Physical health
- `mentalPeace`: Mental well-being
- `teamMorale`: Team happiness
- `productQuality`: Quality of your product/service
- `users`: Number of customers/users
- `day`: Current day/week
- `currentScenario`: Index of current scenario
- `gameOver`: Whether the game has ended
- `endReason`: Reason for game ending

## Tips for Creating Scenarios

1. **Start Simple**: Begin with 3-5 scenarios to test the flow
2. **Balance Effects**: Make sure decisions have meaningful trade-offs
3. **Progressive Difficulty**: Scenarios should get more complex over time
4. **Realistic Consequences**: Effects should make sense for the decision
5. **Multiple Paths**: Allow for different strategies to succeed 