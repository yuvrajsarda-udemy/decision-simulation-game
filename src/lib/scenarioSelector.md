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

### 2. Scenario Uniqueness System
Most scenarios are designed to happen only once per playthrough, creating a linear story progression:

- **`excludedPreviousScenarios: [id]`**: Prevents a scenario from appearing if it has already been seen
- **`requiredPreviousScenarios: [id]`**: Ensures logical story progression by requiring specific scenarios to have occurred first

This system ensures that:
- Each milestone in the startup journey happens exactly once
- Story events follow a logical sequence (can't get user feedback before starting to code)
- Players experience a complete, non-repetitive narrative arc

### 3. Scenario Categories
Scenarios are categorized to help with selection:
- `early`: Early game scenarios (days 1-10) - Foundation building
- `mid`: Mid game scenarios (days 10-30) - Growth and challenges
- `late`: Late game scenarios (days 30+) - Scaling and success
- `crisis`: Scenarios that appear when player is struggling
- `opportunity`: Scenarios that appear when player is doing well
- `growth`: Scenarios focused on expansion and scaling

### 4. Weighted Selection
Each scenario has a base weight that gets adjusted based on:
- **Unseen scenarios**: 2x weight boost for scenarios the player hasn't seen
- **Recent history**: 0.3x weight for scenarios seen in the last 5 days
- **Game state**: Additional adjustments based on current player stats

### 5. Crisis and Opportunity Detection
The system automatically detects when to show crisis or opportunity scenarios:
- **Crisis triggers**: Low health (<30), low money (<1000), low team morale (<30), etc.
- **Opportunity triggers**: High stats across the board (>70 for most metrics)

## Example Scenario Configuration

```typescript
{
  id: 5,
  title: "The Coffee Shop Meeting",
  description: "You're working at your local coffee shop when a stranger notices your FitFlow app...",
  category: 'opportunity',
  weight: 1.3,
  conditions: {
    minDay: 6,
    maxDay: 12,
    minUsers: 40,
    maxUsers: 150,
    requiredPreviousScenarios: [3], // Must have launched on App Store
    excludedPreviousScenarios: [5]  // Can only happen once
  },
  decisions: [...]
}
```

## FitFlow Game Structure

The FitFlow game demonstrates the full potential of this system with 20 unique scenarios:

### Early Game (Days 1-10) - Foundation Building
- **Scenario 1**: The First Line of Code - Starting the development journey
- **Scenario 2**: Your First User - Getting initial feedback
- **Scenario 3**: The App Store Decision - Launching the MVP
- **Scenario 4**: The First Bad Review - Handling early criticism
- **Scenario 5**: The Coffee Shop Meeting - Meeting an influencer

### Mid Game (Days 10-30) - Growth & Challenges
- **Scenario 6**: The Server Costs Hit - Infrastructure scaling
- **Scenario 7**: The Feature Request Flood - User feedback management
- **Scenario 21**: The Tech Blog Feature - Media exposure opportunity
- **Scenario 8**: The Competitor Appears - Market competition
- **Scenario 9**: The Burnout Warning - Work-life balance
- **Scenario 10**: The Viral Moment - Sudden growth spike
- **Scenario 11**: The Team Decision - First hiring choice
- **Scenario 12**: The Data Breach Scare - Security challenges

### Late Game (Days 30+) - Scaling & Success
- **Scenario 13**: The Investment Pitch - VC funding opportunity
- **Scenario 14**: The Platform Expansion - Android development
- **Scenario 15**: The Corporate Partnership - B2B opportunities
- **Scenario 16**: The Team Conflict - Managing team dynamics
- **Scenario 17**: The International Launch - Global expansion
- **Scenario 18**: The Acquisition Offer - Exit opportunity
- **Scenario 19**: The Legacy Decision - Long-term planning
- **Scenario 20**: The Future of Fitness - Industry leadership

## Benefits

1. **Story-Driven Experience**: Each scenario builds on previous ones, creating a cohesive narrative
2. **No Repetition**: Players see each milestone exactly once per playthrough
3. **Logical Progression**: Events happen in realistic startup sequence
4. **Replayability**: Different decisions lead to different outcomes, even with same scenarios
5. **Variety**: Mix of decision points and status updates keeps the game engaging
6. **Responsiveness**: Crisis scenarios appear when the player is struggling
7. **Discovery**: Unseen scenarios are prioritized to show new content
8. **Milestone Feedback**: Status scenarios celebrate achievements and provide narrative context

## Scenario Types

### Decision Scenarios
- Require player choices
- Have effects on game stats
- Drive the main gameplay

### Status Scenarios
- No decisions required
- Celebrate milestones (users, revenue, time)
- Provide narrative context and reflection
- Help pace the game and mark progress
- Examples:
  - First week milestone
  - Reaching 100 users
  - First $1000 in revenue
  - Monthly reviews

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
- Scenario dependencies and exclusions

This helps understand why specific scenarios are being chosen and ensures the story progression is working correctly. 