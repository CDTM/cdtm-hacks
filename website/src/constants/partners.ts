export interface Sponsor {
  name: string;
  image?: string;
  link?: string;
  class?: string;
}

export const MAIN_SPONSOR: Sponsor = {
  name: "To be announced",
};

export const CASE_SPONSORS: Sponsor[] = [
  {
    name: "Trade Republic",
    image: "/images/partners/tr.png",
    link: "https://traderepublic.com/",
  },
  {
    name: "Beam",
    image: "/images/partners/beam.png",
    class: "max-w-[200px]",
    link: "https://beam.ai/",
  },
  {
    name: "avi",
    image: "/images/partners/avi_logo.png",
    class: "max-h-[55px] max-w-[200px]",
    link: "https://www.avimedical.com/",
  },
];

export const CHALLENGE_SPONSORS: Sponsor[] = [
  {
    name: "tanso",
    image: "/images/partners/tanso_fixed.svg",
    class: "max-h-[50px]",
    link: "https://www.tanso.de/en",
  },
  {
    name: "Visionaries Club",
    image: "/images/partners/visionaries_club.svg",
    class: "max-w-[200px]",
    link: "https://visionaries.vc/",
  },
  {
    name: "Everyday Intelligence",
    image: "/images/partners/everyday_intelligence_logo.svg",
    class: "max-w-[200px]",
  },
  {
    name: "To be announced",
  },
];

export const SUPPORT_SPONSORS: Sponsor[] = [
  {
    name: "OpenAI",
    image: "/images/partners/OpenAI_Logo.png",
    link: "https://openai.com/",
  },
  {
    name: "Lovable",
    image: "/images/partners/lovable_logo.svg",
    link: "https://lovable.dev/",
  },
  {
    name: "Speedinvest",
    image: "/images/partners/speedinvest.png",
    link: "https://speedinvest.com/",
  },
  {
    name: "Langfuse",
    image: "/images/partners/langfuse_logo.svg",
    link: "https://langfuse.com/",
  },
  {
    name: "Mistral",
    image: "/images/partners/mistral-ai-2025.svg",
    link: "https://mistral.ai/",
  },
  {
    name: "Make",
    image: "/images/partners/make.svg",
    link: "https://make.com/",
  },
  {
    name: "Cognition AI",
    image: "/images/partners/cognition.png",
    link: "https://cognition.ai/",
  },
  {
    name: "To be announced",
  },
];
