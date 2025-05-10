export interface Project {
  id: string;
  name: string;
  case: "Trade Republic" | "avi" | "beam";
  whatIsProject: string;
  howBuilt: string;
  difficulties: string;
  oneSentencePitch: string;
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

export const cases: Record<"Trade Republic" | "avi" | "beam", Case> = {
  "Trade Republic": {
    name: "Trade Republic",
    // TODO: Use real case description
    description: "TODO (insert action case title)",
    sponsorUrl: "https://traderepublic.com",
    logo: "/images/partners/trade_republic.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
  avi: {
    name: "avi",
    // TODO: Use real case description
    description: "TODO (insert action case title)",
    sponsorUrl: "https://www.avimedical.com/",
    logo: "/images/partners/avi_logo.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
  beam: {
    name: "Beam",
    // TODO: Use real case description
    description: "TODO (insert action case title)",
    sponsorUrl: "https://beam.ai/",
    logo: "/images/partners/beam.png",
    logoClass: "max-h-[20px] max-w-[200px]",
  },
} as const;

export const challenges: Record<string, Challenge> = {
  tanso: {
    name: "Why Not? Biggest Creative Risk",
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
    name: "Best Use of La Plateforme/ Mistral models",
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
    name: "Best Use of Real-Time Interactive Avatars",
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
    name: "Best use of AI to improve processes",
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
    name: "Placeholder",
    case: "Trade Republic",
    whatIsProject: "Placeholder",
    howBuilt: "Placeholder",
    difficulties: "Placeholder",
    oneSentencePitch: "Placeholder",
    githubUrl: "https://github.com/demo/placeholder",
    videoUrl: "https://youtube.com/watch?v=demo1",
    placement: 1,
    challenges: [challenges.visionaries],
  },
  {
    id: "project-tr-2",
    name: "Placeholder",
    case: "avi",
    whatIsProject: "Placeholder",
    howBuilt: "Placeholder",
    difficulties: "Placeholder",
    oneSentencePitch: "Placeholder",
    githubUrl: "https://github.com/demo/tradetribe",
    videoUrl: "https://youtube.com/watch?v=demo2",
    placement: 2,
  },
  {
    id: "project-tr-3",
    name: "StockStory",
    case: "Trade Republic",
    whatIsProject: "Generates story-like visualizations of your stock performance over time, ideal for sharing and learning.",
    howBuilt: "Turn your portfolio into an engaging story.",
    difficulties: "Creating intuitive visualizations that accurately represent complex financial data while remaining engaging and educational.",
    oneSentencePitch: "Turn your portfolio into an engaging story.",
    githubUrl: "https://github.com/demo/stockstory",
    videoUrl: "https://youtube.com/watch?v=demo3",
  },
  {
    id: "project-tr-4",
    name: "InvestiQ",
    case: "Trade Republic",
    whatIsProject: "A gamified quiz app that tests users on investment knowledge and offers real-time market scenarios.",
    howBuilt: "Learn investing through challenges and rewards.",
    difficulties: "Designing realistic market scenarios that are both educational and engaging while maintaining accuracy in financial concepts.",
    oneSentencePitch: "Learn investing through challenges and rewards.",
    githubUrl: "https://github.com/demo/investiq",
    videoUrl: "https://youtube.com/watch?v=demo4",
  },
  {
    id: "project-tr-5",
    name: "DividendRadar",
    case: "Trade Republic",
    whatIsProject: "Tracks dividend payments and suggests portfolio optimization to maximize passive income.",
    howBuilt: "Maximize your dividend gains with smart alerts.",
    difficulties: "Accurately tracking dividend schedules and payment dates across different markets and currencies.",
    oneSentencePitch: "Maximize your dividend gains with smart alerts.",
    githubUrl: "https://github.com/demo/dividendaradar",
    videoUrl: "https://youtube.com/watch?v=demo5",
  },
  {
    id: "project-tr-6",
    name: "GreenVest",
    case: "Trade Republic",
    whatIsProject: "Rates your investments based on ESG scores and suggests greener alternatives.",
    howBuilt: "Invest responsibly with sustainability scores.",
    difficulties: "Aggregating and validating ESG data from multiple sources while maintaining up-to-date sustainability metrics.",
    oneSentencePitch: "Invest responsibly with sustainability scores.",
    githubUrl: "https://github.com/demo/greenvest",
    videoUrl: "https://youtube.com/watch?v=demo6",
  },
  {
    id: "project-tr-7",
    name: "RiskSense",
    case: "Trade Republic",
    whatIsProject: "Analyzes your portfolio risk and simulates potential outcomes based on historical crashes.",
    howBuilt: "Understand and manage your investment risk better.",
    difficulties: "Creating accurate risk models that account for market volatility while providing actionable insights.",
    oneSentencePitch: "Understand and manage your investment risk better.",
    githubUrl: "https://github.com/demo/risksense",
    videoUrl: "https://youtube.com/watch?v=demo7",
  },
  {
    id: "project-tr-8",
    name: "MicroInvest",
    case: "Trade Republic",
    whatIsProject: "Rounding up everyday purchases to invest spare change into diversified ETFs.",
    howBuilt: "Invest your spare change effortlessly.",
    difficulties: "Implementing secure payment processing and ensuring accurate round-up calculations across different currencies.",
    oneSentencePitch: "Invest your spare change effortlessly.",
    githubUrl: "https://github.com/demo/microinvest",
    videoUrl: "https://youtube.com/watch?v=demo8",
    challenges: [challenges['beyond-presence']],
  },
  {
    id: "project-tr-9",
    name: "TradeBuddy",
    case: "Trade Republic",
    whatIsProject: "A conversational bot that explains financial news and your portfolio in plain English.",
    howBuilt: "Your friendly financial assistant in chat form.",
    difficulties: "Training the AI to accurately interpret complex financial news while maintaining conversational engagement.",
    oneSentencePitch: "Your friendly financial assistant in chat form.",
    githubUrl: "https://github.com/demo/tradebuddy",
    videoUrl: "https://youtube.com/watch?v=demo9",
  },
  {
    id: "project-tr-10",
    name: "AlphaPulse",
    case: "Trade Republic",
    whatIsProject: "Real-time sentiment analysis on stocks from Reddit, Twitter, and news to spot early trends.",
    howBuilt: "Beat the market with real-time sentiment data.",
    difficulties: "Processing and analyzing large volumes of social media data in real-time while filtering out noise and misinformation.",
    oneSentencePitch: "Beat the market with real-time sentiment data.",
    githubUrl: "https://github.com/demo/alphapulse",
    videoUrl: "https://youtube.com/watch?v=demo10",
  },

  // AVI Projects
  {
    id: "project-avi-1",
    name: "FleetEye",
    case: "avi",
    whatIsProject: "An AI dashboard for fleet operators that predicts maintenance needs based on driving patterns and vehicle sensors.",
    howBuilt: "Predictive vehicle maintenance for smarter fleets.",
    difficulties: "Integrating data from various vehicle sensors and creating accurate predictive maintenance models.",
    oneSentencePitch: "Predictive vehicle maintenance for smarter fleets.",
    githubUrl: "https://github.com/demo/fleeteye",
    videoUrl: "https://youtube.com/watch?v=demo11",
  },
  {
    id: "project-avi-2",
    name: "DriveSimXR",
    case: "avi",
    whatIsProject: "A VR driving simulator that models autonomous behavior in edge cases for safer AI training.",
    howBuilt: "Train autonomous systems in virtual reality.",
    difficulties: "Creating realistic edge case scenarios and ensuring accurate physics simulation in VR environment.",
    oneSentencePitch: "Train autonomous systems in virtual reality.",
    githubUrl: "https://github.com/demo/drivesimxr",
    videoUrl: "https://youtube.com/watch?v=demo12",
  },
  {
    id: "project-avi-3",
    name: "AutoDash",
    case: "avi",
    whatIsProject: "A customizable digital dashboard interface for autonomous vehicle UX prototyping.",
    howBuilt: "Reimagine the dashboard for autonomous vehicles.",
    difficulties: "Designing intuitive interfaces that maintain safety while providing necessary information to passengers.",
    oneSentencePitch: "Reimagine the dashboard for autonomous vehicles.",
    githubUrl: "https://github.com/demo/autodash",
    videoUrl: "https://youtube.com/watch?v=demo13",
  },
  {
    id: "project-avi-4",
    name: "PathWise",
    case: "avi",
    whatIsProject: "AI-powered route optimization for AVs with real-time traffic and environmental awareness.",
    howBuilt: "Smarter routes for autonomous navigation.",
    difficulties: "Processing real-time traffic data and environmental conditions while optimizing for multiple variables.",
    oneSentencePitch: "Smarter routes for autonomous navigation.",
    githubUrl: "https://github.com/demo/pathwise",
    videoUrl: "https://youtube.com/watch?v=demo14",
    challenges: [challenges.visionaries],
  },
  {
    id: "project-avi-5",
    name: "CarTalk",
    case: "avi",
    whatIsProject: "An AV-to-human communication system using lights, sounds, and screens to show vehicle intent.",
    howBuilt: "Helping AVs communicate with humans clearly.",
    difficulties: "Creating universally understandable signals that work across different cultures and lighting conditions.",
    oneSentencePitch: "Helping AVs communicate with humans clearly.",
    githubUrl: "https://github.com/demo/cartalk",
    videoUrl: "https://youtube.com/watch?v=demo15",
  },
  {
    id: "project-avi-6",
    name: "SafetyNet AI",
    case: "avi",
    whatIsProject: "Anomaly detection system for autonomous vehicle cameras and LIDAR feeds using ML.",
    howBuilt: "Catch anomalies before they cause accidents.",
    difficulties: "Training ML models to detect rare edge cases while minimizing false positives in real-time processing.",
    oneSentencePitch: "Catch anomalies before they cause accidents.",
    githubUrl: "https://github.com/demo/safetynet-ai",
    videoUrl: "https://youtube.com/watch?v=demo16",
    placement: 1,
  },
  {
    id: "project-avi-7",
    name: "ParkPilot",
    case: "avi",
    whatIsProject: "An AI-driven parking assistant that autonomously finds and parks in tight urban spaces.",
    howBuilt: "Smart urban parking for autonomous vehicles.",
    difficulties: "Navigating complex urban environments and handling tight parking spaces with precision.",
    oneSentencePitch: "Smart urban parking for autonomous vehicles.",
    githubUrl: "https://github.com/demo/parkpilot",
    videoUrl: "https://youtube.com/watch?v=demo17",
    placement: 2,
  },
  {
    id: "project-avi-8",
    name: "UrbanDriveSim",
    case: "avi",
    whatIsProject: "A city-level simulator for testing autonomous mobility patterns and traffic impacts.",
    howBuilt: "Simulate AV traffic impact at scale.",
    difficulties: "Creating realistic traffic patterns and modeling complex urban interactions at city scale.",
    oneSentencePitch: "Simulate AV traffic impact at scale.",
    githubUrl: "https://github.com/demo/urbandrivesim",
    videoUrl: "https://youtube.com/watch?v=demo18",
  },
  {
    id: "project-avi-9",
    name: "RideMatch AI",
    case: "avi",
    whatIsProject: "Optimizes shared rides between AVs based on routes, capacity, and ETA using reinforcement learning.",
    howBuilt: "Better shared rides through smarter matching.",
    difficulties: "Balancing multiple optimization goals while handling real-time changes in passenger demand.",
    oneSentencePitch: "Better shared rides through smarter matching.",
    githubUrl: "https://github.com/demo/ridematch-ai",
    videoUrl: "https://youtube.com/watch?v=demo19",
    challenges: [challenges.visionaries],
  },
  {
    id: "project-avi-10",
    name: "AV Guardian",
    case: "avi",
    whatIsProject: "A failsafe control protocol for taking over AVs in emergencies using edge connectivity.",
    howBuilt: "Emergency override system for AV safety.",
    difficulties: "Ensuring reliable emergency response with minimal latency while maintaining system security.",
    oneSentencePitch: "Emergency override system for AV safety.",
    githubUrl: "https://github.com/demo/av-guardian",
    videoUrl: "https://youtube.com/watch?v=demo20",
  },

  // Beam Projects
  {
    id: "project-beam-1",
    name: "BeamChat",
    case: "beam",
    whatIsProject: "A real-time chat app that integrates zero-knowledge identity checks with Beam's blockchain.",
    howBuilt: "Private messaging meets blockchain identity.",
    difficulties: "Implementing zero-knowledge proofs while maintaining chat performance and user experience.",
    oneSentencePitch: "Private messaging meets blockchain identity.",
    githubUrl: "https://github.com/demo/beamchat",
    videoUrl: "https://youtube.com/watch?v=demo21",
  },
  {
    id: "project-beam-2",
    name: "PayBeam",
    case: "beam",
    whatIsProject: "Seamless crypto payments for online purchases using Beam smart contracts and browser plugins.",
    howBuilt: "One-click crypto payments, powered by Beam.",
    difficulties: "Ensuring transaction security while maintaining fast payment processing and user-friendly experience.",
    oneSentencePitch: "One-click crypto payments, powered by Beam.",
    githubUrl: "https://github.com/demo/paybeam",
    videoUrl: "https://youtube.com/watch?v=demo22",
    challenges: [challenges.mistral],
  },
  {
    id: "project-beam-3",
    name: "NFTicket",
    case: "beam",
    whatIsProject: "A decentralized ticketing platform where event passes are minted as NFTs on Beam.",
    howBuilt: "No more scalping with blockchain-based tickets.",
    difficulties: "Handling high transaction volumes during popular event sales while preventing scalping.",
    oneSentencePitch: "No more scalping with blockchain-based tickets.",
    githubUrl: "https://github.com/demo/nfticket",
    videoUrl: "https://youtube.com/watch?v=demo23",
  },
  {
    id: "project-beam-4",
    name: "DAOBridge",
    case: "beam",
    whatIsProject: "A dashboard for managing decentralized autonomous organizations with Beam voting integration.",
    howBuilt: "Manage your DAO transparently on Beam.",
    difficulties: "Creating intuitive governance interfaces while ensuring secure and transparent voting mechanisms.",
    oneSentencePitch: "Manage your DAO transparently on Beam.",
    githubUrl: "https://github.com/demo/daobridge",
    videoUrl: "https://youtube.com/watch?v=demo24",
    placement: 1,
  },
  {
    id: "project-beam-5",
    name: "ChainCert",
    case: "beam",
    whatIsProject: "Verifiable certificate issuance for courses and workshops stored on Beam.",
    howBuilt: "Issue blockchain certificates with ease.",
    difficulties: "Designing a user-friendly certificate creation process while ensuring immutability and verification.",
    oneSentencePitch: "Issue blockchain certificates with ease.",
    githubUrl: "https://github.com/demo/chaincert",
    videoUrl: "https://youtube.com/watch?v=demo25",
    placement: 2,
  },
  {
    id: "project-beam-6",
    name: "BeamDAO Voting",
    case: "beam",
    whatIsProject: "A gas-optimized DAO voting system designed for high participation and transparency.",
    howBuilt: "Fairer governance powered by Beam.",
    difficulties: "Optimizing gas costs while maintaining voting security and participation incentives.",
    oneSentencePitch: "Fairer governance powered by Beam.",
    githubUrl: "https://github.com/demo/beamdao-voting",
    videoUrl: "https://youtube.com/watch?v=demo26",
  },
  {
    id: "project-beam-7",
    name: "DeFiLens",
    case: "beam",
    whatIsProject: "Analytics dashboard for DeFi activity on the Beam network, including wallet analysis and protocol stats.",
    howBuilt: "Visualize your DeFi life on Beam.",
    difficulties: "Aggregating and processing on-chain data in real-time while providing meaningful insights.",
    oneSentencePitch: "Visualize your DeFi life on Beam.",
    githubUrl: "https://github.com/demo/defilens",
    videoUrl: "https://youtube.com/watch?v=demo27",
  },
  {
    id: "project-beam-8",
    name: "BeamBoard",
    case: "beam",
    whatIsProject: "A project board for managing Web3 development tasks with Beam wallet login integration.",
    howBuilt: "Trello for blockchain teams.",
    difficulties: "Integrating wallet authentication while maintaining familiar project management workflows.",
    oneSentencePitch: "Trello for blockchain teams.",
    githubUrl: "https://github.com/demo/beamboard",
    videoUrl: "https://youtube.com/watch?v=demo28",
  },
  {
    id: "project-beam-9",
    name: "ProofMe",
    case: "beam",
    whatIsProject: "Anonymous credential verification app using Beam privacy tech.",
    howBuilt: "Prove things about yourself without revealing your identity.",
    difficulties: "Implementing zero-knowledge proofs while maintaining user-friendly verification processes.",
    oneSentencePitch: "Prove things about yourself without revealing your identity.",
    githubUrl: "https://github.com/demo/proofme",
    videoUrl: "https://youtube.com/watch?v=demo29",
    challenges: [challenges.tanso],
  },
  {
    id: "project-beam-10",
    name: "MetaMarket",
    case: "beam",
    whatIsProject: "Decentralized marketplace for digital goods with escrow powered by Beam smart contracts.",
    howBuilt: "A truly trustless digital marketplace.",
    difficulties: "Creating secure escrow mechanisms while ensuring smooth buyer-seller interactions.",
    oneSentencePitch: "A truly trustless digital marketplace.",
    githubUrl: "https://github.com/demo/metamarket",
    videoUrl: "https://youtube.com/watch?v=demo30",
  },
];
