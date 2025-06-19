import { Scenario, GameState, Game } from '@/types/game';

export const restaurantScenarios: Scenario[] = [
  // EARLY GAME (Time Units 1-10) - Foundation
  {
    id: 1,
    title: "The Dream Begins",
    description: "You've saved $25,000 and finally decided to pursue your dream of opening a restaurant. The question is: what type of restaurant will it be?",
    category: 'early',
    weight: 1.5,
    conditions: {
      minTimeUnit: 1,
      maxTimeUnit: 2,
      excludedPreviousScenarios: [1]
    },
    decisions: [
      {
        text: "Italian Trattoria",
        description: "Authentic Italian cuisine with family recipes",
        effects: { productQuality: 20, money: -20000, mentalPeace: 5 }
      },
      {
        text: "Modern American Bistro",
        description: "Contemporary comfort food with local ingredients",
        effects: { productQuality: 15, money: -18000, users: 10 }
      },
      {
        text: "Food Truck First",
        description: "Test the market with lower investment",
        effects: { money: -8000, users: 15, health: -5 }
      }
    ]
  },
  {
    id: 2,
    title: "Location Hunt",
    description: "You need to find the perfect location for your restaurant. The real estate agent shows you three very different options.",
    category: 'early',
    weight: 1.3,
    conditions: {
      minTimeUnit: 2,
      maxTimeUnit: 4,
      requiredPreviousScenarios: [1],
      excludedPreviousScenarios: [2]
    },
    decisions: [
      {
        text: "Downtown high-traffic area",
        description: "Expensive rent but guaranteed foot traffic",
        effects: { money: -12000, users: 40, mentalPeace: -5 }
      },
      {
        text: "Quiet neighborhood spot",
        description: "Lower rent but need to build reputation",
        effects: { money: -6000, users: 15, mentalPeace: 8 }
      },
      {
        text: "Suburban strip mall",
        description: "Moderate rent with parking and visibility",
        effects: { money: -8000, users: 25, teamMorale: 5 }
      }
    ]
  },
  {
    id: 3,
    title: "First Week Status",
    description: "🎉 Your restaurant is officially open! The first week has been a whirlwind of emotions. You've served your first customers, made your first mistakes, and learned more than you ever expected. The dream is becoming reality.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minTimeUnit: 7,
      maxTimeUnit: 8,
      requiredPreviousScenarios: [2],
      excludedPreviousScenarios: [3]
    },
    decisions: []
  },
  {
    id: 4,
    title: "Kitchen Nightmare",
    description: "Your head chef just quit on the spot during dinner service! The kitchen is in chaos, orders are backing up, and customers are getting angry. You need to act fast.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minTimeUnit: 8,
      maxTimeUnit: 12,
      minUsers: 20,
      requiredPreviousScenarios: [3],
      excludedPreviousScenarios: [4]
    },
    decisions: [
      {
        text: "Jump in and cook yourself",
        description: "Save the night but risk your health",
        effects: { health: -15, mentalPeace: -10, productQuality: -5, users: 10 }
      },
      {
        text: "Call in a temporary chef",
        description: "Pay premium for immediate help",
        effects: { money: -3000, teamMorale: -5, users: 5 }
      },
      {
        text: "Close early and regroup",
        description: "Take the hit to fix the problem properly",
        effects: { money: -1000, users: -10, mentalPeace: 5 }
      }
    ]
  },
  {
    id: 5,
    title: "Food Critic Surprise",
    description: "A local food critic walks in unannounced! You recognize her from the newspaper. This could make or break your restaurant's reputation in the community.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minTimeUnit: 10,
      maxTimeUnit: 15,
      minUsers: 30,
      minProductQuality: 40,
      requiredPreviousScenarios: [4],
      excludedPreviousScenarios: [5]
    },
    decisions: [
      {
        text: "Pull out all the stops",
        description: "Create special dishes and perfect service",
        effects: { money: -2000, productQuality: 15, mentalPeace: -8, users: 35 }
      },
      {
        text: "Keep it simple and consistent",
        description: "Show what customers normally experience",
        effects: { productQuality: 8, mentalPeace: 3, users: 20 }
      },
      {
        text: "Pretend you don't recognize her",
        description: "Treat her like any other customer",
        effects: { mentalPeace: 5, users: 10 }
      }
    ]
  },
  {
    id: 6,
    title: "50 Customers Milestone",
    description: "🎉 You've served 50 customers! Looking at your reservation book, you can't help but smile. Each name represents someone who chose your restaurant over all the others in town. The word is spreading.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 50,
      maxUsers: 60,
      requiredPreviousScenarios: [5],
      excludedPreviousScenarios: [6]
    },
    decisions: []
  },
  {
    id: 7,
    title: "Supplier Price Hike",
    description: "Your main food supplier just increased prices by 30% due to inflation. Your profit margins are already thin, and this could break you.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minTimeUnit: 12,
      maxTimeUnit: 18,
      minUsers: 40,
      requiredPreviousScenarios: [6],
      excludedPreviousScenarios: [7]
    },
    decisions: [
      {
        text: "Raise menu prices",
        description: "Pass costs to customers",
        effects: { money: 1500, users: -20, productQuality: -5 }
      },
      {
        text: "Find new suppliers",
        description: "Research and negotiate better deals",
        effects: { money: -1000, mentalPeace: -5, productQuality: 8 }
      },
      {
        text: "Absorb the costs temporarily",
        description: "Keep prices same, reduce profits",
        effects: { money: -2000, teamMorale: 8, users: 15 }
      }
    ]
  },
  {
    id: 8,
    title: "Health Inspector Visit",
    description: "The health inspector shows up for a surprise inspection! You're confident in your kitchen, but you know how strict they can be about the smallest details.",
    category: 'crisis',
    weight: 1.3,
    conditions: {
      minTimeUnit: 15,
      maxTimeUnit: 25,
      minUsers: 50,
      requiredPreviousScenarios: [7],
      excludedPreviousScenarios: [8]
    },
    decisions: [
      {
        text: "Show them everything proudly",
        description: "Confident in your cleanliness standards",
        effects: { productQuality: 10, mentalPeace: 5, users: 15 }
      },
      {
        text: "Try to delay the inspection",
        description: "Ask for time to prepare",
        effects: { mentalPeace: -5, users: -10, productQuality: -3 }
      },
      {
        text: "Offer them a free meal",
        description: "Show hospitality while they inspect",
        effects: { money: -200, productQuality: 5, users: 8 }
      }
    ]
  },
  {
    id: 9,
    title: "Celebrity Sighting",
    description: "A local celebrity just walked into your restaurant! They're taking photos and posting on social media. This could be huge publicity for your place.",
    category: 'opportunity',
    weight: 1.2,
    conditions: {
      minTimeUnit: 18,
      maxTimeUnit: 28,
      minUsers: 60,
      minProductQuality: 50,
      requiredPreviousScenarios: [8],
      excludedPreviousScenarios: [9]
    },
    decisions: [
      {
        text: "Give them VIP treatment",
        description: "Special attention and complimentary items",
        effects: { money: -500, users: 40, mentalPeace: 5 }
      },
      {
        text: "Treat them like any customer",
        description: "Maintain your standards for everyone",
        effects: { productQuality: 8, users: 25, teamMorale: 5 }
      },
      {
        text: "Ask for a photo together",
        description: "Get publicity for your restaurant",
        effects: { users: 30, mentalPeace: 3 }
      }
    ]
  },
  {
    id: 10,
    title: "100 Customers Milestone",
    description: "🎉 100 customers served! Your restaurant is becoming a real destination. Regulars are starting to form, and you're getting repeat business. The dream is working.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 100,
      maxUsers: 110,
      requiredPreviousScenarios: [9],
      excludedPreviousScenarios: [10]
    },
    decisions: []
  },
  {
    id: 11,
    title: "Kitchen Fire",
    description: "A small fire breaks out in your kitchen during the dinner rush! No one is hurt, but you need to evacuate and close for the night. This is a major setback.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minTimeUnit: 20,
      maxTimeUnit: 30,
      minUsers: 80,
      requiredPreviousScenarios: [10],
      excludedPreviousScenarios: [11]
    },
    decisions: [
      {
        text: "Quick repairs and reopen ASAP",
        description: "Minimize downtime but rush the work",
        effects: { money: -5000, health: -10, productQuality: -8, users: 15 }
      },
      {
        text: "Thorough safety inspection",
        description: "Take time to do it right",
        effects: { money: -8000, mentalPeace: 8, productQuality: 12, users: -20 }
      },
      {
        text: "Temporary pop-up location",
        description: "Keep serving while main location repairs",
        effects: { money: -3000, mentalPeace: -5, users: 10 }
      }
    ]
  },
  {
    id: 12,
    title: "Staff Rebellion",
    description: "Your servers are threatening to quit! They're complaining about long hours, low tips, and feeling underappreciated. You need to address their concerns.",
    category: 'crisis',
    weight: 1.3,
    conditions: {
      minTimeUnit: 25,
      maxTimeUnit: 35,
      minUsers: 90,
      requiredPreviousScenarios: [11],
      excludedPreviousScenarios: [12]
    },
    decisions: [
      {
        text: "Give everyone a raise",
        description: "Show appreciation with money",
        effects: { money: -3000, teamMorale: 15, users: 10 }
      },
      {
        text: "Improve working conditions",
        description: "Better schedules and benefits",
        effects: { money: -1500, teamMorale: 12, mentalPeace: 5 }
      },
      {
        text: "Hire new staff",
        description: "Replace the complainers",
        effects: { money: -1000, teamMorale: -10, productQuality: -5 }
      }
    ]
  },
  {
    id: 13,
    title: "Local TV Feature",
    description: "A local TV station wants to feature your restaurant in their 'Hidden Gems' segment! This could bring massive exposure and new customers.",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minTimeUnit: 30,
      maxTimeUnit: 40,
      minUsers: 100,
      minProductQuality: 60,
      requiredPreviousScenarios: [12],
      excludedPreviousScenarios: [13]
    },
    decisions: [
      {
        text: "Go all out for the cameras",
        description: "Create special dishes and perfect presentation",
        effects: { money: -3000, productQuality: 15, mentalPeace: -8, users: 60 }
      },
      {
        text: "Keep it authentic",
        description: "Show the real restaurant experience",
        effects: { productQuality: 8, mentalPeace: 5, users: 40 }
      },
      {
        text: "Decline the opportunity",
        description: "Not ready for that kind of exposure",
        effects: { mentalPeace: 8, users: -5 }
      }
    ]
  },
  {
    id: 14,
    title: "200 Customers Milestone",
    description: "🎉 200 customers! Your restaurant is now a local favorite. You're getting referrals, positive reviews, and even some food bloggers are taking notice. Success feels real.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 200,
      maxUsers: 220,
      requiredPreviousScenarios: [13],
      excludedPreviousScenarios: [14]
    },
    decisions: []
  },
  {
    id: 15,
    title: "Competition Moves In",
    description: "A new restaurant just opened across the street! They're offering similar cuisine at lower prices. Your regular customers are starting to try them out.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minTimeUnit: 35,
      maxTimeUnit: 45,
      minUsers: 150,
      requiredPreviousScenarios: [14],
      excludedPreviousScenarios: [15]
    },
    decisions: [
      {
        text: "Lower your prices",
        description: "Match their pricing to compete",
        effects: { money: -2000, users: 20, productQuality: -5 }
      },
      {
        text: "Focus on quality and service",
        description: "Let your reputation speak for itself",
        effects: { productQuality: 12, teamMorale: 8, users: 15 }
      },
      {
        text: "Add unique menu items",
        description: "Differentiate with special dishes",
        effects: { money: -1000, productQuality: 10, users: 25 }
      }
    ]
  },
  {
    id: 16,
    title: "Expansion Opportunity",
    description: "A successful restaurant group wants to partner with you to open a second location! They'll provide funding and expertise, but you'll share control.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minTimeUnit: 40,
      maxTimeUnit: 50,
      minUsers: 180,
      minMoney: 5000,
      requiredPreviousScenarios: [15],
      excludedPreviousScenarios: [16]
    },
    decisions: [
      {
        text: "Accept the partnership",
        description: "Fast expansion with shared risk",
        effects: { money: 15000, mentalPeace: -8, teamMorale: 10, users: 80 }
      },
      {
        text: "Decline and stay independent",
        description: "Keep full control of your vision",
        effects: { productQuality: 15, mentalPeace: 8, teamMorale: 5 }
      },
      {
        text: "Propose a different deal",
        description: "Keep more control while getting help",
        effects: { money: 8000, mentalPeace: -3, teamMorale: 8, users: 40 }
      }
    ]
  },
  {
    id: 17,
    title: "300 Customers Milestone",
    description: "🎉 300 customers! You're not just a restaurant anymore - you're a local institution. People are planning their weekends around reservations at your place. The dream has exceeded expectations.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 300,
      maxUsers: 320,
      requiredPreviousScenarios: [16],
      excludedPreviousScenarios: [17]
    },
    decisions: []
  },
  {
    id: 18,
    title: "Food Network Interest",
    description: "A producer from Food Network contacted you! They want to feature your restaurant on their show. This could bring national exposure and tourists from across the country.",
    category: 'opportunity',
    weight: 1.5,
    conditions: {
      minTimeUnit: 45,
      maxTimeUnit: 55,
      minUsers: 250,
      minProductQuality: 70,
      requiredPreviousScenarios: [17],
      excludedPreviousScenarios: [18]
    },
    decisions: [
      {
        text: "Go all in for national TV",
        description: "Create spectacular dishes and perfect everything",
        effects: { money: -8000, productQuality: 20, mentalPeace: -15, users: 120 }
      },
      {
        text: "Keep it authentic",
        description: "Show the real restaurant experience",
        effects: { productQuality: 10, mentalPeace: 5, users: 80 }
      },
      {
        text: "Decline the opportunity",
        description: "Not ready for that level of exposure",
        effects: { mentalPeace: 10, users: -10 }
      }
    ]
  },
  {
    id: 19,
    title: "Restaurant Empire Decision",
    description: "You've built a successful restaurant and have multiple expansion offers. It's time to decide the future of your culinary empire.",
    category: 'late',
    weight: 1.0,
    conditions: {
      minTimeUnit: 50,
      maxTimeUnit: 60,
      minUsers: 300,
      minMoney: 10000,
      requiredPreviousScenarios: [18],
      excludedPreviousScenarios: [19]
    },
    decisions: [
      {
        text: "Open multiple locations",
        description: "Scale quickly but risk quality control",
        effects: { money: 25000, mentalPeace: -10, teamMorale: 15, users: 150 }
      },
      {
        text: "Franchise your concept",
        description: "Let others run locations for you",
        effects: { money: 20000, mentalPeace: 5, teamMorale: 12, users: 100 }
      },
      {
        text: "Keep it small and perfect",
        description: "Focus on being the best single location",
        effects: { productQuality: 25, mentalPeace: 15, teamMorale: 20, users: 50 }
      }
    ]
  },
  {
    id: 20,
    title: "Culinary Success",
    description: "🎉 You've done it! Your restaurant is a culinary success story. From a simple dream to a thriving business, you've created something special. The journey has been incredible.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minTimeUnit: 55,
      maxTimeUnit: 60,
      minUsers: 350,
      minProductQuality: 80,
      requiredPreviousScenarios: [19],
      excludedPreviousScenarios: [20]
    },
    decisions: []
  }
];

export const restaurantGame: Game = {
  id: 'restaurant',
  name: 'Restaurant Dreams: From Kitchen to Kingdom',
  description: 'Build your restaurant empire from a single location to a culinary phenomenon.',
  // UI Metadata
  emoji: '🍽️',
  colors: 'from-orange-500/10 to-red-500/10 border-orange-200',
  vision: "You're opening your dream restaurant, a place where culinary excellence meets business savvy. Create memorable dining experiences while building a profitable business.",
  mission: "Build a successful restaurant empire while managing costs, staff, and customer satisfaction. Every decision affects your restaurant's reputation and profitability.",
  goal: (winMoney: number, winQuality: number) => 
    `Reach $${(winMoney / 1000).toFixed(0)}K in revenue with exceptional food quality (${winQuality}%+) to become a culinary success.`,
  timeUnitType: "Week",
  // Game Configuration
  initialGameState: {
    timeUnit: 1,
    money: 25000,
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
    money: 50000,
    productQuality: 85
  }
}; 