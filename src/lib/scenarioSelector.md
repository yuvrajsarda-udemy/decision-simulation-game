# Dynamic Scenario Selection System

## Overview

The game now uses a smart scenario selection system that considers both randomness and player state to determine which scenarios are shown. This creates more varied and personalized gameplay experiences.

## How It Works

### 1. State-Based Conditions
Each scenario can have conditions that determine when it's available:
- **Money ranges**: `minMoney`, `maxMoney`
- **User count ranges**: `minUsers`, `maxUsers`
- **Health ranges**: `minHealth`, `maxHealth`
- **Mental peace ranges**: `minMentalPeace`, `maxMentalPeace`
- **Team morale ranges**: `minTeamMorale`, `maxTeamMorale`
- **Product quality ranges**: `minProductQuality`, `maxProductQuality`
- **Day ranges**: `minDay`, `maxDay`
- **Required previous scenarios**: `requiredPreviousScenarios`
- **Excluded previous scenarios**: `excludedPreviousScenarios`

### 2. Scenario Categories
Scenarios are categorized to help with selection:
- `early`: Early game scenarios (days 1-10)
- `mid`: Mid game scenarios (days 10-30)
- `late`: Late game scenarios (days 30+)
- `crisis`: Scenarios that appear when player is struggling
- `opportunity`: Scenarios that appear when player is doing well
- `growth`: Scenarios focused on expansion and scaling

### 3. Weighted Selection
Each scenario has a base weight that gets adjusted based on:
- **Unseen scenarios**: 2x weight boost for scenarios the player hasn't seen
- **Recent history**: 0.3x weight for scenarios seen in the last 5 days
- **Game state**: Additional adjustments based on current player stats

### 4. Crisis and Opportunity Detection
The system automatically detects when to show crisis or opportunity scenarios:
- **Crisis triggers**: Low health (<30), low money (<1000), low team morale (<30), etc.
- **Opportunity triggers**: High stats across the board (>70 for most metrics)

## Example Scenario Configuration

```typescript
{
  id: 5,
  title: "Burnout Warning Signs",
  description: "You've been coding 12 hours a day for 3 months...",
  category: 'crisis',
  weight: 1.6,
  conditions: {
    minUsers: 200,
    maxUsers: 400,
    minDay: 20,
    maxHealth: 70  // Only shows when health is already low
  },
  decisions: [...]
}
```

## Benefits

1. **Variety**: Players see different scenarios each playthrough
2. **Relevance**: Scenarios appear when they make sense contextually
3. **Progression**: Early scenarios only appear early, late scenarios only appear late
4. **Responsiveness**: Crisis scenarios appear when the player is struggling
5. **Discovery**: Unseen scenarios are prioritized to show new content

## Configuration Options

When calling `ScenarioSelector.selectNextScenario()`, you can pass options:
- `forceRandom`: Force pure random selection (10% chance by default)
- `biasTowardsUnseen`: Prioritize unseen scenarios (default: true)
- `categoryPreference`: Prefer scenarios of a specific category

## Debug Information

In development mode, a debug panel shows:
- Current scenario details
- Seen vs total scenarios
- Current game state
- Selection factors

This helps understand why specific scenarios are being chosen. 