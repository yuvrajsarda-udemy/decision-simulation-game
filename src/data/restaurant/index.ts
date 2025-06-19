import { Scenario, GameState, ScenarioConfig } from '@/types/game';

export const restaurantScenarios: Scenario[] = [
  {
    id: 1,
    title: "Location Decision",
    description: "You've saved $20,000 to open your first restaurant. You need to choose between a high-traffic downtown location or a quieter suburban area.",
    decisions: [
      {
        text: "Downtown location",
        description: "High rent but lots of foot traffic",
        effects: { money: -15000, users: 50, productQuality: 5 }
      },
      {
        text: "Suburban location",
        description: "Lower rent but need to build customer base",
        effects: { money: -8000, users: 20, mentalPeace: 5 }
      },
      {
        text: "Food truck first",
        description: "Test the market with lower investment",
        effects: { money: -5000, users: 30, health: -5 }
      }
    ]
  },
  {
    id: 2,
    title: "Menu Planning",
    description: "You need to decide on your restaurant's focus. Your chef suggests either a specialized cuisine or a diverse menu.",
    decisions: [
      {
        text: "Specialized cuisine (Italian)",
        description: "Focus on one type of food for expertise",
        effects: { productQuality: 15, teamMorale: 5, users: 25 }
      },
      {
        text: "Diverse menu",
        description: "Offer something for everyone",
        effects: { productQuality: 8, users: 40, mentalPeace: -5 }
      },
      {
        text: "Seasonal menu",
        description: "Change menu based on local ingredients",
        effects: { productQuality: 12, money: -2000, teamMorale: 8 }
      }
    ]
  },
  {
    id: 3,
    title: "Staffing Decision",
    description: "Your restaurant is getting busy with 80 customers per day. You need to decide how to handle the workload.",
    decisions: [
      {
        text: "Hire full-time staff",
        description: "Invest in dedicated employees",
        effects: { money: -3000, teamMorale: 10, productQuality: 8 }
      },
      {
        text: "Use part-time workers",
        description: "Flexible staffing for busy periods",
        effects: { money: -1500, teamMorale: 3, users: 15 }
      },
      {
        text: "Work longer hours yourself",
        description: "Save money but risk burnout",
        effects: { money: 0, health: -10, mentalPeace: -8 }
      }
    ]
  }
];

export const restaurantConfig: ScenarioConfig = {
  id: 'restaurant',
  name: 'Restaurant Empire',
  description: 'Build your restaurant from a small eatery to a culinary empire.',
  initialGameState: {
    money: 20000,
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
  scenarios: restaurantScenarios,
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
    productQuality: 90
  }
}; 