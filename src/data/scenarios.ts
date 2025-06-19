import { Scenario } from '@/types/game';

export const scenarios: Scenario[] = [
  {
    id: 1,
    title: "First Employee Decision",
    description: "You've been working alone for months and finally have some funding. It's time to hire your first employee. Who do you choose?",
    decisions: [
      {
        text: "Hire a talented developer",
        description: "Get help with building the product faster",
        effects: { money: -3000, productQuality: 15, stress: -10 }
      },
      {
        text: "Hire a marketing specialist",
        description: "Focus on getting more customers",
        effects: { money: -2500, teamMorale: 10, stress: -5 }
      },
      {
        text: "Keep working solo for now",
        description: "Save money but work longer hours",
        effects: { money: 0, stress: 15, health: -10 }
      }
    ]
  },
  {
    id: 2,
    title: "Investor Meeting",
    description: "A potential investor wants to meet. They're offering $50k for 20% of your company. The meeting is during your product launch week.",
    decisions: [
      {
        text: "Take the meeting",
        description: "Secure funding but delay launch",
        effects: { money: 50000, stress: 10, productQuality: -5 }
      },
      {
        text: "Focus on launch instead",
        description: "Perfect your product launch timing",
        effects: { productQuality: 10, teamMorale: 10, stress: 5 }
      },
      {
        text: "Try to do both",
        description: "Risky but potentially rewarding",
        effects: { money: 25000, stress: 20, health: -15 }
      }
    ]
  },
  {
    id: 3,
    title: "Technical Crisis",
    description: "Your main server crashed and customer data might be at risk. You need to act fast but resources are limited.",
    decisions: [
      {
        text: "Hire emergency consultants",
        description: "Quick fix but expensive",
        effects: { money: -8000, productQuality: 20, stress: 10 }
      },
      {
        text: "Fix it yourself overnight",
        description: "Save money but risk your health",
        effects: { money: 0, health: -20, stress: 25, productQuality: 10 }
      },
      {
        text: "Be transparent with customers",
        description: "Honest approach, may retain trust",
        effects: { teamMorale: 15, stress: 15, productQuality: 5 }
      }
    ]
  },
  {
    id: 4,
    title: "Competition Appears",
    description: "A well-funded competitor just launched a similar product. They're offering features you don't have yet.",
    decisions: [
      {
        text: "Rush to add their features",
        description: "Stay competitive but compromise quality",
        effects: { productQuality: -10, stress: 20, teamMorale: -10 }
      },
      {
        text: "Focus on your unique strengths",
        description: "Differentiate rather than copy",
        effects: { productQuality: 15, teamMorale: 10, stress: 5 }
      },
      {
        text: "Lower your prices to compete",
        description: "Aggressive pricing strategy",
        effects: { money: -5000, teamMorale: -5, stress: 10 }
      }
    ]
  },
  {
    id: 5,
    title: "Team Burnout",
    description: "Your team has been working 60+ hour weeks for months. Productivity is dropping and people are getting frustrated.",
    decisions: [
      {
        text: "Mandate time off and hire more people",
        description: "Expensive but necessary for long-term health",
        effects: { money: -10000, teamMorale: 25, stress: -15, health: 10 }
      },
      {
        text: "Push through the critical launch",
        description: "Risk losing team members but meet deadlines",
        effects: { teamMorale: -20, stress: 20, productQuality: 10, health: -10 }
      },
      {
        text: "Reduce scope and set realistic goals",
        description: "Compromise on features but protect the team",
        effects: { teamMorale: 15, stress: -10, productQuality: -5 }
      }
    ]
  },
  {
    id: 6,
    title: "Major Client Opportunity",
    description: "A Fortune 500 company wants to use your product but needs custom features that would take 3 months to build.",
    decisions: [
      {
        text: "Accept and build custom features",
        description: "Huge revenue but may neglect other customers",
        effects: { money: 75000, stress: 15, teamMorale: -10, productQuality: -5 }
      },
      {
        text: "Decline and focus on core product",
        description: "Stay true to your vision",
        effects: { productQuality: 15, teamMorale: 10, stress: -5 }
      },
      {
        text: "Negotiate a partnership deal",
        description: "Find a middle ground solution",
        effects: { money: 30000, teamMorale: 5, stress: 10, productQuality: 5 }
      }
    ]
  },
  {
    id: 7,
    title: "Scaling Challenges",
    description: "Your user base has grown 300% this month. Your infrastructure is struggling and support tickets are piling up.",
    decisions: [
      {
        text: "Invest heavily in infrastructure",
        description: "Expensive but necessary for stability",
        effects: { money: -25000, productQuality: 20, stress: 10 }
      },
      {
        text: "Hire more support staff",
        description: "Address customer complaints directly",
        effects: { money: -8000, teamMorale: 10, stress: 5 }
      },
      {
        text: "Implement usage limits",
        description: "Control growth while you catch up",
        effects: { stress: -10, teamMorale: -5, productQuality: 5 }
      }
    ]
  },
  {
    id: 8,
    title: "Investment Round Decision",
    description: "You have offers from three different investors. Each comes with different terms and expectations.",
    decisions: [
      {
        text: "Accept VC funding ($200k for 25%)",
        description: "Big money but high expectations",
        effects: { money: 200000, stress: 20, teamMorale: 10 }
      },
      {
        text: "Take angel investment ($75k for 10%)",
        description: "Moderate funding with mentorship",
        effects: { money: 75000, stress: 5, teamMorale: 15, productQuality: 10 }
      },
      {
        text: "Bootstrap and maintain control",
        description: "Keep equity but limited resources",
        effects: { stress: 15, teamMorale: 20, health: -10 }
      }
    ]
  },
  {
    id: 9,
    title: "Product Pivot Decision",
    description: "Data shows customers are using your product differently than intended. You could pivot to this new use case.",
    decisions: [
      {
        text: "Pivot to the new direction",
        description: "Follow the data but restart development",
        effects: { productQuality: -15, teamMorale: -10, stress: 20 }
      },
      {
        text: "Stick to original vision",
        description: "Trust your instincts over data",
        effects: { teamMorale: 10, stress: -5, productQuality: 5 }
      },
      {
        text: "Build features for both use cases",
        description: "Try to serve everyone but risk complexity",
        effects: { money: -5000, stress: 15, productQuality: -10 }
      }
    ]
  },
  {
    id: 10,
    title: "Exit Opportunity",
    description: "A larger company wants to acquire you for $500k. It's not your dream exit, but it's guaranteed money.",
    decisions: [
      {
        text: "Accept the acquisition",
        description: "Secure exit but give up on bigger dreams",
        effects: { money: 500000, stress: -20, health: 20 }
      },
      {
        text: "Decline and keep building",
        description: "Bet on yourself for bigger success",
        effects: { stress: 10, teamMorale: 15, productQuality: 10 }
      },
      {
        text: "Negotiate for better terms",
        description: "Try to get more value",
        effects: { money: 100000, stress: 15, teamMorale: 5 }
      }
    ]
  }
];