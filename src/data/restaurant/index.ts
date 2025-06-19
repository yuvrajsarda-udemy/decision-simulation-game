import { Scenario, GameState, Game } from '@/types/game';

export const restaurantScenarios: Scenario[] = [
  {
    id: 1,
    title: "Location Decision",
    description: "You've saved $20,000 to open your first restaurant. You need to choose between a high-traffic downtown location or a quieter suburban area.",
    category: 'early',
    weight: 1.2,
    conditions: {
      minTimeUnit: 1,
      maxTimeUnit: 5
    },
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
    category: 'early',
    weight: 1.1,
    conditions: {
      minTimeUnit: 2,
      maxTimeUnit: 8
    },
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
    title: "Staffing Crisis",
    description: "Your restaurant is getting busy but two of your servers quit unexpectedly. You're short-staffed during peak hours.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minUsers: 30,
      maxUsers: 100,
      minTimeUnit: 10
    },
    decisions: [
      {
        text: "Work extra shifts yourself",
        description: "Save money but risk burnout",
        effects: { money: 500, health: -10, mentalPeace: -8 }
      },
      {
        text: "Hire temporary staff quickly",
        description: "Pay premium for immediate help",
        effects: { money: -2000, teamMorale: -3, users: 10 }
      },
      {
        text: "Reduce hours temporarily",
        description: "Focus on quality over quantity",
        effects: { money: -500, productQuality: 5, users: -5 }
      }
    ]
  },
  {
    id: 4,
    title: "Food Critic Visit",
    description: "A local food critic wants to review your restaurant. This could make or break your reputation in the community.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minUsers: 50,
      maxUsers: 150,
      minProductQuality: 60
    },
    decisions: [
      {
        text: "Pull out all the stops",
        description: "Create special dishes and perfect service",
        effects: { money: -3000, productQuality: 15, mentalPeace: -5, users: 40 }
      },
      {
        text: "Keep it simple and consistent",
        description: "Show what customers normally experience",
        effects: { productQuality: 8, mentalPeace: 3, users: 25 }
      },
      {
        text: "Politely decline the review",
        description: "Wait until you're more established",
        effects: { mentalPeace: 5, users: -10 }
      }
    ]
  },
  {
    id: 5,
    title: "Supplier Price Hike",
    description: "Your main food supplier increased prices by 25% due to inflation. You need to decide how to handle the increased costs.",
    category: 'crisis',
    weight: 1.3,
    conditions: {
      minUsers: 40,
      maxUsers: 120,
      minTimeUnit: 15
    },
    decisions: [
      {
        text: "Raise menu prices",
        description: "Pass costs to customers",
        effects: { money: 1000, users: -15, productQuality: -3 }
      },
      {
        text: "Find new suppliers",
        description: "Research and negotiate better deals",
        effects: { money: -500, mentalPeace: -5, productQuality: 5 }
      },
      {
        text: "Absorb the costs",
        description: "Keep prices the same, reduce profits",
        effects: { money: -1500, teamMorale: 5, users: 10 }
      }
    ]
  },
  {
    id: 6,
    title: "Expansion Opportunity",
    description: "A successful restaurant owner wants to partner with you to open a second location. They'll provide funding and expertise.",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minUsers: 80,
      maxUsers: 200,
      minMoney: 5000,
      minTimeUnit: 25
    },
    decisions: [
      {
        text: "Accept the partnership",
        description: "Fast expansion with shared risk",
        effects: { money: 10000, mentalPeace: -5, teamMorale: 8, users: 60 }
      },
      {
        text: "Decline and focus on current location",
        description: "Perfect what you have first",
        effects: { productQuality: 10, mentalPeace: 5, teamMorale: 3 }
      },
      {
        text: "Propose a different partnership model",
        description: "Keep more control while getting help",
        effects: { money: 5000, mentalPeace: -3, teamMorale: 5, users: 30 }
      }
    ]
  },
  {
    id: 7,
    title: "Kitchen Fire",
    description: "A small fire broke out in your kitchen during service. No one was hurt, but you need to close for repairs.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minUsers: 60,
      maxUsers: 180,
      minTimeUnit: 20
    },
    decisions: [
      {
        text: "Quick repairs and reopen ASAP",
        description: "Minimize downtime but rush the work",
        effects: { money: -5000, health: -5, productQuality: -5, users: 20 }
      },
      {
        text: "Thorough safety inspection and repairs",
        description: "Take time to do it right",
        effects: { money: -8000, mentalPeace: 5, productQuality: 10, users: -10 }
      },
      {
        text: "Temporary pop-up location",
        description: "Keep serving while main location repairs",
        effects: { money: -3000, mentalPeace: -8, users: 15 }
      }
    ]
  },
  {
    id: 8,
    title: "Celebrity Chef Interest",
    description: "A well-known chef wants to collaborate on a special event at your restaurant. This could bring major publicity.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minUsers: 100,
      maxUsers: 250,
      minProductQuality: 70,
      minTimeUnit: 30
    },
    decisions: [
      {
        text: "Host the collaboration event",
        description: "Big publicity boost but complex logistics",
        effects: { money: -5000, productQuality: 12, mentalPeace: -10, users: 80 }
      },
      {
        text: "Decline and stay focused",
        description: "Avoid distraction from core business",
        effects: { mentalPeace: 5, productQuality: 5, users: 10 }
      },
      {
        text: "Propose a smaller collaboration",
        description: "Test the waters with a simpler event",
        effects: { money: -2000, productQuality: 8, mentalPeace: -3, users: 40 }
      }
    ]
  },
  {
    id: 9,
    title: "Delivery Service Partnership",
    description: "Uber Eats wants to partner with your restaurant for delivery. This could significantly increase your reach but comes with fees.",
    category: 'growth',
    weight: 1.2,
    conditions: {
      minUsers: 80,
      maxUsers: 200,
      minTimeUnit: 20
    },
    decisions: [
      {
        text: "Sign up for delivery",
        description: "Expand reach but pay commission fees",
        effects: { money: 2000, users: 50, mentalPeace: -3 }
      },
      {
        text: "Start your own delivery service",
        description: "Keep all profits but more work",
        effects: { money: -3000, mentalPeace: -8, users: 30 }
      },
      {
        text: "Stay dine-in only",
        description: "Focus on the in-restaurant experience",
        effects: { productQuality: 8, teamMorale: 5, users: 15 }
      }
    ]
  },
  {
    id: 10,
    title: "Restaurant Empire Decision",
    description: "You've built a successful restaurant and have multiple expansion offers. Time to decide your next big move.",
    category: 'late',
    weight: 1.0,
    conditions: {
      minUsers: 150,
      maxUsers: 500,
      minMoney: 10000,
      minTimeUnit: 40
    },
    decisions: [
      {
        text: "Open multiple locations",
        description: "Scale quickly but risk quality control",
        effects: { money: 20000, mentalPeace: -10, teamMorale: 10, users: 100 }
      },
      {
        text: "Franchise your concept",
        description: "Let others run locations for you",
        effects: { money: 15000, mentalPeace: 5, teamMorale: 8, users: 80 }
      },
      {
        text: "Keep it small and perfect",
        description: "Focus on being the best single location",
        effects: { productQuality: 15, mentalPeace: 10, teamMorale: 12, users: 30 }
      }
    ]
  }
];

export const restaurantGame: Game = {
  id: 'restaurant',
  name: 'Restaurant Empire: From Kitchen to Kingdom',
  description: 'Build your restaurant empire from a single location to a culinary phenomenon.',
  // UI Metadata
  emoji: '🍽️',
  colors: 'from-orange-500/10 to-red-500/10 border-orange-200',
  vision: "You're opening your dream restaurant, a place where culinary excellence meets business savvy. Create memorable dining experiences while building a profitable business.",
  mission: "Build a successful restaurant empire while managing costs, staff, and customer satisfaction. Every decision affects your restaurant's reputation and profitability.",
  goal: (winMoney: number, winQuality: number) => 
    `Reach $${(winMoney / 1000).toFixed(0)}K in revenue with exceptional food quality (${winQuality}%+) to become a culinary success.`,
  // Game Configuration
  initialGameState: {
    timeUnit: 1,
    money: 20000,
    health: 100,
    mentalPeace: 100,
    teamMorale: 100,
    productQuality: 50,
    users: 0,
    currentScenario: 0,
    gameOver: false,
    endReason: '',
    seenScenarios: [],
    scenarioHistory: []
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