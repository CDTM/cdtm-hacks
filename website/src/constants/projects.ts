export interface Project {
  id: string;
  name: string;
  case: "trade-republic" | "avi" | "beam";
  description: string;
  pitch: string;
  githubUrl: string;
  videoUrl: string;
  placement?: 1 | 2;
  challenges?: Array<Challenge>;
}

export type Company = {
  name: string;
  url?: string;
  logoPath: string;
  logoClass: string;
};

export type Challenge = {
  name: string;
  sponsoredBy: string;
  companies: Company[];
};

export interface Case {
  name: string;
  description: string;
  sponsorUrl: string;
  logo: string;
  logoClass: string;
}

export const cases: Record<"trade-republic" | "avi" | "beam", Case> = {
  "trade-republic": {
    name: "Trade Republic",
    // TODO: Use real case description
    description:
      "Build a solution to help retail investors make better investment decisions",
    sponsorUrl: "https://traderepublic.com",
    logo: "/images/partners/trade_republic.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
  avi: {
    name: "avi",
    // TODO: Use real case description
    description:
      "Create an autonomous vehicle solution that improves urban mobility",
    sponsorUrl: "https://www.avimedical.com/",
    logo: "/images/partners/avi_logo.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
  beam: {
    name: "Beam",
    // TODO: Use real case description
    description:
      "Develop a privacy-preserving application using Beam's blockchain technology",
    sponsorUrl: "https://beam.ai/",
    logo: "/images/partners/beam.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
} as const;

export const challenges: Record<string, Challenge> = {
  tanso: {
    name: "SMEs would love this",
    sponsoredBy: "Tanso",
    companies: [
      {
        name: "Tanso",
        url: "https://www.tanso.de/en",
        logoPath: "/images/partners/tanso_fixed.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
    ],
  },
  mistral: {
    name: "Best use of MistralAI API",
    sponsoredBy: "Mistral AI",
    companies: [
      {
        name: "Mistral AI",
        url: "https://mistral.ai/",
        logoPath: "/images/partners/mistral-ai-2025.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
    ],
  },
  'beyond-presence': {
    name: "Best use of Beyond Presence API",
    sponsoredBy: "Beyond Presence",
    companies: [
      {
        name: "Beyond Presence",
        url: "https://www.beyondpresence.ai/",
        logoPath: "/images/partners/beyond_presence.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
    ]
  },
  visionaries: {
    name: "Most potential to earn real money",
    sponsoredBy: "Visionaries Club, Everyday Intelligence and paid.ai",
    companies: [
      {
        name: "Visionaries Club",
        url: "https://visionariesclub.com/",
        logoPath: "/images/partners/visionaries_club.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
      {
        name: "Everyday Intelligence",
        url: "https://everydayintelligence.com/",
        logoPath: "/images/partners/everyday_intelligence_logo.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
      {
        name: "paid.ai",
        url: "https://paid.ai/",
        logoPath: "/images/partners/paid_ai.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
    ],
  },
  celonis: {
    name: "Best use of Celonis API",
    sponsoredBy: "Celonis",
    companies: [
      {
        name: "Celonis",
        url: "https://celonis.com/",
        logoPath: "/images/partners/celonis_logo.svg",
        logoClass: "max-h-[20px] max-w-[200px]",
      },
    ],
  },
} as const;

export const projects: Project[] = [
  // Trade Republic Projects
  {
    id: "project-tr-1",
    name: "WealthWave",
    case: "trade-republic",
    description:
      "An AI-powered investment assistant that curates daily stock picks based on user-defined strategies and market trends.",
    pitch: "Personalized stock insights delivered daily using AI.",
    githubUrl: "https://github.com/demo/wealthwave",
    videoUrl: "https://youtube.com/watch?v=demo1",
    placement: 1,
    challenges: [challenges.visionaries],
  },
  {
    id: "project-tr-2",
    name: "TradeTribe",
    case: "trade-republic",
    description:
      "A social platform for traders to share portfolios, strategies, and performance, fostering a learning community.",
    pitch: "The social network for savvy retail investors.",
    githubUrl: "https://github.com/demo/tradetribe",
    videoUrl: "https://youtube.com/watch?v=demo2",
    placement: 2,
  },
  {
    id: "project-tr-3",
    name: "StockStory",
    case: "trade-republic",
    description:
      "Generates story-like visualizations of your stock performance over time, ideal for sharing and learning.",
    pitch: "Turn your portfolio into an engaging story.",
    githubUrl: "https://github.com/demo/stockstory",
    videoUrl: "https://youtube.com/watch?v=demo3",
  },
  {
    id: "project-tr-4",
    name: "InvestiQ",
    case: "trade-republic",
    description:
      "A gamified quiz app that tests users on investment knowledge and offers real-time market scenarios.",
    pitch: "Learn investing through challenges and rewards.",
    githubUrl: "https://github.com/demo/investiq",
    videoUrl: "https://youtube.com/watch?v=demo4",
  },
  {
    id: "project-tr-5",
    name: "DividendRadar",
    case: "trade-republic",
    description:
      "Tracks dividend payments and suggests portfolio optimization to maximize passive income.",
    pitch: "Maximize your dividend gains with smart alerts.",
    githubUrl: "https://github.com/demo/dividendaradar",
    videoUrl: "https://youtube.com/watch?v=demo5",
  },
  {
    id: "project-tr-6",
    name: "GreenVest",
    case: "trade-republic",
    description:
      "Rates your investments based on ESG scores and suggests greener alternatives.",
    pitch: "Invest responsibly with sustainability scores.",
    githubUrl: "https://github.com/demo/greenvest",
    videoUrl: "https://youtube.com/watch?v=demo6",
  },
  {
    id: "project-tr-7",
    name: "RiskSense",
    case: "trade-republic",
    description:
      "Analyzes your portfolio risk and simulates potential outcomes based on historical crashes.",
    pitch: "Understand and manage your investment risk better.",
    githubUrl: "https://github.com/demo/risksense",
    videoUrl: "https://youtube.com/watch?v=demo7",
  },
  {
    id: "project-tr-8",
    name: "MicroInvest",
    case: "trade-republic",
    description:
      "Rounding up everyday purchases to invest spare change into diversified ETFs.",
    pitch: "Invest your spare change effortlessly.",
    githubUrl: "https://github.com/demo/microinvest",
    videoUrl: "https://youtube.com/watch?v=demo8",
    challenges: [challenges['beyond-presence']],
  },
  {
    id: "project-tr-9",
    name: "TradeBuddy",
    case: "trade-republic",
    description:
      "A conversational bot that explains financial news and your portfolio in plain English.",
    pitch: "Your friendly financial assistant in chat form.",
    githubUrl: "https://github.com/demo/tradebuddy",
    videoUrl: "https://youtube.com/watch?v=demo9",
  },
  {
    id: "project-tr-10",
    name: "AlphaPulse",
    case: "trade-republic",
    description:
      "Real-time sentiment analysis on stocks from Reddit, Twitter, and news to spot early trends.",
    pitch: "Beat the market with real-time sentiment data.",
    githubUrl: "https://github.com/demo/alphapulse",
    videoUrl: "https://youtube.com/watch?v=demo10",
  },

  // AVI Projects
  {
    id: "project-avi-1",
    name: "FleetEye",
    case: "avi",
    description:
      "An AI dashboard for fleet operators that predicts maintenance needs based on driving patterns and vehicle sensors.",
    pitch: "Predictive vehicle maintenance for smarter fleets.",
    githubUrl: "https://github.com/demo/fleeteye",
    videoUrl: "https://youtube.com/watch?v=demo11",
  },
  {
    id: "project-avi-2",
    name: "DriveSimXR",
    case: "avi",
    description:
      "A VR driving simulator that models autonomous behavior in edge cases for safer AI training.",
    pitch: "Train autonomous systems in virtual reality.",
    githubUrl: "https://github.com/demo/drivesimxr",
    videoUrl: "https://youtube.com/watch?v=demo12",
  },
  {
    id: "project-avi-3",
    name: "AutoDash",
    case: "avi",
    description:
      "A customizable digital dashboard interface for autonomous vehicle UX prototyping.",
    pitch: "Reimagine the dashboard for autonomous vehicles.",
    githubUrl: "https://github.com/demo/autodash",
    videoUrl: "https://youtube.com/watch?v=demo13",
  },
  {
    id: "project-avi-4",
    name: "PathWise",
    case: "avi",
    description:
      "AI-powered route optimization for AVs with real-time traffic and environmental awareness.",
    pitch: "Smarter routes for autonomous navigation.",
    githubUrl: "https://github.com/demo/pathwise",
    videoUrl: "https://youtube.com/watch?v=demo14",
    challenges: [challenges.visionaries],
  },
  {
    id: "project-avi-5",
    name: "CarTalk",
    case: "avi",
    description:
      "An AV-to-human communication system using lights, sounds, and screens to show vehicle intent.",
    pitch: "Helping AVs communicate with humans clearly.",
    githubUrl: "https://github.com/demo/cartalk",
    videoUrl: "https://youtube.com/watch?v=demo15",
  },
  {
    id: "project-avi-6",
    name: "SafetyNet AI",
    case: "avi",
    placement: 1,
    description:
      "Anomaly detection system for autonomous vehicle cameras and LIDAR feeds using ML.",
    pitch: "Catch anomalies before they cause accidents.",
    githubUrl: "https://github.com/demo/safetynet-ai",
    videoUrl: "https://youtube.com/watch?v=demo16",
  },
  {
    id: "project-avi-7",
    name: "ParkPilot",
    case: "avi",
    placement: 2,
    description:
      "An AI-driven parking assistant that autonomously finds and parks in tight urban spaces.",
    pitch: "Smart urban parking for autonomous vehicles.",
    githubUrl: "https://github.com/demo/parkpilot",
    videoUrl: "https://youtube.com/watch?v=demo17",
  },
  {
    id: "project-avi-8",
    name: "UrbanDriveSim",
    case: "avi",
    description:
      "A city-level simulator for testing autonomous mobility patterns and traffic impacts.",
    pitch: "Simulate AV traffic impact at scale.",
    githubUrl: "https://github.com/demo/urbandrivesim",
    videoUrl: "https://youtube.com/watch?v=demo18",
  },
  {
    id: "project-avi-9",
    name: "RideMatch AI",
    case: "avi",
    description:
      "Optimizes shared rides between AVs based on routes, capacity, and ETA using reinforcement learning.",
    pitch: "Better shared rides through smarter matching.",
    githubUrl: "https://github.com/demo/ridematch-ai",
    videoUrl: "https://youtube.com/watch?v=demo19",
    challenges: [challenges.visionaries],
  },
  {
    id: "project-avi-10",
    name: "AV Guardian",
    case: "avi",
    description:
      "A failsafe control protocol for taking over AVs in emergencies using edge connectivity.",
    pitch: "Emergency override system for AV safety.",
    githubUrl: "https://github.com/demo/av-guardian",
    videoUrl: "https://youtube.com/watch?v=demo20",
  },

  // Beam Projects
  {
    id: "project-beam-1",
    name: "BeamChat",
    case: "beam",
    description:
      "A real-time chat app that integrates zero-knowledge identity checks with Beam's blockchain.",
    pitch: "Private messaging meets blockchain identity.",
    githubUrl: "https://github.com/demo/beamchat",
    videoUrl: "https://youtube.com/watch?v=demo21",
  },
  {
    id: "project-beam-2",
    name: "PayBeam",
    case: "beam",
    description:
      "Seamless crypto payments for online purchases using Beam smart contracts and browser plugins.",
    pitch: "One-click crypto payments, powered by Beam.",
    githubUrl: "https://github.com/demo/paybeam",
    videoUrl: "https://youtube.com/watch?v=demo22",
    challenges: [challenges.mistral],
  },
  {
    id: "project-beam-3",
    name: "NFTicket",
    case: "beam",
    description:
      "A decentralized ticketing platform where event passes are minted as NFTs on Beam.",
    pitch: "No more scalping with blockchain-based tickets.",
    githubUrl: "https://github.com/demo/nfticket",
    videoUrl: "https://youtube.com/watch?v=demo23",
  },
  {
    id: "project-beam-4",
    name: "DAOBridge",
    case: "beam",
    placement: 1,
    description:
      "A dashboard for managing decentralized autonomous organizations with Beam voting integration.",
    pitch: "Manage your DAO transparently on Beam.",
    githubUrl: "https://github.com/demo/daobridge",
    videoUrl: "https://youtube.com/watch?v=demo24",
  },
  {
    id: "project-beam-5",
    name: "ChainCert",
    case: "beam",
    placement: 2,
    description:
      "Verifiable certificate issuance for courses and workshops stored on Beam.",
    pitch: "Issue blockchain certificates with ease.",
    githubUrl: "https://github.com/demo/chaincert",
    videoUrl: "https://youtube.com/watch?v=demo25",
  },
  {
    id: "project-beam-6",
    name: "BeamDAO Voting",
    case: "beam",
    description:
      "A gas-optimized DAO voting system designed for high participation and transparency.",
    pitch: "Fairer governance powered by Beam.",
    githubUrl: "https://github.com/demo/beamdao-voting",
    videoUrl: "https://youtube.com/watch?v=demo26",
  },
  {
    id: "project-beam-7",
    name: "DeFiLens",
    case: "beam",
    description:
      "Analytics dashboard for DeFi activity on the Beam network, including wallet analysis and protocol stats.",
    pitch: "Visualize your DeFi life on Beam.",
    githubUrl: "https://github.com/demo/defilens",
    videoUrl: "https://youtube.com/watch?v=demo27",
  },
  {
    id: "project-beam-8",
    name: "BeamBoard",
    case: "beam",
    description:
      "A project board for managing Web3 development tasks with Beam wallet login integration.",
    pitch: "Trello for blockchain teams.",
    githubUrl: "https://github.com/demo/beamboard",
    videoUrl: "https://youtube.com/watch?v=demo28",
  },
  {
    id: "project-beam-9",
    name: "ProofMe",
    case: "beam",
    description:
      "Anonymous credential verification app using Beam privacy tech.",
    pitch: "Prove things about yourself without revealing your identity.",
    githubUrl: "https://github.com/demo/proofme",
    videoUrl: "https://youtube.com/watch?v=demo29",
    challenges: [challenges.tanso],
  },
  {
    id: "project-beam-10",
    name: "MetaMarket",
    case: "beam",
    description:
      "Decentralized marketplace for digital goods with escrow powered by Beam smart contracts.",
    pitch: "A truly trustless digital marketplace.",
    githubUrl: "https://github.com/demo/metamarket",
    videoUrl: "https://youtube.com/watch?v=demo30",
  },
];
