# Decision Simulation Game

A React-based decision-making simulation game where players navigate through various business scenarios, making choices that affect their success metrics.

## Features

- **Multiple Game Scenarios**: Choose from different business simulations
- **URL-based Navigation**: Each game has its own URL for easy sharing and bookmarking
- **Persistent Game State**: Game progress is saved in session storage
- **Dynamic Decision System**: Choices affect multiple metrics (money, health, mental peace, etc.)
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with Tailwind CSS and shadcn/ui components

## Navigation Structure

The app now features proper URL-based navigation:

- **`/`** - Redirects to `/games` (Games hub)
- **`/games`** - Games navigator showing all available scenarios
- **`/games/:gameId`** - Individual game pages (e.g., `/games/fitflow`, `/games/restaurant`)
- **`/courses`** - Courses page
- **`/home`** - Home page
- **`/profile`** - Profile page

## Available Games

### 🏃‍♀️ FitFlow: Fitness App Startup
- **URL**: `/games/fitflow`
- **Description**: Build and grow your fitness tracking app from a solo developer to a successful startup
- **Starting Money**: $10,000
- **Win Target**: $1M revenue with 90%+ product quality

### 🍽️ Restaurant Empire
- **URL**: `/games/restaurant`
- **Description**: Build your restaurant from a small eatery to a culinary empire
- **Starting Money**: $20,000
- **Win Target**: $500K revenue with 90%+ product quality

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
Each decision affects multiple metrics:
- Positive/negative money changes
- Health impacts
- Mental peace adjustments
- Team morale changes
- Product quality improvements/declines
- User growth/loss

### Game Over Conditions
Games end when any of these conditions are met:
- Money reaches 0
- Health reaches 0
- Mental peace reaches 0
- Team morale reaches 0
- Win conditions are met (target money + product quality)

## Development

### Prerequisites
- Node.js 18+ 
- npm or bun

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd decision-simulation-game

# Install dependencies
npm install
# or
bun install
```

### Running the App
```bash
# Development mode
npm run dev
# or
bun dev

# Build for production
npm run build
# or
bun run build
```

### Adding New Scenarios

Create a new folder under `src/data/` with your scenario name (e.g., `coffee-shop`, `tech-startup`).

#### 1. Create Required Files

##### `scenarios.ts`
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

##### `config.ts`
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

##### `index.ts`
Export your scenario:

```typescript
export { yourScenarioScenarios } from './scenarios';
export { yourScenarioConfig } from './config';
```

#### 2. Register Your Scenario
Add your scenario to `src/lib/scenarioManager.ts`:

```typescript
import { yourScenarioConfig } from '../data/your-scenario';

// In the constructor:
this.scenarios.set('your-scenario-id', yourScenarioConfig);
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **Tailwind CSS** - Styling
- **shadcn/ui** - UI components
- **Lucide React** - Icons

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── ScenarioCard.tsx
│   ├── ScenarioOptionCard.tsx
│   ├── GameOver.tsx
│   ├── GameStats.tsx
│   ├── Layout.tsx
│   └── ...
├── data/               # Game scenarios and data
│   ├── fitflow/        # Fitness app scenario
│   ├── restaurant/     # Restaurant scenario
│   └── template/       # Template for new scenarios
├── lib/                # Utility functions
│   ├── scenarioManager.ts
│   └── utils.ts
├── pages/              # Page components
│   ├── Games.tsx       # Games navigator
│   ├── Game.tsx        # Individual game page
│   ├── Courses.tsx
│   ├── Home.tsx
│   └── Profile.tsx
├── types/              # TypeScript type definitions
└── hooks/              # Custom React hooks
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
