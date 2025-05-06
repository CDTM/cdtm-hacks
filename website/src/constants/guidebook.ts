import {
  Info,
  Star,
  MapPin,
  MessageSquare,
  Menu,
  CheckSquare,
  Truck,
  Award,
  Pill,
  Calendar,
  Map,
  Users,
  Wrench,
  Upload,
  Phone,
  MessageCircle,
  Utensils,
  Building,
  LucideIcon,
} from "lucide-react";

// Define icon names as strings instead of JSX elements
export type IconName =
  | "info"
  | "star"
  | "mapPin"
  | "messageSquare"
  | "menu"
  | "checkSquare"
  | "truck"
  | "award"
  | "pill"
  | "calendar"
  | "map"
  | "users"
  | "wrench"
  | "upload"
  | "phone"
  | "messageCircle"
  | "utensils"
  | "building";

// Map of icon names to their components
export const iconMap: Record<IconName, LucideIcon> = {
  info: Info,
  star: Star,
  mapPin: MapPin,
  messageSquare: MessageSquare,
  menu: Menu,
  checkSquare: CheckSquare,
  truck: Truck,
  award: Award,
  pill: Pill,
  calendar: Calendar,
  map: Map,
  users: Users,
  wrench: Wrench,
  upload: Upload,
  phone: Phone,
  messageCircle: MessageCircle,
  utensils: Utensils,
  building: Building,
};

export interface GuidebookSubsection {
  id: string;
  title: string;
  icon: IconName;
  content: string;
}

export interface GuidebookSection {
  id: string;
  title: string;
  icon: IconName;
  subsections: GuidebookSubsection[];
}

export const GUIDEBOOK_DATA: GuidebookSection[] = [
  {
    id: "general",
    title: "General Information",
    icon: "info",
    subsections: [
      {
        id: "checklist",
        title: "Participant Checklist",
        icon: "checkSquare",
        content: `<h3 class="text-xl font-bold mb-1">🤝 Must Haves:</h3>
• Valid ID
• Laptop
• Charger
• Other Devices you may need
• Water bottle
• Comfortable clothes
• Good Vibes :)

<h3 class="text-xl font-bold mb-1">😴 If you plan to stay overnight:</h3>
• Air mattress
• Sleeping bag
• Small Pillow
• Sleeping mask
• Ear plugs
• ...

<h3 class="text-xl font-bold mb-1">🔑 Essentials:</h3>
• Basic toiletries: Toothpaste, Toothbrush, Shampoo, Deodorant, Medications, etc.
• Towel (You will get free access to shower at the venue (ground floor))
• ...`,
      },
      {
        id: "transport",
        title: "Transportation Options",
        icon: "truck",
        content: "Information about transportation to and from the event.",
      },
      {
        id: "accreditation",
        title: "Accreditation Process",
        icon: "award",
        content: `<h3 class="text-xl font-bold mb-1">How to get your participant badge and complete registration:</h3>
1. Go to the registration desk at the entrance of the Celonis Office
2. Show your ID 
3. After the verification, you will get your hacker badge
4. You will also get a goodie bag and hacker t-shirt 
5. And done. Enjoy CDTM Hacks 2025 🎉
`,
      },
      {
        id: "firstaid",
        title: "First Aid & Security",
        icon: "pill",
        content: "Information about safety procedures and first aid locations.",
      },
      {
        id: "schedule-overview",
        title: "Schedule Overview",
        icon: "calendar",
        content: "A brief overview of the event schedule.",
      },
    ],
  },
  {
    id: "challenges",
    title: "Cases & Challenges",
    icon: "star",
    subsections: [
      {
        id: "descriptions",
        title: "Challenge Descriptions",
        icon: "star",
        content:
          "Detailed information about each challenge and its objectives.",
      },
      {
        id: "teams",
        title: "Team Formation Guidelines",
        icon: "users",
        content: "How teams are formed and guidelines for participation.",
      },
      {
        id: "tools",
        title: "Available Tools & Resources",
        icon: "wrench",
        content: `<h3 class="text-xl font-bold mb-1">List of tools and resources available:</h3>
Add link to tech fachsheet`,
      },
      {
        id: "submission",
        title: "Submission Process",
        icon: "upload",
        content: "How to submit your project and what to include.",
      },
      {
        id: "partners",
        title: "Partner Information",
        icon: "phone",
        content:
          "Information about our partners and their roles in the challenges.",
      },
    ],
  },
  {
    id: "location",
    title: "Location & Event Overview",
    icon: "mapPin",
    subsections: [
      {
        id: "venue",
        title: "Venue Details and Map",
        icon: "map",
        content:
          "Information about the venue and a map of important locations.",
      },
      {
        id: "daily",
        title: "Daily Schedule",
        icon: "calendar",
        content: "Detailed schedule for each day of the event.",
      },
      {
        id: "locations",
        title: "Important Locations",
        icon: "mapPin",
        content: "Key locations you need to know about during the event.",
      },
      {
        id: "activities",
        title: "Activities & Experience Areas",
        icon: "star",
        content:
          "Special activities and areas to explore during the hackathon.",
      },
    ],
  },
  {
    id: "communication",
    title: "Communication",
    icon: "messageSquare",
    subsections: [
      {
        id: "channels",
        title: "Communication Channels",
        icon: "messageSquare",
        content: "How to stay informed during the event.",
      },
      {
        id: "contacts",
        title: "Organizer Contacts",
        icon: "phone",
        content: "Contact information for organizers and staff.",
      },
      {
        id: "feedback",
        title: "Feedback System",
        icon: "messageCircle",
        content: "How to provide feedback during and after the event.",
      },
      {
        id: "announcements",
        title: "Announcements",
        icon: "info",
        content: "Important announcements and updates.",
      },
    ],
  },
  {
    id: "cdtm",
    title: "CDTM & Munich",
    icon: "menu",
    subsections: [
      {
        id: "about",
        title: "About CDTM",
        icon: "building",
        content:
          "Information about the Center for Digital Technology and Management.",
      },
      {
        id: "local",
        title: "Local Transportation",
        icon: "truck",
        content: "How to get around Munich during your stay.",
      },
      {
        id: "food",
        title: "Food & Accommodations",
        icon: "utensils",
        content: "Recommended places to eat and stay near the venue.",
      },
      {
        id: "highlights",
        title: "Munich Highlights",
        icon: "mapPin",
        content: "Points of interest to visit while you're in Munich.",
      },
    ],
  },
];
