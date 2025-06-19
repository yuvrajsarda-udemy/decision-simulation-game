# Creating New Scenarios

This folder contains a template for creating new scenarios. To add a new scenario:

## 1. Create a new folder under `src/data/`

Create a folder with your scenario name (e.g., `restaurant`, `tech-startup`, `coffee-shop`)

## 2. Create the scenario file

Create a single `index.ts` file that contains all your scenario data:

```typescript
import { Scenario, GameState, ScenarioConfig } from '@/types/game';

// All the decision scenarios for your game
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

// Complete scenario configuration with metadata and game settings
export const yourScenarioConfig: ScenarioConfig = {
  id: 'your-scenario-id',
  name: 'Your Scenario Name',
  description: 'Description of your scenario',
  // UI Metadata
  emoji: '🚀',
  colors: 'from-blue-500/10 to-purple-500/10 border-blue-200',
  vision: "Your vision statement for the scenario...",
  mission: "Your mission statement for the scenario...",
  goal: (winMoney: number, winQuality: number) => 
    `Reach $${(winMoney / 1000).toFixed(0)}K in revenue with high-quality products (${winQuality}%+) to achieve success.`,
  // Game Configuration
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
│   │   └── index.ts       # All fitflow data in one file
│   ├── restaurant/        # Restaurant scenario (example)
│   │   └── index.ts       # All restaurant data in one file
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

## ScenarioConfig Properties

The ScenarioConfig includes both UI metadata and game configuration:

### UI Metadata:
- `emoji`: Emoji icon for your scenario (used in cards and headers)
- `colors`: CSS classes for gradient backgrounds and borders
- `vision`: Vision statement shown in the welcome screen
- `mission`: Mission statement shown in the welcome screen
- `goal`: Function that generates the goal text based on win conditions

### Game Configuration:
- `id`: Unique identifier for the scenario
- `name`: Display name for the scenario
- `description`: Brief description of the scenario
- `initialGameState`: Starting values for all game properties
- `scenarios`: Array of all decision scenarios
- `gameOverConditions`: Values that trigger game over
- `winConditions`: Values required to win the game

## Tips for Creating Scenarios

1. **Start Simple**: Begin with 3-5 scenarios to test the flow
2. **Balance Effects**: Make sure decisions have meaningful trade-offs
3. **Progressive Difficulty**: Scenarios should get more complex over time
4. **Realistic Consequences**: Effects should make sense for the decision
5. **Multiple Paths**: Allow for different strategies to succeed
6. **Consistent Theming**: Use appropriate emojis and colors that match your scenario theme 