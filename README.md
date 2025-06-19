# Decision Simulation Game

A modular decision-making simulation game where players navigate through various business scenarios, making choices that affect their success metrics.

## Features

- **Multiple Scenarios**: Choose from different business scenarios (FitFlow, Restaurant, etc.)
- **Dynamic Decision Making**: Each choice affects multiple game metrics
- **Progressive Difficulty**: Scenarios become more complex over time
- **Persistent Game State**: Save and resume your progress
- **Scenario Switching**: Easily switch between different game scenarios

## Current Scenarios

### FitFlow: Fitness App Startup
Build and grow your fitness tracking app from a solo developer to a successful startup. Navigate challenges like hiring decisions, competition, and investor interest.

### Restaurant Empire
Start your own restaurant and build it into a culinary empire. Make decisions about location, menu planning, and staffing.

## Project Structure

```
src/
├── data/
│   ├── fitflow/              # FitFlow scenario data
│   │   ├── scenarios.ts      # Decision scenarios
│   │   ├── config.ts         # Scenario configuration
│   │   └── index.ts          # Exports
│   ├── restaurant/           # Restaurant scenario data
│   │   ├── scenarios.ts      # Decision scenarios
│   │   ├── config.ts         # Scenario configuration
│   │   └── index.ts          # Exports
│   ├── scenarioManager.ts    # Manages all scenarios
│   └── scenarios.ts          # Legacy file (deprecated)
├── components/               # React components
├── types/                    # TypeScript type definitions
└── pages/                    # Page components
```

## Adding New Scenarios

The game is designed to be easily extensible. To add a new scenario:

### 1. Create Scenario Folder
Create a new folder under `src/data/` with your scenario name (e.g., `coffee-shop`, `tech-startup`).

### 2. Create Required Files

#### `scenarios.ts`
Define your decision scenarios:

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

#### `config.ts`
Configure your scenario:

```typescript
import { GameState } from '@/types/game';
import { yourScenarioScenarios } from './scenarios';

export const yourScenarioConfig = {
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

#### `index.ts`
Export your scenario:

```typescript
export { yourScenarioScenarios } from './scenarios';
export { yourScenarioConfig } from './config';
```

### 3. Register Your Scenario
Add your scenario to `src/data/scenarioManager.ts`:

```typescript
import { yourScenarioConfig } from './your-scenario';

// In the constructor:
this.scenarios.set('your-scenario-id', yourScenarioConfig);
```

## Game Mechanics

### Game State Properties
- **money**: Financial resources
- **health**: Physical health
- **mentalPeace**: Mental well-being
- **teamMorale**: Team happiness
- **productQuality**: Quality of your product/service
- **users**: Number of customers/users
- **day**: Current day/week
- **currentScenario**: Index of current scenario
- **gameOver**: Whether the game has ended
- **endReason**: Reason for game ending

### Decision Effects
Each decision can affect multiple metrics:
- Positive effects: `{ money: 1000, health: 5 }`
- Negative effects: `{ money: -500, mentalPeace: -10 }`
- No effect: `{ money: 0 }` or omit the property

### Win/Lose Conditions
Configure when the game ends:
- **Game Over**: When any metric reaches 0
- **Win**: When money and product quality reach target values

## Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build
```bash
npm run build
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add your new scenario following the structure above
4. Test your scenario thoroughly
5. Submit a pull request

## Tips for Creating Scenarios

1. **Start Simple**: Begin with 3-5 scenarios to test the flow
2. **Balance Effects**: Make sure decisions have meaningful trade-offs
3. **Progressive Difficulty**: Scenarios should get more complex over time
4. **Realistic Consequences**: Effects should make sense for the decision
5. **Multiple Paths**: Allow for different strategies to succeed
6. **Engaging Narrative**: Create compelling storylines that draw players in

## License

MIT License - see LICENSE file for details.
