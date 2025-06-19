import { Scenario, GameState, Game } from '@/types/game';

export const fitflowScenarios: Scenario[] = [
  {
    id: 1,
    title: "First Employee Decision",
    description: "Your fitness tracking app 'FitFlow' has 100 users and you're building alone from your apartment. You just saved enough to hire your first part-time contractor. What's your priority?",
    category: 'early',
    weight: 1.2,
    conditions: {
      minUsers: 50,
      maxUsers: 200,
      minDay: 1,
      maxDay: 10
    },
    decisions: [
      {
        text: "Hire a part-time developer",
        description: "Get help with iOS app development and bug fixes",
        effects: { money: -1500, productQuality: 8, mentalPeace: 5, users: 10 }
      },
      {
        text: "Hire a social media manager",
        description: "Focus on growing your Instagram and TikTok presence",
        effects: { money: -800, teamMorale: 5, mentalPeace: 3, users: 25 }
      },
      {
        text: "Keep bootstrapping solo",
        description: "Save money but work longer hours on everything",
        effects: { money: 0, mentalPeace: -8, health: -5 }
      }
    ]
  },
  {
    id: 2,
    title: "App Store Feature Opportunity",
    description: "Apple wants to feature FitFlow in the App Store's 'New Apps We Love' section, but they need you to add Apple Health integration within 2 weeks. You have 150 users now.",
    category: 'opportunity',
    weight: 1.5,
    conditions: {
      minUsers: 100,
      maxUsers: 300,
      minProductQuality: 40
    },
    decisions: [
      {
        text: "Rush to add Apple Health integration",
        description: "Work nights and weekends to meet their deadline",
        effects: { health: -10, mentalPeace: -8, productQuality: -3, users: 80 }
      },
      {
        text: "Politely decline and focus on core features",
        description: "Miss the opportunity but maintain app quality",
        effects: { productQuality: 5, mentalPeace: 2, users: 15 }
      },
      {
        text: "Ask for a 1-month extension",
        description: "Try to negotiate more time for proper implementation",
        effects: { mentalPeace: -5, productQuality: 8, users: 40 }
      }
    ]
  },
  {
    id: 3,
    title: "Server Costs Rising",
    description: "Your 200 users are actively tracking workouts, and your AWS bill jumped from $50 to $200 this month. The free tier is over and you need to optimize or pay more.",
    category: 'crisis',
    weight: 1.3,
    conditions: {
      minUsers: 150,
      maxUsers: 400,
      minMoney: 500
    },
    decisions: [
      {
        text: "Optimize database and images",
        description: "Spend time reducing server costs technically",
        effects: { money: 100, mentalPeace: -5, productQuality: 3 }
      },
      {
        text: "Just pay the higher bills for now",
        description: "Focus on features instead of optimization",
        effects: { money: -200, productQuality: 8, users: 20 }
      },
      {
        text: "Add a premium subscription tier",
        description: "Introduce $4.99/month premium features early",
        effects: { money: 300, teamMorale: -3, users: -10 }
      }
    ]
  },
  {
    id: 4,
    title: "MyFitnessPal Competition",
    description: "MyFitnessPal launched a workout tracking feature similar to FitFlow. Several users are asking why they should use your app instead of the established giant.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minUsers: 200,
      maxUsers: 500,
      minDay: 15
    },
    decisions: [
      {
        text: "Build unique AI workout recommendations",
        description: "Differentiate with personalized AI coaching features",
        effects: { money: -1000, productQuality: 12, mentalPeace: -10, users: 30 }
      },
      {
        text: "Focus on community features",
        description: "Build workout buddy matching and challenges",
        effects: { productQuality: 8, teamMorale: 5, users: 25 }
      },
      {
        text: "Pivot to nutrition tracking",
        description: "Abandon workout tracking, focus on meal planning",
        effects: { mentalPeace: -15, productQuality: -8, users: -20 }
      }
    ]
  },
  {
    id: 5,
    title: "Burnout Warning Signs",
    description: "You've been coding 12 hours a day for 3 months. You now have 280 users but you're getting headaches and your girlfriend is concerned about your health.",
    category: 'crisis',
    weight: 1.6,
    conditions: {
      minUsers: 200,
      maxUsers: 400,
      minDay: 20,
      maxHealth: 70
    },
    decisions: [
      {
        text: "Take a week off and hire a freelancer",
        description: "Prioritize health and get temporary help",
        effects: { money: -2000, health: 15, mentalPeace: 12, teamMorale: 8 }
      },
      {
        text: "Push through until you hit 500 users",
        description: "Sacrifice health for growth milestone",
        effects: { health: -15, mentalPeace: -12, users: 40, productQuality: 5 }
      },
      {
        text: "Set better boundaries and work 8-hour days",
        description: "Sustainable pace but slower feature development",
        effects: { health: 8, mentalPeace: 10, productQuality: -3 }
      }
    ]
  },
  {
    id: 6,
    title: "Gym Partnership Proposal",
    description: "A local gym chain with 5 locations wants to promote FitFlow to their 2,000 members in exchange for a custom branded version of your app.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minUsers: 250,
      maxUsers: 600,
      minProductQuality: 60
    },
    decisions: [
      {
        text: "Build custom branded version",
        description: "Big user boost but significant development work",
        effects: { money: 2000, mentalPeace: -8, productQuality: -5, users: 150 }
      },
      {
        text: "Offer white-label partnership instead",
        description: "Easier integration with revenue sharing",
        effects: { money: 800, teamMorale: 3, users: 80 }
      },
      {
        text: "Decline and focus on individual users",
        description: "Stay true to your B2C vision",
        effects: { productQuality: 5, mentalPeace: 3, users: 20 }
      }
    ]
  },
  {
    id: 7,
    title: "App Store Review Bomb",
    description: "Your 350 users love FitFlow, but a bug in the latest update caused some users to lose workout data. Your App Store rating dropped from 4.8 to 3.9 with angry reviews.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minUsers: 300,
      maxUsers: 500,
      minProductQuality: 50
    },
    decisions: [
      {
        text: "Work 24/7 to fix and add data recovery",
        description: "Emergency response to restore user trust",
        effects: { health: -12, mentalPeace: -15, productQuality: 15, users: 20 }
      },
      {
        text: "Issue apology and offer premium subscriptions",
        description: "Compensate affected users with free premium",
        effects: { money: -500, teamMorale: 5, users: 10 }
      },
      {
        text: "Implement better testing and QA processes",
        description: "Prevent future issues but takes time",
        effects: { productQuality: 10, mentalPeace: -5, users: 5 }
      }
    ]
  },
  {
    id: 8,
    title: "Angel Investor Interest",
    description: "A former Nike executive turned angel investor wants to invest $25k for 15% equity in FitFlow. You have 400 users and $3k in monthly recurring revenue.",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minUsers: 350,
      maxUsers: 600,
      minMoney: 2000
    },
    decisions: [
      {
        text: "Accept the investment offer",
        description: "Get funding and valuable sports industry expertise",
        effects: { money: 25000, mentalPeace: -5, teamMorale: 8 }
      },
      {
        text: "Negotiate for better terms",
        description: "Try to get $25k for 10% equity instead",
        effects: { money: 15000, mentalPeace: -8, teamMorale: 3 }
      },
      {
        text: "Keep full ownership and bootstrap",
        description: "Maintain control but limited resources",
        effects: { mentalPeace: 5, teamMorale: 10, health: -5 }
      }
    ]
  },
  {
    id: 9,
    title: "User Behavior Insights",
    description: "Analytics show 450 users primarily use FitFlow for yoga and meditation tracking, not gym workouts as intended. Yoga content gets 10x more engagement.",
    category: 'growth',
    weight: 1.2,
    conditions: {
      minUsers: 400,
      maxUsers: 700,
      minDay: 30
    },
    decisions: [
      {
        text: "Pivot to become a yoga and mindfulness app",
        description: "Follow user behavior and redesign around yoga",
        effects: { productQuality: -10, mentalPeace: -12, users: 100 }
      },
      {
        text: "Add more yoga features while keeping gym focus",
        description: "Expand to serve both user groups",
        effects: { money: -2000, productQuality: 5, users: 60 }
      },
      {
        text: "Double down on gym features and education",
        description: "Stick to original vision and educate users",
        effects: { teamMorale: 8, mentalPeace: 2, users: 15 }
      }
    ]
  },
  {
    id: 10,
    title: "Acquisition Offer",
    description: "Under Armour wants to acquire FitFlow for $150k to integrate into their MyFitnessPal ecosystem. You have 500 users and are finally profitable at $2k/month.",
    category: 'late',
    weight: 1.0,
    conditions: {
      minUsers: 450,
      maxUsers: 1000,
      minMoney: 5000,
      minDay: 40
    },
    decisions: [
      {
        text: "Accept acquisition and join Under Armour",
        description: "Secure exit and become employee at large company",
        effects: { money: 150000, health: 10, mentalPeace: 15 }
      },
      {
        text: "Decline and continue growing independently",
        description: "Bet on building something bigger yourself",
        effects: { mentalPeace: -5, teamMorale: 12, productQuality: 8, users: 50 }
      },
      {
        text: "Negotiate for $250k and better terms",
        description: "Try to get more value for your work",
        effects: { money: 75000, mentalPeace: -10, teamMorale: 2 }
      }
    ]
  }
];

export const fitflowGame: Game = {
  id: 'fitflow',
  name: 'FitFlow: Fitness App Startup',
  description: 'Build and grow your fitness tracking app from a solo developer to a successful startup.',
  // UI Metadata
  emoji: '🏃‍♀️',
  colors: 'from-blue-500/10 to-purple-500/10 border-blue-200',
  vision: "You're launching FitFlow, a revolutionary fitness app that helps people achieve their health goals through personalized workouts and nutrition tracking.",
  mission: "Build a thriving fitness platform while maintaining your health, team morale, and mental peace. Every decision matters in this competitive market.",
  goal: (winMoney: number, winQuality: number) => 
    `Reach $${(winMoney / 1000000).toFixed(1)}M in revenue with a high-quality product (${winQuality}%+) to achieve startup success.`,
  // Game Configuration
  initialGameState: {
    money: 10000,
    health: 80,
    mentalPeace: 80,
    teamMorale: 70,
    productQuality: 50,
    users: 100,
    day: 1,
    currentScenario: 0,
    gameOver: false,
    endReason: '',
    seenScenarios: [],
    scenarioHistory: []
  },
  scenarios: fitflowScenarios,
  gameOverConditions: {
    money: 0,
    health: 0,
    mentalPeace: 0,
    teamMorale: 0,
    productQuality: 0,
    users: 0
  },
  winConditions: {
    money: 1000000,
    productQuality: 90
  }
}; 