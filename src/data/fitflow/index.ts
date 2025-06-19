import { Scenario, GameState, Game } from '@/types/game';

export const fitflowScenarios: Scenario[] = [
  // EARLY GAME (Days 1-10) - Foundation Building
  {
    id: 1,
    title: "The First Line of Code",
    description: "You're sitting in your apartment with a laptop and a dream. You've decided to build FitFlow, a fitness app that will revolutionize how people track their workouts. Where do you start?",
    category: 'early',
    weight: 1.0,
    conditions: {
      minDay: 1,
      maxDay: 3,
      excludedPreviousScenarios: [1] // Can only happen once
    },
    decisions: [
      {
        text: "Build a simple workout tracker",
        description: "Start with basic functionality - log exercises, sets, and reps",
        effects: { productQuality: 15, mentalPeace: 5, users: 5 }
      },
      {
        text: "Design the perfect UI first",
        description: "Focus on making it beautiful before adding features",
        effects: { productQuality: 20, mentalPeace: -3, users: 2 }
      },
      {
        text: "Research the competition",
        description: "Study existing apps to find your unique angle",
        effects: { productQuality: 10, mentalPeace: 8, users: 0 }
      }
    ]
  },
  {
    id: 2,
    title: "Your First User",
    description: "After weeks of coding, you finally have a working prototype! Your friend Sarah agrees to test it. She's excited but gives you some honest feedback.",
    category: 'early',
    weight: 1.0,
    conditions: {
      minDay: 2,
      maxDay: 5,
      minProductQuality: 20,
      requiredPreviousScenarios: [1], // Must have started coding
      excludedPreviousScenarios: [2] // Can only happen once
    },
    decisions: [
      {
        text: "Implement all her suggestions immediately",
        description: "Work overtime to make the perfect app for Sarah",
        effects: { productQuality: 12, mentalPeace: -5, health: -3, users: 8 }
      },
      {
        text: "Prioritize the most important feedback",
        description: "Focus on core improvements that matter most",
        effects: { productQuality: 8, mentalPeace: 3, users: 5 }
      },
      {
        text: "Ask her to help you prioritize",
        description: "Get Sarah's input on what to fix first",
        effects: { productQuality: 6, mentalPeace: 8, teamMorale: 5, users: 3 }
      }
    ]
  },
  {
    id: 22,
    title: "First Week Milestone",
    description: "You've been working on FitFlow for a week now. Looking at your code editor, you can't help but smile - what started as a simple idea is becoming real. Your prototype is taking shape, and you're learning something new every day.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minDay: 7,
      maxDay: 8,
      requiredPreviousScenarios: [1], // Must have started coding
      excludedPreviousScenarios: [22] // Can only happen once
    },
    decisions: [] // Empty decisions array indicates this is a status update
  },
  {
    id: 3,
    title: "The App Store Decision",
    description: "Your app is ready for its first release! You need to decide how to launch on the App Store. The basic version works, but you could add more features first.",
    category: 'early',
    weight: 1.0,
    conditions: {
      minDay: 4,
      maxDay: 8,
      minProductQuality: 30,
      requiredPreviousScenarios: [2], // Must have had first user feedback
      excludedPreviousScenarios: [3] // Can only happen once
    },
    decisions: [
      {
        text: "Launch the MVP now",
        description: "Get it out there and iterate based on real user feedback",
        effects: { users: 25, mentalPeace: 5, productQuality: -5 }
      },
      {
        text: "Add social features first",
        description: "Include friend connections and workout sharing",
        effects: { productQuality: 15, mentalPeace: -8, users: 15 }
      },
      {
        text: "Wait for Apple Health integration",
        description: "Make it sync with the user's existing health data",
        effects: { productQuality: 20, mentalPeace: -10, users: 10 }
      }
    ]
  },
  {
    id: 23,
    title: "First 100 Users",
    description: "🎉 Milestone achieved: 100 users! You open your analytics dashboard and stare at the number in disbelief. That's one hundred real people using something you built. Each user icon represents someone whose fitness journey now includes your app. It's a small number in the grand scheme of things, but right now it feels huge.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 100,
      maxUsers: 120,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [23] // Can only happen once
    },
    decisions: []
  },
  {
    id: 4,
    title: "The First Bad Review",
    description: "Your app has 50 users and you're feeling great! Then you get your first 1-star review: 'App crashes every time I try to log a workout.' Your heart sinks.",
    category: 'early',
    weight: 1.2,
    conditions: {
      minDay: 5,
      maxDay: 10,
      minUsers: 30,
      maxUsers: 100,
      requiredPreviousScenarios: [3], // Must have launched on App Store
      excludedPreviousScenarios: [4] // Can only happen once
    },
    decisions: [
      {
        text: "Drop everything and fix the bug",
        description: "Work through the night to resolve the crash issue",
        effects: { productQuality: 10, health: -5, mentalPeace: -3, users: 5 }
      },
      {
        text: "Respond to the review professionally",
        description: "Acknowledge the issue and promise a fix soon",
        effects: { mentalPeace: 3, users: 2 }
      },
      {
        text: "Ask the user for more details",
        description: "Reach out to understand the exact problem",
        effects: { productQuality: 5, mentalPeace: 5, users: 3 }
      }
    ]
  },
  {
    id: 5,
    title: "The Coffee Shop Meeting",
    description: "You're working at your local coffee shop when a stranger notices your FitFlow app. 'That looks interesting!' she says. Turns out she's a fitness influencer with 50k followers.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minDay: 6,
      maxDay: 12,
      minUsers: 40,
      maxUsers: 150,
      requiredPreviousScenarios: [3], // Must have launched on App Store
      excludedPreviousScenarios: [5] // Can only happen once
    },
    decisions: [
      {
        text: "Offer her a free premium account",
        description: "Give her exclusive access in exchange for promotion",
        effects: { users: 40, money: -200, mentalPeace: 5 }
      },
      {
        text: "Ask for honest feedback",
        description: "Get her input on how to improve the app",
        effects: { productQuality: 8, users: 20, mentalPeace: 3 }
      },
      {
        text: "Pitch her on becoming an advisor",
        description: "Offer equity in exchange for her expertise",
        effects: { teamMorale: 10, mentalPeace: -5, users: 30 }
      }
    ]
  },

  // MID GAME (Days 10-30) - Growth & Challenges
  {
    id: 6,
    title: "Server Costs Hit",
    description: "Your app now has 200 users and they're loving it! But your AWS bill just jumped from $20 to $150. The free tier is over and you need to figure out how to pay for this growth.",
    category: 'crisis',
    weight: 1.4,
    conditions: {
      minDay: 10,
      maxDay: 20,
      minUsers: 150,
      maxUsers: 300,
      minMoney: 500,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [6] // Can only happen once
    },
    decisions: [
      {
        text: "Optimize the database and images",
        description: "Spend time reducing server costs through technical improvements",
        effects: { money: 100, mentalPeace: -5, productQuality: 8 }
      },
      {
        text: "Add a premium subscription tier",
        description: "Introduce $4.99/month premium features to generate revenue",
        effects: { money: 300, users: -15, mentalPeace: -3 }
      },
      {
        text: "Just pay the bills for now",
        description: "Focus on growth and worry about costs later",
        effects: { money: -150, productQuality: 5, users: 20 }
      }
    ]
  },
  {
    id: 7,
    title: "The Feature Request Flood",
    description: "Your 250 users are engaged and sending you feature requests daily. 'Add calorie tracking!' 'I want workout plans!' 'Can you sync with my smartwatch?' You can't build everything at once.",
    category: 'growth',
    weight: 1.2,
    conditions: {
      minDay: 12,
      maxDay: 25,
      minUsers: 200,
      maxUsers: 400,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [7] // Can only happen once
    },
    decisions: [
      {
        text: "Build the most requested feature",
        description: "Add calorie tracking since 60% of users asked for it",
        effects: { productQuality: 12, mentalPeace: -8, users: 35 }
      },
      {
        text: "Create a voting system",
        description: "Let users vote on which features to build next",
        effects: { teamMorale: 8, mentalPeace: 5, users: 20 }
      },
      {
        text: "Focus on your original vision",
        description: "Stick to workout tracking and ignore the noise",
        effects: { productQuality: 5, mentalPeace: 10, users: 15 }
      }
    ]
  },
  {
    id: 21,
    title: "The Tech Blog Feature",
    description: "TechCrunch wants to feature FitFlow in their 'Rising Stars' series! They're impressed by your user growth and unique approach. This could be huge exposure, but they need information and screenshots by tomorrow.",
    category: 'opportunity',
    weight: 1.3,
    conditions: {
      minDay: 14,
      maxDay: 25,
      minUsers: 200,
      maxUsers: 400,
      minProductQuality: 50,
      requiredPreviousScenarios: [3], // Must have launched on App Store
      excludedPreviousScenarios: [21] // Can only happen once
    },
    decisions: [
      {
        text: "Work overnight on a perfect pitch",
        description: "Polish the app, prepare detailed metrics, and craft a compelling story",
        effects: { users: 150, mentalPeace: -10, health: -5, productQuality: 8 }
      },
      {
        text: "Share your authentic journey",
        description: "Be honest about your challenges and vision for the future",
        effects: { users: 100, mentalPeace: 5, teamMorale: 10 }
      },
      {
        text: "Focus on user testimonials",
        description: "Let your happy users tell the story through their experiences",
        effects: { users: 80, mentalPeace: 8, productQuality: 5 }
      }
    ]
  },
  {
    id: 8,
    title: "The Competitor Appears",
    description: "A new app called 'FitBuddy' just launched with almost identical features to yours. They have better marketing and are getting featured in fitness blogs. Your growth has slowed.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minDay: 15,
      maxDay: 30,
      minUsers: 250,
      maxUsers: 500,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [8] // Can only happen once
    },
    decisions: [
      {
        text: "Copy their best features quickly",
        description: "Implement their popular features to stay competitive",
        effects: { productQuality: 8, mentalPeace: -10, users: 25 }
      },
      {
        text: "Focus on your unique strengths",
        description: "Double down on what makes FitFlow different",
        effects: { productQuality: 15, mentalPeace: 5, users: 20 }
      },
      {
        text: "Reach out for a partnership",
        description: "Try to collaborate instead of competing",
        effects: { teamMorale: 10, mentalPeace: 8, users: 15 }
      }
    ]
  },
  {
    id: 24,
    title: "First Month Review",
    description: "📊 30 Days of FitFlow\n\nYou take a moment to reflect on your first month as a startup founder. Your sleep schedule is questionable, your coffee consumption has doubled, but seeing users post about their fitness progress makes it all worth it. You've learned more in the past month than in the previous year. The road ahead is long, but you're no longer just dreaming - you're building.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minDay: 30,
      maxDay: 32,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [24] // Can only happen once
    },
    decisions: []
  },
  {
    id: 30,
    title: "Second Month Review",
    description: "📈 60 Days of Growth\n\nTwo months in, and FitFlow is gaining momentum. Your analytics dashboard shows steady user growth, and the App Store reviews are mostly positive. The late-night debugging sessions are paying off, and your early users are becoming your biggest advocates. There's still a long way to go, but you're building something people genuinely want to use.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minDay: 60,
      maxDay: 62,
      requiredPreviousScenarios: [24], // Must have had first month review
      excludedPreviousScenarios: [30] // Can only happen once
    },
    decisions: []
  },
  {
    id: 31,
    title: "Third Month Review",
    description: "🚀 90 Days of Evolution\n\nThree months have transformed your idea into a real business. You've survived the early challenges, built a small but dedicated team, and your user base keeps growing. The fitness industry is starting to notice FitFlow, and competitors are watching. What began in your apartment is now a startup with real potential.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minDay: 90,
      maxDay: 92,
      requiredPreviousScenarios: [30], // Must have had second month review
      excludedPreviousScenarios: [31] // Can only happen once
    },
    decisions: []
  },
  {
    id: 32,
    title: "Fourth Month Review",
    description: "💫 120 Days of Impact\n\nFour months in, and FitFlow has become more than just an app - it's a community. Your users are sharing their fitness journeys, trainers are recommending you to their clients, and investors are starting to notice. The challenges are bigger now, but so are the opportunities. You're not just surviving anymore; you're ready to thrive.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minDay: 120,
      maxDay: 122,
      requiredPreviousScenarios: [31], // Must have had third month review
      excludedPreviousScenarios: [32] // Can only happen once
    },
    decisions: []
  },
  {
    id: 9,
    title: "The Burnout Warning",
    description: "You've been coding 10-12 hours a day for 3 weeks straight. Your eyes are tired, your back hurts, and your friends are worried about you. But you have 300 users counting on you!",
    category: 'crisis',
    weight: 1.6,
    conditions: {
      minDay: 18,
      maxDay: 35,
      minUsers: 200,
      maxUsers: 500,
      maxHealth: 70,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [9] // Can only happen once
    },
    decisions: [
      {
        text: "Take a weekend off completely",
        description: "Rest and recharge - your health comes first",
        effects: { health: 15, mentalPeace: 12, productQuality: -3 }
      },
      {
        text: "Hire a part-time developer",
        description: "Get help so you can work more sustainably",
        effects: { money: -1000, health: 8, mentalPeace: 5, teamMorale: 10 }
      },
      {
        text: "Push through for one more week",
        description: "Finish the current features, then take a break",
        effects: { health: -10, mentalPeace: -8, productQuality: 8, users: 15 }
      }
    ]
  },
  {
    id: 10,
    title: "The Viral Moment",
    description: "A fitness YouTuber with 200k subscribers just mentioned your app in a video! Your downloads spike from 50/day to 500/day. Your servers are struggling to keep up.",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minDay: 20,
      maxDay: 40,
      minUsers: 300,
      maxUsers: 800,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [10] // Can only happen once
    },
    decisions: [
      {
        text: "Scale up servers immediately",
        description: "Invest in better infrastructure to handle the growth",
        effects: { money: -800, users: 200, productQuality: 5 }
      },
      {
        text: "Optimize the app for performance",
        description: "Make the existing servers handle more users efficiently",
        effects: { productQuality: 12, mentalPeace: -5, users: 150 }
      },
      {
        text: "Let some users wait",
        description: "Focus on quality over quantity for now",
        effects: { users: 100, mentalPeace: 5, productQuality: 8 }
      }
    ]
  },
  {
    id: 11,
    title: "The Team Decision",
    description: "Your app now has 500 users and you're making $2k/month. You can't keep up alone anymore. It's time to build a team, but you're not sure who to hire first.",
    category: 'growth',
    weight: 1.3,
    conditions: {
      minDay: 25,
      maxDay: 45,
      minUsers: 400,
      maxUsers: 1000,
      minMoney: 1000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [11] // Can only happen once
    },
    decisions: [
      {
        text: "Hire a full-stack developer",
        description: "Get help with coding and technical challenges",
        effects: { money: -2000, productQuality: 15, teamMorale: 8, mentalPeace: 5 }
      },
      {
        text: "Hire a marketing specialist",
        description: "Focus on growing your user base and brand",
        effects: { money: -1500, users: 100, teamMorale: 5, mentalPeace: 3 }
      },
      {
        text: "Hire a customer support person",
        description: "Improve user experience and retention",
        effects: { money: -1200, teamMorale: 12, users: 50, mentalPeace: 8 }
      }
    ]
  },
  {
    id: 12,
    title: "The Data Breach Scare",
    description: "A user emails you panicking that their personal data might have been compromised. You check your logs and find a suspicious login attempt. Your heart races - this could destroy your reputation.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minDay: 28,
      maxDay: 50,
      minUsers: 400,
      maxUsers: 1000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [12] // Can only happen once
    },
    decisions: [
      {
        text: "Investigate thoroughly and be transparent",
        description: "Audit your security and communicate openly with users",
        effects: { productQuality: 10, mentalPeace: -5, users: -20 }
      },
      {
        text: "Quickly implement better security",
        description: "Add two-factor authentication and encryption",
        effects: { productQuality: 15, mentalPeace: -8, money: -500 }
      },
      {
        text: "Assure the user it's a false alarm",
        description: "Explain that the login attempt was blocked",
        effects: { mentalPeace: 3, users: 5 }
      }
    ]
  },
  {
    id: 25,
    title: "First $1000 Revenue",
    description: "💰 You've made your first $1,000! It may not be enough to quit your day job yet, but seeing that number in your Stripe dashboard feels surreal. Some people value your creation enough to pay for it. You screenshot the milestone - this one's going in the founder journey album.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minMoney: 1000,
      maxMoney: 1200,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [25] // Can only happen once
    },
    decisions: []
  },
  {
    id: 26,
    title: "Product Quality Milestone",
    description: "⭐ Your latest user satisfaction survey shows a 90% approval rating! The late nights spent fixing bugs and polishing the UI are paying off. Users are praising the app's reliability, intuitive design, and helpful features. Your commitment to quality is becoming your competitive advantage.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minProductQuality: 90,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [26] // Can only happen once
    },
    decisions: []
  },
  {
    id: 27,
    title: "Team Spirit High",
    description: "🎉 The office is buzzing with energy! Your team just wrapped up a successful feature launch, and everyone's celebrating. The whiteboard is filled with user stories, the Slack channels are full of positive feedback, and someone ordered pizza. These are the moments that make startup life worth it.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minTeamMorale: 90,
      minUsers: 500, // Should have a decent user base
      requiredPreviousScenarios: [11], // Must have hired team
      excludedPreviousScenarios: [27] // Can only happen once
    },
    decisions: []
  },
  {
    id: 28,
    title: "Work-Life Balance Achievement",
    description: "🧘‍♂️ You've found your rhythm! After months of chaos, you've established a sustainable routine. Morning workouts, regular breaks, and actually using your standing desk. Your friends have noticed you're more present, and your code quality has improved. Who said you can't be a successful founder and have a life?",
    category: 'status',
    weight: 1.0,
    conditions: {
      minHealth: 90,
      minMentalPeace: 90,
      minDay: 40, // Should be later in the game
      requiredPreviousScenarios: [9], // Must have faced burnout warning
      excludedPreviousScenarios: [28] // Can only happen once
    },
    decisions: []
  },
  {
    id: 29,
    title: "Community Milestone",
    description: "💪 FitFlow's community is thriving! The subreddit has 5,000 members, your Discord is active 24/7, and users are creating workout guides for each other. You scroll through the success stories - weight loss journeys, strength gains, improved confidence. Your app isn't just software anymore; it's changing lives.",
    category: 'status',
    weight: 1.0,
    conditions: {
      minUsers: 1000,
      minProductQuality: 80,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [29] // Can only happen once
    },
    decisions: []
  },

  // LATE GAME (Days 30+) - Scaling & Success
  {
    id: 13,
    title: "The Investment Pitch",
    description: "A venture capitalist heard about your app and wants to meet. You have 800 users, $5k/month revenue, and a growing team. They're offering $100k for 20% equity. This could change everything.",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minDay: 35,
      maxDay: 60,
      minUsers: 600,
      maxUsers: 1500,
      minMoney: 3000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [13] // Can only happen once
    },
    decisions: [
      {
        text: "Accept the investment",
        description: "Get funding to scale faster and hire more people",
        effects: { money: 100000, mentalPeace: -10, teamMorale: 15 }
      },
      {
        text: "Negotiate for better terms",
        description: "Try to get more money for less equity",
        effects: { money: 50000, mentalPeace: -15, teamMorale: 8 }
      },
      {
        text: "Decline and bootstrap longer",
        description: "Keep full control and grow organically",
        effects: { mentalPeace: 10, teamMorale: 5, productQuality: 8 }
      }
    ]
  },
  {
    id: 14,
    title: "The Platform Expansion",
    description: "Your iOS app is doing great with 1000 users! But Android users keep asking when you'll launch on Google Play. Developing for both platforms will double your workload.",
    category: 'growth',
    weight: 1.3,
    conditions: {
      minDay: 40,
      maxDay: 70,
      minUsers: 800,
      maxUsers: 2000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [14] // Can only happen once
    },
    decisions: [
      {
        text: "Hire an Android developer",
        description: "Build a dedicated team for Android development",
        effects: { money: -3000, users: 400, productQuality: 10, teamMorale: 8 }
      },
      {
        text: "Use a cross-platform framework",
        description: "Rewrite the app to work on both platforms",
        effects: { productQuality: 15, mentalPeace: -10, users: 300 }
      },
      {
        text: "Focus on iOS for now",
        description: "Perfect the iOS experience before expanding",
        effects: { productQuality: 8, mentalPeace: 5, users: 150 }
      }
    ]
  },
  {
    id: 15,
    title: "The Corporate Partnership",
    description: "A major gym chain with 50 locations wants to partner with FitFlow. They'll promote your app to their 10,000 members in exchange for a custom branded version. This could be huge!",
    category: 'opportunity',
    weight: 1.4,
    conditions: {
      minDay: 45,
      maxDay: 80,
      minUsers: 1000,
      maxUsers: 3000,
      minProductQuality: 70,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [15] // Can only happen once
    },
    decisions: [
      {
        text: "Build the custom branded version",
        description: "Create a special version with their branding and features",
        effects: { money: 5000, users: 800, mentalPeace: -10, productQuality: -5 }
      },
      {
        text: "Offer a white-label solution",
        description: "Let them use your platform with their own branding",
        effects: { money: 3000, users: 500, teamMorale: 10 }
      },
      {
        text: "Decline and stay independent",
        description: "Keep your app focused on individual users",
        effects: { productQuality: 10, mentalPeace: 8, users: 200 }
      }
    ]
  },
  {
    id: 16,
    title: "The Team Conflict",
    description: "Your team has grown to 5 people, and there's tension between the developers and marketing team. The devs want to focus on features, while marketing wants to prioritize user acquisition.",
    category: 'crisis',
    weight: 1.5,
    conditions: {
      minDay: 50,
      maxDay: 90,
      minUsers: 1200,
      maxUsers: 4000,
      maxTeamMorale: 80,
      requiredPreviousScenarios: [11], // Must have hired team members
      excludedPreviousScenarios: [16] // Can only happen once
    },
    decisions: [
      {
        text: "Side with the developers",
        description: "Focus on building great features first",
        effects: { productQuality: 15, teamMorale: -10, users: 100 }
      },
      {
        text: "Side with marketing",
        description: "Prioritize growth and user acquisition",
        effects: { users: 300, teamMorale: -8, productQuality: -5 }
      },
      {
        text: "Facilitate a compromise",
        description: "Help both teams find common ground",
        effects: { teamMorale: 15, mentalPeace: 8, productQuality: 5, users: 150 }
      }
    ]
  },
  {
    id: 17,
    title: "The International Launch",
    description: "Your app is popular in the US, but users from other countries keep asking for localization. You could translate it into Spanish, French, and German to reach millions more users.",
    category: 'growth',
    weight: 1.3,
    conditions: {
      minDay: 55,
      maxDay: 100,
      minUsers: 1500,
      maxUsers: 5000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [17] // Can only happen once
    },
    decisions: [
      {
        text: "Hire translators and localize",
        description: "Invest in proper translation and cultural adaptation",
        effects: { money: -2000, users: 600, productQuality: 8, teamMorale: 5 }
      },
      {
        text: "Use AI translation tools",
        description: "Quick and cheap, but might not be perfect",
        effects: { money: -500, users: 400, productQuality: -3 }
      },
      {
        text: "Focus on English-speaking markets",
        description: "Perfect your current market before expanding",
        effects: { productQuality: 10, mentalPeace: 5, users: 200 }
      }
    ]
  },
  {
    id: 18,
    title: "The Acquisition Offer",
    description: "A major tech company wants to acquire FitFlow for $2 million! You have 3000 users and $15k/month revenue. This would be life-changing money, but you'd lose control of your baby.",
    category: 'late',
    weight: 1.2,
    conditions: {
      minDay: 60,
      maxDay: 120,
      minUsers: 2000,
      maxUsers: 10000,
      minMoney: 10000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [18] // Can only happen once
    },
    decisions: [
      {
        text: "Accept the acquisition",
        description: "Take the money and join their team",
        effects: { money: 2000000, health: 15, mentalPeace: 20 }
      },
      {
        text: "Negotiate for more money",
        description: "Try to get $3 million and better terms",
        effects: { money: 1000000, mentalPeace: -10, teamMorale: 5 }
      },
      {
        text: "Decline and keep building",
        description: "Bet on building something even bigger",
        effects: { mentalPeace: 10, teamMorale: 20, productQuality: 15, users: 500 }
      }
    ]
  },
  {
    id: 19,
    title: "The Legacy Decision",
    description: "You've built FitFlow from nothing to a successful app with 5000 users. You're making $25k/month and have a great team. But you're starting to think about what's next in your life.",
    category: 'late',
    weight: 1.1,
    conditions: {
      minDay: 70,
      maxDay: 150,
      minUsers: 3000,
      maxUsers: 15000,
      minMoney: 20000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [19] // Can only happen once
    },
    decisions: [
      {
        text: "Keep growing FitFlow",
        description: "Aim for 100k users and become a fitness tech leader",
        effects: { users: 1000, productQuality: 20, teamMorale: 15, mentalPeace: 5 }
      },
      {
        text: "Start a new company",
        description: "Use your experience to build something completely different",
        effects: { mentalPeace: 15, teamMorale: -10, productQuality: -5 }
      },
      {
        text: "Sell and retire early",
        description: "Take your profits and enjoy life",
        effects: { money: 500000, health: 20, mentalPeace: 25 }
      }
    ]
  },
  {
    id: 20,
    title: "The Future of Fitness",
    description: "After years of building FitFlow, you're invited to speak at a major tech conference about the future of fitness technology. You have 10,000 users and $50k/month revenue. What's your vision?",
    category: 'late',
    weight: 1.0,
    conditions: {
      minDay: 80,
      maxDay: 200,
      minUsers: 5000,
      maxUsers: 50000,
      minMoney: 30000,
      requiredPreviousScenarios: [3], // Must have launched
      excludedPreviousScenarios: [20] // Can only happen once
    },
    decisions: [
      {
        text: "Pitch AI-powered personal training",
        description: "Share your vision for AI coaches that adapt to each user",
        effects: { productQuality: 25, users: 2000, teamMorale: 20, mentalPeace: 15 }
      },
      {
        text: "Focus on community and social features",
        description: "Emphasize the power of human connection in fitness",
        effects: { users: 1500, teamMorale: 25, productQuality: 15, mentalPeace: 10 }
      },
      {
        text: "Advocate for health data privacy",
        description: "Use your platform to push for better privacy standards",
        effects: { mentalPeace: 20, teamMorale: 15, users: 800, productQuality: 10 }
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
    money: 5000,
    health: 90,
    mentalPeace: 90,
    teamMorale: 80,
    productQuality: 30,
    users: 0,
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
    productQuality: 85
  }
}; 